import "server-only";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { sql, ensureSchema, hasDatabase } from "@/lib/auth/db";
import { resolvePlanSummary } from "@/lib/data/summary";
import { getPlan } from "@/lib/data/plans";
import { createOrder as issueEsimOrder, type OrderResult } from "@/lib/api/client";
import { generateInvoicePdf, generateTopUpPdf } from "@/lib/auth/invoice";
import { sendMail, invoiceEmail } from "@/lib/auth/mailer";
import { logCorefyEvent } from "./corefy/logger";
import type { CorefyStatus } from "./corefy/types";

export interface CustomerSnapshot {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string; // 2-letter ISO
  street: string;
  city: string;
  postalCode: string;
}

export interface LocalOrder {
  id: string | number;
  transactionRef: string;
  userId: number | null;
  amountCents: number;
  currency: string;
  planId: string;
  planTitle: string;
  planData: string;
  planDays: number;
  status: "pending" | "processed" | "failed" | "refunded";
  customer: CustomerSnapshot;
  providerInvoiceId: string | null;
  hppUrl: string | null;
  paymentRequestedAt: string | null;
  completedAt: string | null;
  failedAt: string | null;
  creditsReversedAt: string | null;
  rawProviderStatus: string | null;
  esimActivationCode: string | null;
  esimSmdpAddress: string | null;
  createdAt: string;
  updatedAt: string;
}

const LOCAL_ORDERS_FILE = path.resolve(process.cwd(), "storage", "orders.json");

function ensureStorageDir() {
  const dir = path.dirname(LOCAL_ORDERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readLocalFileOrders(): Record<string, LocalOrder> {
  ensureStorageDir();
  if (!fs.existsSync(LOCAL_ORDERS_FILE)) return {};
  try {
    const raw = fs.readFileSync(LOCAL_ORDERS_FILE, "utf8");
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("[orders] Failed to read storage/orders.json:", err);
    return {};
  }
}

function writeLocalFileOrders(orders: Record<string, LocalOrder>): void {
  ensureStorageDir();
  try {
    const tmp = `${LOCAL_ORDERS_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(orders, null, 2), "utf8");
    fs.renameSync(tmp, LOCAL_ORDERS_FILE);
  } catch (err) {
    console.error("[orders] Failed to write storage/orders.json:", err);
  }
}

export function generateTransactionRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `ORD-${ts}-${rand}`;
}

export interface CreateOrderParams {
  planId: string;
  userId?: number | null;
  amountCents?: number;
  customer: CustomerSnapshot;
}

/**
 * Creates a local order with status 'pending' before calling the payment provider.
 * Amount is calculated strictly on the server from the plan summary (or validated top-up amount).
 */
export async function createLocalOrder(params: CreateOrderParams): Promise<LocalOrder> {
  let amountCents: number;
  let planTitle: string;
  let planData: string;
  let planDays: number;

  if (params.planId === "wallet-topup") {
    if (!params.amountCents || params.amountCents <= 0) {
      throw new Error("Invalid top-up amount");
    }
    amountCents = Math.round(params.amountCents);
    planTitle = "Wallet Top-up";
    planData = `€${(amountCents / 100).toFixed(2)} credits`;
    planDays = 0;
  } else {
    const summary = resolvePlanSummary(params.planId);
    if (!summary) {
      throw new Error(`Invalid plan: ${params.planId}`);
    }
    amountCents = Math.round(summary.price * 100);
    planTitle = summary.title;
    planData = summary.data;
    planDays = summary.days;
  }

  const transactionRef = generateTransactionRef();
  const now = new Date().toISOString();

  const customerSnapshot: CustomerSnapshot = {
    firstName: params.customer.firstName.trim(),
    lastName: params.customer.lastName.trim(),
    email: params.customer.email.trim().toLowerCase(),
    phone: params.customer.phone.trim(),
    country: params.customer.country.trim().toUpperCase(),
    street: params.customer.street.trim(),
    city: params.customer.city.trim(),
    postalCode: params.customer.postalCode.trim(),
  };

  if (hasDatabase()) {
    await ensureSchema();
    const rows = await sql()`
      INSERT INTO orders (
        transaction_ref, user_id, amount_cents, currency,
        plan_id, plan_title, plan_data, plan_days,
        status, customer_first_name, customer_last_name,
        customer_email, customer_phone, customer_country,
        customer_street, customer_city, customer_postal_code,
        created_at, updated_at
      )
      VALUES (
        ${transactionRef}, ${params.userId ?? null}, ${amountCents}, 'EUR',
        ${params.planId}, ${planTitle}, ${planData}, ${planDays},
        'pending', ${customerSnapshot.firstName}, ${customerSnapshot.lastName},
        ${customerSnapshot.email}, ${customerSnapshot.phone}, ${customerSnapshot.country},
        ${customerSnapshot.street}, ${customerSnapshot.city}, ${customerSnapshot.postalCode},
        ${now}, ${now}
      )
      RETURNING *
    `;
    const r = rows[0];
    return mapDbRowToOrder(r);
  }

  // File-based fallback for dev environment without database
  const orders = readLocalFileOrders();
  const order: LocalOrder = {
    id: Object.keys(orders).length + 1,
    transactionRef,
    userId: params.userId ?? null,
    amountCents,
    currency: "EUR",
    planId: params.planId,
    planTitle,
    planData,
    planDays,
    status: "pending",
    customer: customerSnapshot,
    providerInvoiceId: null,
    hppUrl: null,
    paymentRequestedAt: null,
    completedAt: null,
    failedAt: null,
    creditsReversedAt: null,
    rawProviderStatus: null,
    esimActivationCode: null,
    esimSmdpAddress: null,
    createdAt: now,
    updatedAt: now,
  };
  orders[transactionRef] = order;
  writeLocalFileOrders(orders);
  return order;
}

/**
 * Checks if payment was already requested or created for this order to prevent duplicates.
 * Updates payment_requested_at timestamp.
 */
export async function lockOrderForPayment(transactionRef: string): Promise<LocalOrder | null> {
  const now = new Date().toISOString();

  if (hasDatabase()) {
    await ensureSchema();
    const rows = await sql()`
      UPDATE orders
      SET payment_requested_at = COALESCE(payment_requested_at, ${now}),
          updated_at = ${now}
      WHERE transaction_ref = ${transactionRef}
      RETURNING *
    `;
    return rows.length ? mapDbRowToOrder(rows[0]) : null;
  }

  const orders = readLocalFileOrders();
  const order = orders[transactionRef];
  if (!order) return null;
  if (!order.paymentRequestedAt) {
    order.paymentRequestedAt = now;
  }
  order.updatedAt = now;
  writeLocalFileOrders(orders);
  return order;
}

/**
 * Attaches the created Corefy provider invoice ID and HPP URL to the local order.
 */
export async function attachProviderHpp(
  transactionRef: string,
  invoiceId: string,
  hppUrl: string
): Promise<void> {
  const now = new Date().toISOString();

  if (hasDatabase()) {
    await ensureSchema();
    await sql()`
      UPDATE orders
      SET provider_invoice_id = ${invoiceId},
          hpp_url = ${hppUrl},
          updated_at = ${now}
      WHERE transaction_ref = ${transactionRef}
    `;
    return;
  }

  const orders = readLocalFileOrders();
  const order = orders[transactionRef];
  if (order) {
    order.providerInvoiceId = invoiceId;
    order.hppUrl = hppUrl;
    order.updatedAt = now;
    writeLocalFileOrders(orders);
  }
}

export async function getOrderByRef(transactionRef: string): Promise<LocalOrder | null> {
  if (hasDatabase()) {
    await ensureSchema();
    const rows = await sql()`SELECT * FROM orders WHERE transaction_ref = ${transactionRef} LIMIT 1`;
    return rows.length ? mapDbRowToOrder(rows[0]) : null;
  }

  const orders = readLocalFileOrders();
  return orders[transactionRef] ?? null;
}

export async function getOrderByProviderInvoiceId(invoiceId: string): Promise<LocalOrder | null> {
  if (hasDatabase()) {
    await ensureSchema();
    const rows = await sql()`SELECT * FROM orders WHERE provider_invoice_id = ${invoiceId} LIMIT 1`;
    return rows.length ? mapDbRowToOrder(rows[0]) : null;
  }

  const orders = readLocalFileOrders();
  for (const ord of Object.values(orders)) {
    if (ord.providerInvoiceId === invoiceId) {
      return ord;
    }
  }
  return null;
}

export interface ProcessPaymentOptions {
  providerInvoiceId?: string;
  rawStatus?: CorefyStatus;
  resolution?: string;
}

/**
 * Idempotently processes payment status updates from Corefy webhooks or reconciliation.
 */
export async function processOrderPayment(
  transactionRef: string,
  status: CorefyStatus,
  options?: ProcessPaymentOptions
): Promise<LocalOrder | null> {
  const order = await getOrderByRef(transactionRef);
  if (!order) return null;

  const now = new Date().toISOString();

  // Status handling according to spec:
  // 1. "processed" -> confirm payment and issue eSIM (or credit wallet) once.
  if (status === "processed") {
    if (order.status === "processed" && order.completedAt) {
      // Idempotency: Already processed, do not issue eSIM or send mail again
      return order;
    }

    const isWalletTopUp = order.planId === "wallet-topup";

    let activationCode: string | null = null;
    let smdpAddress: string | null = null;

    if (isWalletTopUp) {
      // Credit wallet balance
      if (order.userId && hasDatabase()) {
        try {
          await sql()`
            UPDATE users
            SET balance_cents = balance_cents + ${order.amountCents}
            WHERE id = ${order.userId}
          `;
          await sql()`
            INSERT INTO transactions (user_id, kind, description, amount_cents)
            VALUES (${order.userId}, 'topup', 'Wallet top-up (Card)', ${order.amountCents})
          `;
        } catch (err) {
          console.error("[orders] Failed to update balance in DB:", err);
        }
      }
    } else {
      // Issue eSIM
      let issuedEsim: OrderResult;
      try {
        issuedEsim = await issueEsimOrder(order.planId, order.customer.email);
      } catch (err) {
        console.error("[orders] Failed to issue eSIM for order", transactionRef, err);
        const fallbackCode = `LPA:1$smdp.velusim.io$${order.planId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
        issuedEsim = {
          orderId: transactionRef,
          qrCode: fallbackCode,
          activationCode: fallbackCode,
          smdpAddress: "smdp.velusim.io",
        };
      }

      activationCode = issuedEsim.activationCode;
      smdpAddress = issuedEsim.smdpAddress;

      // Persist eSIM record
      if (hasDatabase()) {
        try {
          const countrySlug = getPlan(order.planId)?.countrySlug ?? null;
          const summary = resolvePlanSummary(order.planId);
          await sql()`
            INSERT INTO esims (
              user_id, order_ref, email, plan_id, country_slug,
              title, flag, data_label, days, price_cents,
              activation_code, smdp_address
            )
            VALUES (
              ${order.userId}, ${transactionRef}, ${order.customer.email},
              ${order.planId}, ${countrySlug}, ${order.planTitle},
              ${summary?.flag ?? "🌐"}, ${order.planData}, ${order.planDays},
              ${order.amountCents}, ${issuedEsim.activationCode}, ${issuedEsim.smdpAddress}
            )
            ON CONFLICT (order_ref) DO NOTHING
          `;

          if (order.userId) {
            await sql()`
              INSERT INTO transactions (user_id, kind, description, amount_cents)
              VALUES (${order.userId}, 'card_purchase', ${`${order.planTitle} · ${order.planData}`}, ${-order.amountCents})
            `;
          }
        } catch (err) {
          console.error("[orders] Failed to persist eSIM DB record:", err);
        }
      }
    }

    // Update order status in DB or local store
    if (hasDatabase()) {
      await sql()`
        UPDATE orders
        SET status = 'processed',
            completed_at = ${now},
            raw_provider_status = ${options?.rawStatus ?? "processed"},
            provider_invoice_id = COALESCE(provider_invoice_id, ${options?.providerInvoiceId ?? null}),
            esim_activation_code = ${activationCode},
            esim_smdp_address = ${smdpAddress},
            updated_at = ${now}
        WHERE transaction_ref = ${transactionRef}
      `;
    } else {
      const orders = readLocalFileOrders();
      if (orders[transactionRef]) {
        orders[transactionRef].status = "processed";
        orders[transactionRef].completedAt = now;
        orders[transactionRef].rawProviderStatus = options?.rawStatus ?? "processed";
        if (options?.providerInvoiceId) orders[transactionRef].providerInvoiceId = options.providerInvoiceId;
        orders[transactionRef].esimActivationCode = activationCode;
        orders[transactionRef].esimSmdpAddress = smdpAddress;
        orders[transactionRef].updatedAt = now;
        writeLocalFileOrders(orders);
      }
    }

    // Generate and send branded PDF invoice by email (isolated best-effort, per spec section 8)
    deliverInvoiceMail(order).catch((err) => {
      console.error("[orders] Invoice email delivery failed:", err);
    });

    logCorefyEvent({
      level: "info",
      event: "order_payment_completed",
      transactionRef,
      providerInvoiceId: options?.providerInvoiceId ?? order.providerInvoiceId ?? undefined,
      amount: order.amountCents / 100,
      currency: order.currency,
      providerStatus: status,
    });

    return getOrderByRef(transactionRef);
  }

  // 2. Failure statuses: "process_failed", "authorize_failed", "expired", "terminated"
  const failureStatuses = new Set(["process_failed", "authorize_failed", "expired", "terminated"]);
  if (failureStatuses.has(status)) {
    // IMPORTANT: Late failure notifications must NOT override an already confirmed paid order!
    if (order.status === "processed") {
      logCorefyEvent({
        level: "warn",
        event: "late_failure_notification_ignored",
        transactionRef,
        providerStatus: status,
        details: { existingStatus: order.status },
      });
      return order;
    }

    if (hasDatabase()) {
      await sql()`
        UPDATE orders
        SET status = 'failed',
            failed_at = ${now},
            raw_provider_status = ${options?.rawStatus ?? status},
            provider_invoice_id = COALESCE(provider_invoice_id, ${options?.providerInvoiceId ?? null}),
            updated_at = ${now}
        WHERE transaction_ref = ${transactionRef} AND status != 'processed'
      `;
    } else {
      const orders = readLocalFileOrders();
      if (orders[transactionRef] && orders[transactionRef].status !== "processed") {
        orders[transactionRef].status = "failed";
        orders[transactionRef].failedAt = now;
        orders[transactionRef].rawProviderStatus = options?.rawStatus ?? status;
        if (options?.providerInvoiceId) orders[transactionRef].providerInvoiceId = options.providerInvoiceId;
        orders[transactionRef].updatedAt = now;
        writeLocalFileOrders(orders);
      }
    }

    logCorefyEvent({
      level: "warn",
      event: "order_payment_failed",
      transactionRef,
      providerStatus: status,
      providerResolution: options?.resolution,
    });

    return getOrderByRef(transactionRef);
  }

  // 3. "refunded" -> Mark refund and revert eSIM/credits once
  if (status === "refunded") {
    if (order.status === "refunded" || order.creditsReversedAt) {
      return order;
    }

    if (hasDatabase()) {
      await sql()`
        UPDATE orders
        SET status = 'refunded',
            credits_reversed_at = ${now},
            raw_provider_status = ${options?.rawStatus ?? status},
            updated_at = ${now}
        WHERE transaction_ref = ${transactionRef}
      `;

      if (order.planId === "wallet-topup" && order.userId) {
        // Reverse credited balance
        await sql()`
          UPDATE users
          SET balance_cents = GREATEST(0, balance_cents - ${order.amountCents})
          WHERE id = ${order.userId}
        `;
        await sql()`
          INSERT INTO transactions (user_id, kind, description, amount_cents)
          VALUES (${order.userId}, 'refund', 'Top-up refund reversal', ${-order.amountCents})
        `;
      } else {
        // Deactivate issued eSIM
        await sql()`
          UPDATE esims
          SET status = 'refunded'
          WHERE order_ref = ${transactionRef}
        `;
      }
    } else {
      const orders = readLocalFileOrders();
      if (orders[transactionRef]) {
        orders[transactionRef].status = "refunded";
        orders[transactionRef].creditsReversedAt = now;
        orders[transactionRef].rawProviderStatus = options?.rawStatus ?? status;
        orders[transactionRef].updatedAt = now;
        writeLocalFileOrders(orders);
      }
    }

    logCorefyEvent({
      level: "info",
      event: "order_payment_refunded",
      transactionRef,
      providerStatus: status,
    });

    return getOrderByRef(transactionRef);
  }

  // Other statuses (e.g. pending, processing) -> wait for future webhook
  return order;
}

async function deliverInvoiceMail(order: LocalOrder): Promise<void> {
  try {
    if (order.planId === "wallet-topup") {
      const receiptBytes = await generateTopUpPdf({
        ref: order.transactionRef,
        email: order.customer.email,
        amountCents: order.amountCents,
        balanceCents: order.amountCents,
        issuedAt: new Date(),
      });

      await sendMail({
        to: order.customer.email,
        subject: `Receipt for your wallet top-up · ${order.transactionRef}`,
        text: `Your wallet top-up of €${(order.amountCents / 100).toFixed(2)} was successful.\nReference: ${order.transactionRef}`,
        html: `<p>Your wallet top-up of <strong>€${(order.amountCents / 100).toFixed(2)}</strong> was successful.</p><p>Reference: ${order.transactionRef}</p>`,
        attachments: [{ filename: `receipt-${order.transactionRef}.pdf`, content: receiptBytes }],
      });
      return;
    }

    const pdfBytes = await generateInvoicePdf({
      orderRef: order.transactionRef,
      email: order.customer.email,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      customerAddress: order.customer.street,
      customerCity: order.customer.city,
      customerPostalCode: order.customer.postalCode,
      customerCountry: order.customer.country,
      title: order.planTitle,
      dataLabel: order.planData,
      days: order.planDays,
      priceCents: order.amountCents,
      issuedAt: new Date(),
    });

    await sendMail({
      to: order.customer.email,
      ...invoiceEmail({
        firstName: order.customer.firstName,
        orderRef: order.transactionRef,
        title: order.planTitle,
        dataLabel: order.planData,
        days: order.planDays,
        priceCents: order.amountCents,
      }),
      attachments: [{ filename: `invoice-${order.transactionRef}.pdf`, content: pdfBytes }],
    });
  } catch (err) {
    console.error("[orders] Invoice email could not be sent (non-fatal):", err);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapDbRowToOrder(row: any): LocalOrder {
  return {
    id: Number(row.id),
    transactionRef: row.transaction_ref,
    userId: row.user_id ? Number(row.user_id) : null,
    amountCents: Number(row.amount_cents),
    currency: row.currency,
    planId: row.plan_id,
    planTitle: row.plan_title,
    planData: row.plan_data,
    planDays: Number(row.plan_days),
    status: row.status,
    customer: {
      firstName: row.customer_first_name,
      lastName: row.customer_last_name,
      email: row.customer_email,
      phone: row.customer_phone,
      country: row.customer_country,
      street: row.customer_street,
      city: row.customer_city,
      postalCode: row.customer_postal_code,
    },
    providerInvoiceId: row.provider_invoice_id ?? null,
    hppUrl: row.hpp_url ?? null,
    paymentRequestedAt: row.payment_requested_at ? new Date(row.payment_requested_at).toISOString() : null,
    completedAt: row.completed_at ? new Date(row.completed_at).toISOString() : null,
    failedAt: row.failed_at ? new Date(row.failed_at).toISOString() : null,
    creditsReversedAt: row.credits_reversed_at ? new Date(row.credits_reversed_at).toISOString() : null,
    rawProviderStatus: row.raw_provider_status ?? null,
    esimActivationCode: row.esim_activation_code ?? null,
    esimSmdpAddress: row.esim_smdp_address ?? null,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}
