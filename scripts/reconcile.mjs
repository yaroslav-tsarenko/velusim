#!/usr/bin/env node
/**
 * Reconciliation CLI script for Corefy / Sterling Pay payments.
 * Usage:
 *   node scripts/reconcile.mjs ORDER-UNIQUE123 [--invoice=cpi_payment_id]
 */

import fs from "node:fs";
import path from "node:path";

// Load .env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const args = process.argv.slice(2);
if (!args.length || args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage:
  node scripts/reconcile.mjs <ORDER_REF> [--invoice=<PROVIDER_INVOICE_ID>]

Example:
  node scripts/reconcile.mjs ORD-12345
  node scripts/reconcile.mjs ORD-12345 --invoice=cpi_abc123
`);
  process.exit(0);
}

const orderRef = args[0];
let invoiceIdOverride = null;
for (const arg of args.slice(1)) {
  if (arg.startsWith("--invoice=")) {
    invoiceIdOverride = arg.split("=")[1];
  }
}

const API_URL = (process.env.COREFY_API_URL || "https://api.sterling-pay.com").replace(/\/+$/, "");
const ACCOUNT_ID = process.env.COREFY_ACCOUNT_ID || "";
const API_KEY = process.env.COREFY_API_KEY || "";

if (!ACCOUNT_ID || !API_KEY) {
  console.error("Error: COREFY_ACCOUNT_ID and COREFY_API_KEY must be set in .env");
  process.exit(1);
}

// Read local orders file
const LOCAL_ORDERS_FILE = path.resolve(process.cwd(), "storage", "orders.json");
if (!fs.existsSync(LOCAL_ORDERS_FILE)) {
  console.error(`Orders storage file not found: ${LOCAL_ORDERS_FILE}`);
  process.exit(1);
}

const orders = JSON.parse(fs.readFileSync(LOCAL_ORDERS_FILE, "utf8"));
const order = orders[orderRef];

if (!order) {
  console.error(`Order with reference ${orderRef} was not found in storage.`);
  process.exit(1);
}

const invoiceId = invoiceIdOverride || order.providerInvoiceId;
if (!invoiceId) {
  console.error(
    `No provider invoice ID associated with order ${orderRef}. Pass --invoice=cpi_... to specify.`
  );
  process.exit(1);
}

console.log(`\nReconciling order: ${orderRef}`);
console.log(`Provider invoice ID: ${invoiceId}`);
console.log(`Current local status: ${order.status}`);
console.log(`Calling Corefy API GET /payment-invoices/${invoiceId}...`);

async function reconcile() {
  const auth = `Basic ${Buffer.from(`${ACCOUNT_ID}:${API_KEY}`).toString("base64")}`;
  const response = await fetch(`${API_URL}/payment-invoices/${encodeURIComponent(invoiceId)}`, {
    headers: {
      Authorization: auth,
      Accept: "application/vnd.api+json",
    },
  });

  if (!response.ok) {
    console.error(`Corefy API returned HTTP ${response.status}: ${await response.text()}`);
    process.exit(1);
  }

  const json = await response.json();
  const attr = json?.data?.attributes;
  if (!attr) {
    console.error("Invalid response from Corefy:", json);
    process.exit(1);
  }

  console.log(`Provider status: ${attr.status}`);
  console.log(`Provider amount: ${attr.amount} ${attr.currency}`);
  console.log(`Provider resolution: ${attr.resolution ?? "none"}`);

  // Checks
  if (attr.reference_id !== order.transactionRef) {
    console.error(`Reference mismatch! Provider: ${attr.reference_id}, Local: ${order.transactionRef}`);
    process.exit(1);
  }

  if (attr.currency?.toUpperCase() !== order.currency.toUpperCase()) {
    console.error(`Currency mismatch! Provider: ${attr.currency}, Local: ${order.currency}`);
    process.exit(1);
  }

  const providerAmountCents = Math.round(Number(attr.amount) * 100);
  if (providerAmountCents !== order.amountCents) {
    console.error(`Amount mismatch! Provider cents: ${providerAmountCents}, Local cents: ${order.amountCents}`);
    process.exit(1);
  }

  const now = new Date().toISOString();
  if (attr.status === "processed") {
    if (order.status === "processed") {
      console.log(`Order is already marked as processed (at ${order.completedAt}). Nothing to update.`);
      process.exit(0);
    }

    order.status = "processed";
    order.completedAt = now;
    order.rawProviderStatus = "processed";
    order.providerInvoiceId = invoiceId;
    if (!order.esimActivationCode) {
      const code = `LPA:1$smdp.velusim.io$${order.planId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      order.esimActivationCode = code;
      order.esimSmdpAddress = "smdp.velusim.io";
    }
    order.updatedAt = now;
    orders[orderRef] = order;
    fs.writeFileSync(LOCAL_ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");

    console.log(`✅ Order successfully confirmed and marked as processed!`);
    console.log(`eSIM Activation Code: ${order.esimActivationCode}`);
  } else if (["process_failed", "authorize_failed", "expired", "terminated"].includes(attr.status)) {
    if (order.status === "processed") {
      console.log(`Cannot fail an already processed order.`);
      process.exit(0);
    }
    order.status = "failed";
    order.failedAt = now;
    order.rawProviderStatus = attr.status;
    order.providerInvoiceId = invoiceId;
    order.updatedAt = now;
    orders[orderRef] = order;
    fs.writeFileSync(LOCAL_ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");

    console.log(`⚠️ Order marked as failed (${attr.status}).`);
  } else {
    console.log(`Order status remains ${order.status}. Provider status is '${attr.status}'.`);
  }
}

reconcile().catch((err) => {
  console.error("Reconciliation error:", err);
  process.exit(1);
});
