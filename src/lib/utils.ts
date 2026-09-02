import type { CurrencyCode } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Prices in the catalogue are stored in USD; these are display-only rates. */
const RATES: Record<CurrencyCode, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };
const SYMBOLS: Record<CurrencyCode, string> = { USD: "$", EUR: "€", GBP: "£" };

export function formatPrice(usd: number, currency: CurrencyCode = "USD"): string {
  const value = usd * RATES[currency];
  return `${SYMBOLS[currency]}${value.toFixed(2)}`;
}

/** Format a USD-base amount stored in cents into the selected currency. */
export function formatCents(cents: number, currency: CurrencyCode = "USD"): string {
  return formatPrice(cents / 100, currency);
}

export function currencySymbol(currency: CurrencyCode): string {
  return SYMBOLS[currency];
}
