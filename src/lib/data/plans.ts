import type { Country, Plan } from "@/lib/types";
import { getCountry } from "@/lib/data/countries";

/**
 * Plans are generated deterministically from each country's base price so the
 * catalogue stays consistent without a backend. Swap this module for the Yesim
 * API client (see src/lib/api/client.ts) when live data is wired in.
 */
const TEMPLATES: Array<Omit<Plan, "id" | "countrySlug" | "network" | "speed" | "price">> = [
  { dataGb: 1, validityDays: 7 },
  { dataGb: 3, validityDays: 30, badge: "BESTSELLER" },
  { dataGb: 5, validityDays: 30 },
  { dataGb: 10, validityDays: 30 },
  { dataGb: 20, validityDays: 30 },
  { dataGb: null, unlimited: true, validityDays: 10, badge: "UNLIMITED" },
];

function priceFor(base: number, template: (typeof TEMPLATES)[number]): number {
  if (template.unlimited) return round(base * 6.2);
  const gb = template.dataGb ?? 1;
  const dayFactor = template.validityDays >= 30 ? 1.15 : 1;
  return round(base + base * 0.62 * (gb - 1) * dayFactor);
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export function plansFor(slug: string): Plan[] {
  const country = getCountry(slug);
  if (!country) return [];
  return buildPlans(country);
}

function buildPlans(country: Country): Plan[] {
  const speed = country.speeds.includes("5G") ? "5G" : "4G";
  return TEMPLATES.map((t, i) => ({
    id: `${country.slug}-${t.unlimited ? "unl" : t.dataGb}-${t.validityDays}`,
    countrySlug: country.slug,
    dataGb: t.dataGb,
    unlimited: t.unlimited,
    validityDays: t.validityDays,
    network: country.networks[0],
    speed,
    price: priceFor(country.fromPrice, t),
    badge: i === 1 && country.bestseller ? "BESTSELLER" : t.badge,
  }));
}

export function getPlan(id: string): Plan | undefined {
  const slug = id.split("-")[0];
  return plansFor(slug).find((p) => p.id === id);
}

export function formatData(plan: Pick<Plan, "dataGb" | "unlimited">): string {
  if (plan.unlimited) return "Unlimited";
  return `${plan.dataGb} GB`;
}
