import type { CurrencyCode } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Prices in the catalogue and billing are in EUR (€). */
const RATES: Record<CurrencyCode, number> = { EUR: 1 };
const SYMBOLS: Record<CurrencyCode, string> = { EUR: "€" };

export function formatPrice(amount: number, currency: CurrencyCode = "EUR"): string {
  const value = amount * RATES[currency];
  return `${SYMBOLS[currency]}${value.toFixed(2)}`;
}

/** Format an amount stored in cents into the selected currency. */
export function formatCents(cents: number, currency: CurrencyCode = "EUR"): string {
  return formatPrice(cents / 100, currency);
}

export function currencySymbol(currency: CurrencyCode = "EUR"): string {
  return SYMBOLS[currency];
}
