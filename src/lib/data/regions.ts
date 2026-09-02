import type { Region, RegionId } from "@/lib/types";
import { countries } from "./countries";

type RegionMeta = Pick<Region, "id" | "name" | "blurb" | "coords">;

const META: RegionMeta[] = [
  { id: "europe", name: "Europe", blurb: "One eSIM across the Schengen area and beyond.", coords: "48.85° N · 2.35° E" },
  { id: "asia", name: "Asia", blurb: "Tokyo to Bangkok on a single plan.", coords: "35.68° N · 139.69° E" },
  { id: "americas", name: "Americas", blurb: "North, Central & South — coast to coast.", coords: "40.71° N · 74.00° W" },
  { id: "middle-east", name: "Middle East", blurb: "Stay connected across the Gulf.", coords: "25.20° N · 55.27° E" },
  { id: "africa", name: "Africa", blurb: "Safari-ready coverage on the continent.", coords: "30.04° N · 31.24° E" },
  { id: "oceania", name: "Oceania", blurb: "Australia, New Zealand & the islands.", coords: "33.87° S · 151.21° E" },
];

/** Counts and entry prices are derived from the country catalogue so the
 *  figures shown in menus always match the destinations actually listed. */
export const regions: Region[] = META.map((m) => {
  const list = countries.filter((c) => c.region === m.id);
  return {
    ...m,
    countryCount: list.length,
    fromPrice: list.length ? Math.min(...list.map((c) => c.fromPrice)) : 0,
  };
});

export function getRegion(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

export function totalCountryCount(): number {
  return countries.length;
}

export type { RegionId };
