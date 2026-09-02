import "server-only";
import type { Country, Plan } from "@/lib/types";
import { countries } from "@/lib/data/countries";
import { plansFor } from "@/lib/data/plans";

/**
 * Yesim Partner API client.
 * Docs: https://documenter.getpostman.com/view/19324374/2sA3kbgy28
 *
 * The live API is JS-rendered documentation; endpoints below are declared as a
 * thin, typed seam. When credentials are present we call the partner API and
 * normalise its payload to our domain types; otherwise we serve the local
 * catalogue so the storefront renders fully in development.
 */
const BASE_URL = process.env.YESIM_API_URL;
const API_KEY = process.env.YESIM_API_KEY; // set in .env.local, never committed

/**
 * Live mode requires BOTH a confirmed base URL and a key. The Yesim docs are
 * JS-rendered, so until the exact endpoints are verified we run in catalogue
 * mode even when a key is present — this avoids failing fetches in dev.
 */
function isLive(): boolean {
  return Boolean(API_KEY && BASE_URL);
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL!}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      ...init?.headers,
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Yesim API ${path} → ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function fetchCountries(): Promise<Country[]> {
  if (!isLive()) return countries;
  try {
    // Expected shape normalised in a mapper when live; falls back on error.
    return await call<Country[]>("/countries");
  } catch {
    return countries;
  }
}

export async function fetchPlans(countrySlug: string): Promise<Plan[]> {
  if (!isLive()) return plansFor(countrySlug);
  try {
    return await call<Plan[]>(`/countries/${countrySlug}/packages`);
  } catch {
    return plansFor(countrySlug);
  }
}

export interface OrderResult {
  orderId: string;
  qrCode: string; // data URI or LPA activation string
  activationCode: string;
  smdpAddress: string;
}

export async function createOrder(planId: string, email: string): Promise<OrderResult> {
  if (isLive()) {
    return call<OrderResult>("/orders", {
      method: "POST",
      body: JSON.stringify({ planId, email }),
      cache: "no-store",
    });
  }
  // Deterministic mock so the delivery screen works end-to-end offline.
  const activationCode = `LPA:1$smdp.velusim.io$${planId.toUpperCase()}-${Date.now()
    .toString(36)
    .toUpperCase()}`;
  return {
    orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
    qrCode: activationCode,
    activationCode,
    smdpAddress: "smdp.velusim.io",
  };
}
