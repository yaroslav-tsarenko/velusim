import "server-only";
import fs from "node:fs";
import path from "node:path";
import { getCorefyConfig } from "./config";

export interface LogEntry {
  level: "info" | "warn" | "error";
  event: string;
  requestId?: string;
  transactionRef?: string;
  providerInvoiceId?: string;
  httpStatus?: number;
  durationMs?: number;
  amount?: number;
  currency?: string;
  providerStatus?: string;
  providerResolution?: string;
  details?: Record<string, unknown>;
  error?: string;
  timestamp?: string;
}

const SENSITIVE_KEYS = new Set([
  "authorization",
  "api_key",
  "apikey",
  "key",
  "secret",
  "webhook_secret",
  "password",
  "token",
  "card_number",
  "card",
  "pan",
  "cvc",
  "cvv",
  "exp",
  "expiry",
]);

/**
 * Recursively masks sensitive fields such as secrets, credentials, and PII.
 */
export function maskSensitive(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") {
    // Mask potential basic auth / bearer auth
    if (/^bearer\s+/i.test(obj)) return "Bearer ***";
    if (/^basic\s+/i.test(obj)) return "Basic ***";
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => maskSensitive(item));
  }
  if (typeof obj === "object") {
    const res: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj)) {
      const lower = key.toLowerCase();
      if (SENSITIVE_KEYS.has(lower)) {
        res[key] = "***MASKED***";
      } else if (lower === "email" && typeof val === "string") {
        const parts = val.split("@");
        res[key] = parts[0].slice(0, 2) + "***@" + (parts[1] ?? "");
      } else if (lower === "phone" && typeof val === "string") {
        res[key] = val.slice(0, 3) + "***" + val.slice(-2);
      } else {
        res[key] = maskSensitive(val);
      }
    }
    return res;
  }
  return obj;
}

export function logCorefyEvent(entry: LogEntry): void {
  const config = getCorefyConfig();
  if (!config.logEnabled) return;

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const logDir = path.resolve(process.cwd(), "storage", "logs");

  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const payload = {
      timestamp: now.toISOString(),
      ...entry,
      details: entry.details ? (maskSensitive(entry.details) as Record<string, unknown>) : undefined,
    };

    const line = JSON.stringify(payload) + "\n";
    const logFilePath = path.join(logDir, `corefy-${dateStr}.log`);
    fs.appendFileSync(logFilePath, line, "utf8");
  } catch (err) {
    console.error("[corefy-logger] Failed to write to log file:", err);
  }
}
