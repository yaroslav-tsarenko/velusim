import { getPlan, formatData, plansFor } from "@/lib/data/plans";
import { getCountry } from "@/lib/data/countries";

export interface PlanSummary {
  id: string;
  title: string;
  flag: string;
  coords: string;
  data: string;
  days: number;
  network: string;
  speed: string;
  price: number;
}

const GLOBAL: Record<string, { data: string; days: number; price: number }> = {
  "global-1-7": { data: "1 GB", days: 7, price: 9 },
  "global-3-30": { data: "3 GB", days: 30, price: 22 },
  "global-10-30": { data: "10 GB", days: 30, price: 45 },
  "global-unl-15": { data: "Unlimited", days: 15, price: 69 },
};

/** Resolve a plan id (country or global) into a display summary for checkout. */
export function resolvePlanSummary(id: string | undefined): PlanSummary | null {
  if (!id) return null;

  if (id.startsWith("global-")) {
    const g = GLOBAL[id];
    if (!g) return null;
    return {
      id,
      title: "Global plan · 130+ countries",
      flag: "🌍",
      coords: "worldwide",
      data: g.data,
      days: g.days,
      network: "Multi-network",
      speed: "4G/5G",
      price: g.price,
    };
  }

  const plan = getPlan(id);
  const country = plan && getCountry(plan.countrySlug);
  if (!plan || !country) return null;
  return {
    id,
    title: `${country.name} eSIM`,
    flag: country.flag,
    coords: country.coords,
    data: formatData(plan),
    days: plan.validityDays,
    network: plan.network,
    speed: plan.speed,
    price: plan.price,
  };
}

export function fallbackSummary() {
  const first = plansFor("jp")[1];
  return resolvePlanSummary(first.id)!;
}
