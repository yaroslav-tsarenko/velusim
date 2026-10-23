import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Neon serverless SQL client. Throws a readable error when DATABASE_URL is
 * missing so the auth flows fail loudly instead of hitting an opaque driver
 * error. Provision a Postgres database (Neon via the Vercel Marketplace) and
 * set DATABASE_URL to enable persistence.
 */
export function sql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Provision a Postgres database (Neon via the Vercel Marketplace) and add DATABASE_URL to your environment.",
    );
  }
  if (!cached) cached = neon(url);
  return cached;
}

/**
 * Idempotently creates the auth schema. Guarded by a module-level promise so
 * concurrent requests during a cold start only run the DDL once.
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) schemaReady = createSchema();
  return schemaReady;
}

async function createSchema(): Promise<void> {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS users (
      id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      first_name    TEXT NOT NULL,
      last_name     TEXT NOT NULL,
      phone         TEXT NOT NULL,
      dob           DATE NOT NULL,
      street        TEXT NOT NULL,
      city          TEXT NOT NULL,
      country       TEXT NOT NULL,
      postal_code   TEXT NOT NULL,
      balance_cents BIGINT NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS transactions (
      id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      kind        TEXT NOT NULL,
      description TEXT NOT NULL,
      amount_cents BIGINT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS password_resets (
      token_hash TEXT PRIMARY KEY,
      user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      used       BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS esims (
      id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id         BIGINT REFERENCES users(id) ON DELETE SET NULL,
      order_ref       TEXT NOT NULL UNIQUE,
      email           TEXT NOT NULL,
      plan_id         TEXT NOT NULL,
      country_slug    TEXT,
      title           TEXT NOT NULL,
      flag            TEXT NOT NULL,
      data_label      TEXT NOT NULL,
      days            INTEGER NOT NULL,
      price_cents     BIGINT NOT NULL,
      activation_code TEXT NOT NULL,
      smdp_address    TEXT NOT NULL,
      status          TEXT NOT NULL DEFAULT 'ready',
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS orders (
      id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      transaction_ref      TEXT NOT NULL UNIQUE,
      user_id              BIGINT REFERENCES users(id) ON DELETE SET NULL,
      amount_cents         BIGINT NOT NULL,
      currency             TEXT NOT NULL DEFAULT 'EUR',
      plan_id              TEXT NOT NULL,
      plan_title           TEXT NOT NULL,
      plan_data            TEXT NOT NULL,
      plan_days            INTEGER NOT NULL,
      status               TEXT NOT NULL DEFAULT 'pending',
      customer_first_name  TEXT NOT NULL,
      customer_last_name   TEXT NOT NULL,
      customer_email       TEXT NOT NULL,
      customer_phone       TEXT NOT NULL,
      customer_country     TEXT NOT NULL,
      customer_street      TEXT NOT NULL,
      customer_city        TEXT NOT NULL,
      customer_postal_code TEXT NOT NULL,
      provider_invoice_id  TEXT,
      hpp_url              TEXT,
      payment_requested_at TIMESTAMPTZ,
      completed_at         TIMESTAMPTZ,
      failed_at            TIMESTAMPTZ,
      credits_reversed_at  TIMESTAMPTZ,
      raw_provider_status  TEXT,
      esim_activation_code TEXT,
      esim_smdp_address    TEXT,
      created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

