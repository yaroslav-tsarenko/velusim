import "server-only";
import { cache } from "react";
import { sql, hasDatabase, ensureSchema } from "./db";
import { readSession } from "./session";
import type { User, Transaction, EsimRecord } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapUser(row: any): User {
  return {
    id: Number(row.id),
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    dob: typeof row.dob === "string" ? row.dob : new Date(row.dob).toISOString().slice(0, 10),
    street: row.street,
    city: row.city,
    country: row.country,
    postalCode: row.postal_code,
    balanceCents: Number(row.balance_cents),
    createdAt: new Date(row.created_at).toISOString(),
  };
}

/**
 * Resolves the currently signed-in user from the session cookie, or null.
 * Wrapped in React cache() so multiple server components in one render share
 * a single DB round-trip.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!hasDatabase()) return null;
  const session = await readSession();
  if (!session) return null;
  await ensureSchema();
  const rows = await sql()`SELECT * FROM users WHERE id = ${session.userId} LIMIT 1`;
  return rows.length ? mapUser(rows[0]) : null;
});

export async function getUserByEmail(email: string): Promise<any | null> {
  await ensureSchema();
  const rows = await sql()`SELECT * FROM users WHERE email = ${email.toLowerCase()} LIMIT 1`;
  return rows.length ? rows[0] : null;
}

export async function getTransactions(userId: number, limit = 20): Promise<Transaction[]> {
  await ensureSchema();
  const rows = await sql()`
    SELECT * FROM transactions WHERE user_id = ${userId}
    ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows.map((row: any) => ({
    id: Number(row.id),
    kind: row.kind,
    description: row.description,
    amountCents: Number(row.amount_cents),
    createdAt: new Date(row.created_at).toISOString(),
  }));
}

export async function getEsims(userId: number): Promise<EsimRecord[]> {
  await ensureSchema();
  const rows = await sql()`
    SELECT * FROM esims WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  return rows.map((row: any) => ({
    id: Number(row.id),
    orderRef: row.order_ref,
    email: row.email,
    planId: row.plan_id,
    countrySlug: row.country_slug,
    title: row.title,
    flag: row.flag,
    dataLabel: row.data_label,
    days: Number(row.days),
    priceCents: Number(row.price_cents),
    activationCode: row.activation_code,
    smdpAddress: row.smdp_address,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
  }));
}
