import { countries } from "@/lib/data/countries";

/** Rounded-down "N+" label derived from the live catalogue so marketing copy
 *  never overstates the number of destinations actually on sale. */
const countriesCovered = `${Math.floor(countries.length / 10) * 10}+`;

/** Confirmed HARTWICK VENTURES LTD registration (Companies House 17206399),
 *  hardcoded as the single source of truth for the legal entity. */
const company = "HARTWICK VENTURES LTD";
const regNumber = "17206399";
const address = "Dept 6789, 196 High Road, Wood Green, London, United Kingdom, N22 8HH";
const supportEmail = "info@velusim.com";
const phone = "+44 7476 928624";
const phoneHref = "tel:+447476928624";

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
  phone,
  phoneHref,
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
