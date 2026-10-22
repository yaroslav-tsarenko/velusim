import { NextRequest, NextResponse } from "next/server";
import { getCorefyConfig } from "@/lib/payments/corefy/config";
import { verifyCorefySignature } from "@/lib/payments/corefy/signature";
import { getPaymentInvoice } from "@/lib/payments/corefy/client";
import { logCorefyEvent } from "@/lib/payments/corefy/logger";
import {
  getOrderByRef,
  getOrderByProviderInvoiceId,
  processOrderPayment,
} from "@/lib/payments/orders";
import type { CorefyStatus, CorefyWebhookPayload } from "@/lib/payments/corefy/types";

export const dynamic = "force-dynamic";

/**
 * Corefy / Sterling Pay Webhook Handler
 *
 * Implements strict signature verification, private GET reconciliation,
 * currency/amount validation in cents, and idempotent state transitions.
 */
export async function POST(req: NextRequest) {
  const config = getCorefyConfig();
  const rawBody = await req.text();
  const signature =
    req.headers.get("x-signature") ||
    req.headers.get("X-Signature") ||
    req.headers.get("signature");

  logCorefyEvent({
    level: "info",
    event: "webhook_received",
    details: {
      hasSignature: Boolean(signature),
      signatureAlgorithm: config.signatureAlgorithm,
      bodyLength: rawBody.length,
    },
  });

  // 1. Signature verification per specification
  if (!config.webhookSecret) {
    logCorefyEvent({
      level: "error",
      event: "webhook_secret_missing",
      error: "COREFY_WEBHOOK_SECRET is not configured on the server",
    });
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const isValidSignature = verifyCorefySignature(rawBody, signature, config.webhookSecret);
  if (!isValidSignature) {
    logCorefyEvent({
      level: "warn",
      event: "webhook_signature_invalid",
      details: {
        providedSignature: signature,
      },
      error: "Signature mismatch: verification failed",
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 2. Parse raw payload
  let payload: CorefyWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    logCorefyEvent({
      level: "error",
      event: "webhook_json_parse_error",
      error: String(err),
    });
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const invoiceData = payload?.data;
  if (!invoiceData || invoiceData.type !== "payment-invoices") {
    logCorefyEvent({
      level: "warn",
      event: "webhook_invalid_resource_type",
      details: { type: invoiceData?.type },
    });
    return NextResponse.json({ error: "Unexpected resource type" }, { status: 400 });
  }

  const invoiceId = invoiceData.id;
  const webhookRef = invoiceData.attributes?.reference_id;
  const webhookStatus = (invoiceData.attributes?.status ?? "pending") as CorefyStatus;
  const resolution = invoiceData.attributes?.resolution;

  logCorefyEvent({
    level: "info",
    event: "webhook_payload_parsed",
    transactionRef: webhookRef,
    providerInvoiceId: invoiceId,
    providerStatus: webhookStatus,
    providerResolution: resolution,
  });

  // 3. Private GET verification to prevent spoofing & state desync
  let privateInvoice;
  try {
    privateInvoice = await getPaymentInvoice(invoiceId);
  } catch (err) {
    logCorefyEvent({
      level: "error",
      event: "webhook_private_verification_failed",
      transactionRef: webhookRef,
      providerInvoiceId: invoiceId,
      error: String(err),
    });
    return NextResponse.json({ error: "Failed to verify invoice with provider" }, { status: 502 });
  }

  const verifiedAttr = privateInvoice.attributes;
  const verifiedType = privateInvoice.type;
  const verifiedRef = verifiedAttr.reference_id;
  const verifiedStatus = verifiedAttr.status as CorefyStatus;
  const verifiedCurrency = verifiedAttr.currency;
  const verifiedAmount = verifiedAttr.amount;
  const verifiedTestMode = Boolean(verifiedAttr.test_mode);

  // Check resource type
  if (verifiedType !== "payment-invoices") {
    return NextResponse.json({ error: "Invalid provider resource type" }, { status: 400 });
  }

  // Find local order
  const localOrder = (await getOrderByRef(verifiedRef)) || (await getOrderByProviderInvoiceId(invoiceId));
  if (!localOrder) {
    logCorefyEvent({
      level: "warn",
      event: "webhook_order_not_found",
      transactionRef: verifiedRef,
      providerInvoiceId: invoiceId,
    });
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // 4. Verification checks per specification:
  // - ID & ownership
  // - Reference matching
  if (localOrder.transactionRef !== verifiedRef) {
    logCorefyEvent({
      level: "error",
      event: "webhook_ref_mismatch",
      transactionRef: localOrder.transactionRef,
      details: { expected: localOrder.transactionRef, got: verifiedRef },
    });
    return NextResponse.json({ error: "Reference ID mismatch" }, { status: 400 });
  }

  // - Currency check (EUR)
  if (verifiedCurrency?.toUpperCase() !== localOrder.currency.toUpperCase()) {
    logCorefyEvent({
      level: "error",
      event: "webhook_currency_mismatch",
      transactionRef: localOrder.transactionRef,
      details: { expected: localOrder.currency, got: verifiedCurrency },
    });
    return NextResponse.json({ error: "Currency mismatch" }, { status: 400 });
  }

  // - Amount check (in cents)
  const invoiceAmountCents = Math.round(Number(verifiedAmount) * 100);
  if (invoiceAmountCents !== localOrder.amountCents) {
    logCorefyEvent({
      level: "error",
      event: "webhook_amount_mismatch",
      transactionRef: localOrder.transactionRef,
      details: { expectedCents: localOrder.amountCents, gotCents: invoiceAmountCents },
    });
    return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
  }

  // - test_mode check
  if (verifiedTestMode !== config.testMode) {
    logCorefyEvent({
      level: "warn",
      event: "webhook_test_mode_mismatch",
      transactionRef: localOrder.transactionRef,
      details: { expected: config.testMode, got: verifiedTestMode },
    });
    // In live mode, rejecting test_mode payments is mandatory
    if (!config.testMode && verifiedTestMode) {
      return NextResponse.json({ error: "Test mode payments not permitted" }, { status: 400 });
    }
  }

  // - For processed payments: check processed_amount matches order amount in cents
  if (verifiedStatus === "processed") {
    const processedAmountCents =
      verifiedAttr.processed_amount !== undefined
        ? Math.round(Number(verifiedAttr.processed_amount) * 100)
        : invoiceAmountCents;

    if (processedAmountCents !== localOrder.amountCents) {
      logCorefyEvent({
        level: "error",
        event: "webhook_processed_amount_mismatch",
        transactionRef: localOrder.transactionRef,
        details: { expectedCents: localOrder.amountCents, processedAmountCents },
      });
      return NextResponse.json({ error: "Processed amount mismatch" }, { status: 400 });
    }
  }

  // 5. Atomic and idempotent order status processing
  await processOrderPayment(localOrder.transactionRef, verifiedStatus, {
    providerInvoiceId: invoiceId,
    rawStatus: verifiedStatus,
    resolution: verifiedAttr.resolution,
  });

  return NextResponse.json({ status: "ok", reference_id: localOrder.transactionRef });
}
