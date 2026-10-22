import "server-only";
import crypto from "node:crypto";
import { getCorefyConfig } from "./config";
import { logCorefyEvent } from "./logger";
import type {
  CorefyApiResponse,
  CorefyCreateInvoiceRequest,
  CorefyCustomerPayload,
  CorefyInvoiceResource,
} from "./types";

export interface CreateInvoiceParams {
  transactionRef: string;
  amountEur: number;
  description: string;
  customer: {
    userId?: string | number | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string; // 2-letter ISO code
    street: string;
    city: string;
    postalCode: string;
  };
}

export interface CreateInvoiceResult {
  invoiceId: string;
  hppUrl: string;
  rawStatus: string;
}

export class CorefyApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseData?: unknown
  ) {
    super(message);
    this.name = "CorefyApiError";
  }
}

/**
 * Validates that an HPP URL is a valid, secure HTTPS URL.
 */
export function isValidHttpsUrl(rawUrl: unknown): rawUrl is string {
  if (typeof rawUrl !== "string" || !rawUrl.trim()) return false;
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function getAuthHeader(accountId: string, apiKey: string): string {
  const credentials = `${accountId}:${apiKey}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

/**
 * Creates a payment invoice on Corefy / Sterling Pay with Hosted Payment Page (HPP).
 */
export async function createPaymentInvoice(params: CreateInvoiceParams): Promise<CreateInvoiceResult> {
  const config = getCorefyConfig();
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  const customerPayload: CorefyCustomerPayload = {
    reference_id: params.customer.userId ? String(params.customer.userId) : `guest_${crypto.randomBytes(6).toString("hex")}`,
    email: params.customer.email,
    name: `${params.customer.firstName.trim()} ${params.customer.lastName.trim()}`.trim(),
    first_name: params.customer.firstName.trim(),
    surname: params.customer.lastName.trim(),
    phone: params.customer.phone.trim(),
    address: {
      full_address: `${params.customer.street.trim()}, ${params.customer.city.trim()}, ${params.customer.postalCode.trim()}`,
      country: params.customer.country.trim().toUpperCase(),
      city: params.customer.city.trim(),
      street: params.customer.street.trim(),
      post_code: params.customer.postalCode.trim(),
    },
  };

  const returnUrl = `${config.appUrl}/payment/return?ref=${encodeURIComponent(params.transactionRef)}`;
  const callbackUrl = `${config.appUrl}/payments/corefy/webhook`;

  const requestBody: CorefyCreateInvoiceRequest = {
    data: {
      type: "payment-invoices",
      attributes: {
        reference_id: params.transactionRef,
        amount: Number(params.amountEur.toFixed(2)),
        currency: "EUR",
        service: config.serviceCode,
        flow: "charge",
        test_mode: config.testMode,
        description: params.description,
        customer: customerPayload,
        return_url: returnUrl,
        return_urls: {
          success: returnUrl,
          pending: returnUrl,
          fail: returnUrl,
        },
        callback_url: callbackUrl,
        metadata: {
          transaction_ref: params.transactionRef,
          source: "velusim",
        },
      },
    },
  };

  logCorefyEvent({
    level: "info",
    event: "create_payment_invoice_request",
    requestId,
    transactionRef: params.transactionRef,
    amount: params.amountEur,
    currency: "EUR",
    details: {
      url: `${config.apiUrl}/payment-invoices`,
      body: requestBody,
    },
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  let response: Response;
  try {
    response = await fetch(`${config.apiUrl}/payment-invoices`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(config.accountId, config.apiKey),
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const durationMs = Date.now() - startTime;
    const isTimeout = err instanceof Error && err.name === "AbortError";
    const errorMessage = isTimeout ? "Corefy API request timed out (25s)" : String(err);

    logCorefyEvent({
      level: "error",
      event: "create_payment_invoice_network_error",
      requestId,
      transactionRef: params.transactionRef,
      durationMs,
      error: errorMessage,
    });

    throw new CorefyApiError(
      `Failed to connect to payment provider: ${errorMessage}`
    );
  } finally {
    clearTimeout(timeoutId);
  }

  const durationMs = Date.now() - startTime;
  const rawText = await response.text();

  let responseJson: CorefyApiResponse | null = null;
  try {
    responseJson = rawText ? JSON.parse(rawText) : null;
  } catch {
    // Non-JSON response
  }

  logCorefyEvent({
    level: response.ok ? "info" : "error",
    event: "create_payment_invoice_response",
    requestId,
    transactionRef: params.transactionRef,
    httpStatus: response.status,
    durationMs,
    providerInvoiceId: responseJson?.data?.id,
    providerStatus: responseJson?.data?.attributes?.status,
    details: {
      response: responseJson ?? rawText,
    },
  });

  if (!response.ok || !responseJson?.data) {
    const errorDetail =
      responseJson?.errors?.[0]?.detail ||
      responseJson?.errors?.[0]?.title ||
      `HTTP ${response.status}: ${rawText.slice(0, 200)}`;
    throw new CorefyApiError(`Payment provider error: ${errorDetail}`, response.status, responseJson);
  }

  const data = responseJson.data;
  const invoiceId = data.id;
  const flowAction = data.attributes?.flow_data?.action;
  const hppFallback = data.attributes?.hpp_url;
  const rawHppUrl = flowAction || hppFallback;

  if (!rawHppUrl || !isValidHttpsUrl(rawHppUrl)) {
    throw new CorefyApiError(
      `Payment provider did not return a valid HTTPS payment URL: ${rawHppUrl}`
    );
  }

  return {
    invoiceId,
    hppUrl: rawHppUrl,
    rawStatus: data.attributes.status ?? "pending",
  };
}

/**
 * Retrieves a payment invoice from Corefy API for private verification.
 * Used during webhook verification and reconciliation.
 */
export async function getPaymentInvoice(invoiceId: string): Promise<CorefyInvoiceResource> {
  const config = getCorefyConfig();
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  logCorefyEvent({
    level: "info",
    event: "get_payment_invoice_request",
    requestId,
    providerInvoiceId: invoiceId,
  });

  let response: Response;
  try {
    response = await fetch(`${config.apiUrl}/payment-invoices/${encodeURIComponent(invoiceId)}`, {
      method: "GET",
      headers: {
        Authorization: getAuthHeader(config.accountId, config.apiKey),
        Accept: "application/vnd.api+json",
      },
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const durationMs = Date.now() - startTime;
    const errorMessage = String(err);

    logCorefyEvent({
      level: "error",
      event: "get_payment_invoice_network_error",
      requestId,
      providerInvoiceId: invoiceId,
      durationMs,
      error: errorMessage,
    });

    throw new CorefyApiError(`Failed to fetch payment invoice ${invoiceId}: ${errorMessage}`);
  } finally {
    clearTimeout(timeoutId);
  }

  const durationMs = Date.now() - startTime;
  const rawText = await response.text();

  let responseJson: CorefyApiResponse | null = null;
  try {
    responseJson = rawText ? JSON.parse(rawText) : null;
  } catch {
    // Non-JSON
  }

  logCorefyEvent({
    level: response.ok ? "info" : "warn",
    event: "get_payment_invoice_response",
    requestId,
    providerInvoiceId: invoiceId,
    httpStatus: response.status,
    durationMs,
    providerStatus: responseJson?.data?.attributes?.status,
    providerResolution: responseJson?.data?.attributes?.resolution,
  });

  if (!response.ok || !responseJson?.data) {
    throw new CorefyApiError(
      `Payment invoice fetch failed with status ${response.status}`,
      response.status,
      responseJson
    );
  }

  return responseJson.data;
}
