export type RegionId =
  | "europe"
  | "asia"
  | "americas"
  | "middle-east"
  | "africa"
  | "oceania";

export interface Region {
  id: RegionId;
  name: string;
  blurb: string;
  countryCount: number;
  fromPrice: number;
  coords: string;
}

export interface Country {
  /** ISO-3166 alpha-2, lowercase — used in URLs */
  slug: string;
  name: string;
  /** ISO alpha-3 for the mono chip, e.g. JPN */
  iso3: string;
  /** International dialling code, e.g. +81 */
  dialCode: string;
  flag: string;
  region: RegionId;
  /** "35.6762, 139.6503" style caption */
  coords: string;
  networks: string[];
  speeds: ("4G" | "5G")[];
  popular?: boolean;
  bestseller?: boolean;
  /** cached lowest plan price for cards */
  fromPrice: number;
}

export interface Plan {
  id: string;
  countrySlug: string;
  /** GB, or null for unlimited */
  dataGb: number | null;
  unlimited?: boolean;
  validityDays: number;
  price: number;
  network: string;
  speed: "4G" | "5G";
  badge?: "BESTSELLER" | "NEW" | "UNLIMITED";
}

export interface Device {
  brand: string;
  model: string;
  esimSupported: boolean;
  note?: string;
}

export type CurrencyCode = "USD" | "EUR" | "GBP";
