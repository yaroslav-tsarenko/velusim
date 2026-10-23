"use server";

import { z } from "zod";
import { resolvePlanSummary } from "@/lib/data/summary";
import { sql, ensureSchema, hasDatabase } from "@/lib/auth/db";
import { readSession } from "@/lib/auth/session";
import { createOrder as issueEsimOrder, type OrderResult } from "@/lib/api/client";
import { sendMail, invoiceEmail } from "@/lib/auth/mailer";
import { generateInvoicePdf } from "@/lib/auth/invoice";
import { getPlan } from "@/lib/data/plans";
import {
  createLocalOrder,
  lockOrderForPayment,
  attachProviderHpp,
  type CustomerSnapshot,
} from "@/lib/payments/orders";
import { createPaymentInvoice } from "@/lib/payments/corefy/client";
import { logCorefyEvent } from "@/lib/payments/corefy/logger";
import { getCurrentUser } from "@/lib/auth/dal";

const checkoutCustomerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  phone: z.string().trim().min(6, "Phone number is too short").max(25),
  country: z.string().trim().length(2, "Country must be a 2-letter ISO code").toUpperCase(),
  street: z.string().trim().min(2, "Street address is required").max(120),
  city: z.string().trim().min(1, "City is required").max(80),
  postalCode: z.string().trim().min(2, "Postal code is required").max(20),
});

export type CheckoutCustomerInput = z.infer<typeof checkoutCustomerSchema>;

export interface CreateCorefyPaymentResult {
  ok: boolean;
  hppUrl?: string;
  transactionRef?: string;
  error?: string;
}

/**
 * Initiates an HPP payment flow with Corefy / Sterling Pay:
 * 1. Validates buyer data.
 * 2. Calculates total amount on the server (never trusts client amount).
 * 3. Creates a local order with status 'pending' and fixes customer snapshot.
 * 4. Locks the order with payment_requested_at.
 * 5. Calls Corefy API /payment-invoices.
 * 6. Stores provider invoice ID and returns verified HPP URL.
 */
export async function createCorefyPayment(
  planId: string,
  rawCustomer: CheckoutCustomerInput
): Promise<CreateCorefyPaymentResult> {
  if (!planId) {
    return { ok: false, error: "Missing plan selection." };
  }

  const parsed = checkoutCustomerSchema.safeParse(rawCustomer);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form fields." };
  }
  const customer: CustomerSnapshot = parsed.data;

  const summary = resolvePlanSummary(planId);
  if (!summary) {
    return { ok: false, error: "Plan not found." };
  }

  // Session user if authenticated
  let userId: number | null = null;
  const session = await readSession();
  if (session?.userId) {
    userId = Number(session.userId);
  }

  // 1. Create local order with status 'pending'
  const order = await createLocalOrder({
    planId,
    userId,
    customer,
  });

  // 2. Lock order for payment (payment_requested_at)
  await lockOrderForPayment(order.transactionRef);

  // If HPP URL already exists on this order, return existing (preventing duplicate invoices)
  if (order.hppUrl) {
    return { ok: true, hppUrl: order.hppUrl, transactionRef: order.transactionRef };
  }

  // 3. Call Corefy API
  try {
    const invoice = await createPaymentInvoice({
      transactionRef: order.transactionRef,
      amountEur: order.amountCents / 100,
      description: `Velusim eSIM: ${order.planTitle} (${order.planData})`,
      customer: {
        userId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        country: customer.country,
        street: customer.street,
        city: customer.city,
        postalCode: customer.postalCode,
      },
    });

    // 4. Save provider invoice ID & HPP URL
    await attachProviderHpp(order.transactionRef, invoice.invoiceId, invoice.hppUrl);

    return {
      ok: true,
      hppUrl: invoice.hppUrl,
      transactionRef: order.transactionRef,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logCorefyEvent({
      level: "error",
      event: "checkout_create_payment_failed",
      transactionRef: order.transactionRef,
      error: errorMsg,
    });

    return {
      ok: false,
      transactionRef: order.transactionRef,
      error: errorMsg || "Failed to initialize payment gateway. Please try again.",
    };
  }
}

export interface WalletPayResult {
  ok: boolean;
  error?: string;
  order?: OrderResult;
}

/**
 * Initiates an HPP payment flow with Corefy / Sterling Pay specifically for Wallet Top-up.
 */
export async function createWalletTopUpPayment(amountEur: number): Promise<CreateCorefyPaymentResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, error: "Please sign in to top up your balance." };
  }

  if (!Number.isFinite(amountEur) || amountEur < 1 || amountEur > 1000) {
    return { ok: false, error: "Please enter an amount between €1 and €1000." };
  }

  const amountCents = Math.round(amountEur * 100);

  const customerSnapshot: CustomerSnapshot = {
    firstName: user.firstName || "Customer",
    lastName: user.lastName || "Account",
    email: user.email,
    phone: user.phone || "+447476928624",
    country: user.country || "GB",
    street: user.street || "Main Street 1",
    city: user.city || "London",
    postalCode: user.postalCode || "SW1A 1AA",
  };

  const order = await createLocalOrder({
    planId: "wallet-topup",
    userId: user.id,
    amountCents,
    customer: customerSnapshot,
  });

  await lockOrderForPayment(order.transactionRef);

  if (order.hppUrl) {
    return { ok: true, hppUrl: order.hppUrl, transactionRef: order.transactionRef };
  }

  try {
    const invoice = await createPaymentInvoice({
      transactionRef: order.transactionRef,
      amountEur: Number((amountCents / 100).toFixed(2)),
      description: `Velusim Wallet Top-up: €${(amountCents / 100).toFixed(2)} credits`,
      customer: {
        userId: user.id,
        firstName: customerSnapshot.firstName,
        lastName: customerSnapshot.lastName,
        email: customerSnapshot.email,
        phone: customerSnapshot.phone,
        country: customerSnapshot.country,
        street: customerSnapshot.street,
        city: customerSnapshot.city,
        postalCode: customerSnapshot.postalCode,
      },
    });

    await attachProviderHpp(order.transactionRef, invoice.invoiceId, invoice.hppUrl);

    return {
      ok: true,
      hppUrl: invoice.hppUrl,
      transactionRef: order.transactionRef,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logCorefyEvent({
      level: "error",
      event: "wallet_topup_payment_failed",
      transactionRef: order.transactionRef,
      error: errorMsg,
    });

    return {
      ok: false,
      transactionRef: order.transactionRef,
      error: errorMsg || "Failed to initialize payment gateway. Please try again.",
    };
  }
}

/**
 * Charges a signed-in buyer's wallet balance for a plan and issues the eSIM.
 */
export async function payWithBalance(planId: string): Promise<WalletPayResult> {
  if (!planId) return { ok: false, error: "Missing plan." };
  if (!hasDatabase()) return { ok: false, error: "Balance payments are unavailable right now." };

  const session = await readSession();
  if (!session) return { ok: false, error: "Please sign in to pay from your balance." };

  const summary = resolvePlanSummary(planId);
  if (!summary) return { ok: false, error: "We couldn't find that plan." };
  const priceCents = Math.round(summary.price * 100);

  await ensureSchema();
  const rows = await sql()`SELECT email, balance_cents FROM users WHERE id = ${session.userId} LIMIT 1`;
  if (!rows.length) return { ok: false, error: "Account not found." };
  const email = rows[0].email as string;
  if (Number(rows[0].balance_cents) < priceCents) {
    return { ok: false, error: "Your balance is too low for this plan. Top up and try again." };
  }

  const debit = await sql()`
    UPDATE users SET balance_cents = balance_cents - ${priceCents}
    WHERE id = ${session.userId} AND balance_cents >= ${priceCents}
    RETURNING id
  `;
  if (!debit.length) return { ok: false, error: "Your balance changed. Please try again." };

  let order: OrderResult;
  try {
    order = await issueEsimOrder(planId, email);
  } catch {
    await sql()`UPDATE users SET balance_cents = balance_cents + ${priceCents} WHERE id = ${session.userId}`;
    return { ok: false, error: "We couldn't issue the eSIM. Your balance was not charged." };
  }

  await persistWalletOrder(planId, email, order, priceCents, Number(session.userId));
  return { ok: true, order };
}

async function persistWalletOrder(
  planId: string,
  email: string,
  order: OrderResult,
  priceCents: number,
  userId: number
): Promise<void> {
  if (!hasDatabase()) return;
  try {
    const summary = resolvePlanSummary(planId);
    if (!summary) return;
    const countrySlug = getPlan(planId)?.countrySlug ?? null;

    await ensureSchema();
    await sql()`
      INSERT INTO esims (user_id, order_ref, email, plan_id, country_slug, title, flag, data_label, days, price_cents, activation_code, smdp_address)
      VALUES (${userId}, ${order.orderId}, ${email}, ${planId}, ${countrySlug}, ${summary.title}, ${summary.flag}, ${summary.data}, ${summary.days}, ${priceCents}, ${order.activationCode}, ${order.smdpAddress})
      ON CONFLICT (order_ref) DO NOTHING
    `;

    await sql()`
      INSERT INTO transactions (user_id, kind, description, amount_cents)
      VALUES (${userId}, 'balance_purchase', ${`${summary.title} · ${summary.data}`}, ${-priceCents})
    `;

    const pdf = await generateInvoicePdf({
      orderRef: order.orderId,
      email,
      currency: "EUR",
      title: summary.title,
      dataLabel: summary.data,
      days: summary.days,
      priceCents,
      issuedAt: new Date(),
    });

    await sendMail({
      to: email,
      ...invoiceEmail({ firstName: undefined, orderRef: order.orderId, title: summary.title, dataLabel: summary.data, days: summary.days, priceCents }),
      attachments: [{ filename: `invoice-${order.orderId}.pdf`, content: pdf }],
    });
  } catch (err) {
    console.error("[checkout] persistWalletOrder failed:", err);
  }
}
