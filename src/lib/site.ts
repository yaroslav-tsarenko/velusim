import { countries } from "@/lib/data/countries";

/** Rounded-down "N+" label derived from the live catalogue so marketing copy
 *  never overstates the number of destinations actually on sale. */
const countriesCovered = `${Math.floor(countries.length / 10) * 10}+`;

/** Company registration details. Sourced from NEXT_PUBLIC_* env vars so the
 *  legal entity can be changed without touching code. Until the entity is
 *  registered these fall back to obvious placeholders — never invent details.
 *  NEXT_PUBLIC_ prefix is required because `site` is imported by client
 *  components (Header, checkout, footer). */
const company = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "COMPANY NAME LTD";
const regNumber = process.env.NEXT_PUBLIC_COMPANY_NUMBER ?? "COMPANY NUMBER";
const address = process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "COMPANY ADDRESS";
const supportEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "support@velusim.com";

export const site = {
  name: "Velusim",
  company,
  regNumber,
  address,
  tagline: "Signal, wherever you land",
  description: `Velusim sells travel eSIMs for ${countriesCovered} countries. Pick your destination, get a QR code instantly, install in one minute — no roaming fees, no physical SIM.`,
  url: "https://velusim.com",
  homeCity: "London",
  homeCoords: "51.5072° N · 0.1276° W",
  supportEmail,
  countriesCovered,
} as const;

export const nav = {
  primary: [
    { label: "Destinations", href: "/destinations", mega: true },
    { label: "Regional plans", href: "/plans/regional" },
    { label: "Global plans", href: "/plans/global" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Compatibility", href: "/compatibility" },
    { label: "Help", href: "/help" },
  ],
} as const;
