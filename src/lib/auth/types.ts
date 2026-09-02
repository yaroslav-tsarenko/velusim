export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
  balanceCents: number;
  createdAt: string;
}

export interface Transaction {
  id: number;
  kind: "topup" | "purchase" | "refund";
  description: string;
  amountCents: number;
  createdAt: string;
}

export interface EsimRecord {
  id: number;
  orderRef: string;
  email: string;
  planId: string;
  countrySlug: string | null;
  title: string;
  flag: string;
  dataLabel: string;
  days: number;
  priceCents: number;
  activationCode: string;
  smdpAddress: string;
  status: string;
  createdAt: string;
}
