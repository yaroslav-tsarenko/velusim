"use client";

import { useState } from "react";
import Link from "next/link";
import type { PlanSummary } from "@/lib/data/summary";
import type { OrderResult } from "@/lib/api/client";
import { payWithBalance, createCorefyPayment } from "@/app/checkout/actions";
import { Price } from "@/components/ui/Price";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { InstallSteps } from "@/components/how/InstallSteps";
import { usePreferences } from "@/components/providers/Preferences";
import { QrCode } from "./QrCode";
import { Pulse, Check, Bolt, ArrowRight, Shield } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn, formatCents } from "@/lib/utils";
import { addressCountries } from "@/lib/auth/countries";

type Stage = "form" | "redirecting" | "done";
type Method = "card" | "balance";

export interface CheckoutAccount {
  email: string;
  balanceCents: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  street?: string;
  city?: string;
  postalCode?: string;
}

export function CheckoutFlow({ plan, account }: { plan: PlanSummary; account?: CheckoutAccount | null }) {
  const { currency } = usePreferences();
  const [stage, setStage] = useState<Stage>("form");
  const [method, setMethod] = useState<Method>("card");

  // Customer snapshot fields
  const [firstName, setFirstName] = useState(account?.firstName ?? "");
  const [lastName, setLastName] = useState(account?.lastName ?? "");
  const [email, setEmail] = useState(account?.email ?? "");
  const [phone, setPhone] = useState(account?.phone ?? "");
  const [country, setCountry] = useState(account?.country ?? "GB");
  const [street, setStreet] = useState(account?.street ?? "");
  const [city, setCity] = useState(account?.city ?? "");
  const [postalCode, setPostalCode] = useState(account?.postalCode ?? "");

  const [agreed, setAgreed] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const priceCents = Math.round(plan.price * 100);
  const balanceCents = account?.balanceCents ?? 0;
  const canPayFromBalance = !!account && balanceCents >= priceCents;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (method === "balance") {
      setStage("redirecting");
      try {
        const res = await payWithBalance(plan.id);
        if (res.ok && res.order) {
          setOrder(res.order);
          setStage("done");
        } else {
          setError(res.error ?? "We couldn't charge your balance. Please try again.");
          setStage("form");
        }
      } catch {
        setError("Failed to process payment from balance.");
        setStage("form");
      }
      return;
    }

    // Card payment via Corefy / Sterling Pay Hosted Payment Page (HPP)
    setStage("redirecting");
    try {
      const res = await createCorefyPayment(plan.id, {
        firstName,
        lastName,
        email,
        phone,
        country,
        street,
        city,
        postalCode,
      });

      if (res.ok && res.hppUrl) {
        // Redirect browser to Corefy Hosted Payment Page
        window.location.href = res.hppUrl;
      } else {
        setError(res.error ?? "Failed to initialize payment gateway. Please try again.");
        setStage("form");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setStage("form");
    }
  }

  if (stage === "done" && order) {
    return <Delivery plan={plan} order={order} email={email} copied={copied} setCopied={setCopied} />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      {/* Form */}
      <form onSubmit={onSubmit} className="order-2 rounded-panel glass p-6 sm:p-8 lg:order-1">
        <h2 className="font-display text-2xl text-ink">{account ? "Checkout" : "Guest checkout"}</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Fast, bank-grade secure checkout. Instant eSIM QR delivery after payment.
        </p>

        {account ? (
          <div className="mt-6" role="radiogroup" aria-label="Payment method">
            <div className="grid grid-cols-2 gap-2">
              <MethodTab active={method === "card"} onClick={() => setMethod("card")}>
                Card (HPP)
              </MethodTab>
              <MethodTab
                active={method === "balance"}
                disabled={!canPayFromBalance}
                onClick={() => canPayFromBalance && setMethod("balance")}
              >
                Balance · {formatCents(balanceCents, currency)}
              </MethodTab>
            </div>
            {!canPayFromBalance ? (
              <p className="mt-2 text-xs text-ink-muted">
                Your balance is below this plan&apos;s price. Top up in your account to pay from balance.
              </p>
            ) : null}
          </div>
        ) : null}

        {method === "balance" && account ? (
          <fieldset className="mt-6 space-y-4" disabled={stage === "redirecting"}>
            <div className="rounded-field border border-hairline bg-night p-4">
              <p className="text-sm text-ink-muted">Delivered to</p>
              <p className="font-medium text-ink">{account.email}</p>
            </div>
            <div className="flex items-center justify-between rounded-field bg-surface px-4 py-3 text-sm">
              <span className="text-ink-muted">Paying from balance</span>
              <span className="font-mono font-semibold text-ink">{formatCents(priceCents, currency)}</span>
            </div>
            <div className="flex items-center justify-between px-1 text-sm">
              <span className="text-ink-muted">Balance after purchase</span>
              <span className="font-mono text-ink">{formatCents(balanceCents - priceCents, currency)}</span>
            </div>
          </fieldset>
        ) : (
          <fieldset className="mt-6 space-y-4" disabled={stage === "redirecting"}>
            <div className="rounded-field border border-hairline bg-night/50 p-3.5 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-medium text-emerald">
                <Shield className="size-4" /> Hosted Payment Page
              </span>
              <p className="mt-1">
                You will be securely redirected to our PCI-DSS certified payment gateway to enter your card details.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="firstName" label="First name">
                <input
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alex"
                  className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none"
                />
              </Field>
              <Field id="lastName" label="Last name">
                <input
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Rider"
                  className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email for delivery" hint="We send the QR code & invoice here.">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none"
                />
              </Field>
              <Field id="phone" label="Phone number">
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7700 900077"
                  className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="country" label="Country">
                <select
                  id="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink focus:border-aurora-2 focus:outline-none"
                >
                  {addressCountries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="city" label="City">
                <input
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="London"
                  className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <Field id="street" label="Street address">
                  <input
                    id="street"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="12 Baker Street"
                    className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none"
                  />
                </Field>
              </div>
              <div>
                <Field id="postalCode" label="Postal code">
                  <input
                    id="postalCode"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="NW1 6XE"
                    className="h-12 w-full rounded-field border border-hairline bg-night px-4 text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none"
                  />
                </Field>
              </div>
            </div>
          </fieldset>
        )}

        {error ? <p className="mt-4 rounded-field bg-danger-soft px-4 py-3 text-sm text-danger">{error}</p> : null}

        <label htmlFor="terms" className="mt-6 flex items-start gap-2.5 text-sm text-ink-muted">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-[var(--aurora-1)]"
          />
          <span>
            I read and agree to the{" "}
            <Link href="/legal/terms" className="text-emerald underline-offset-2 hover:underline">
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-emerald underline-offset-2 hover:underline">
              privacy policy
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={stage === "redirecting" || !agreed}
          className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-aurora text-base font-medium text-on-aurora shadow-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {stage === "redirecting" ? (
            <>
              <span className="relative grid size-5 place-items-center" aria-hidden>
                <span className="absolute inset-0 rounded-full border border-on-aurora/50 animate-pulse-ring" />
                <span className="size-1.5 rounded-full bg-on-aurora" />
              </span>
              Connecting to secure payment…
            </>
          ) : method === "balance" ? (
            <>
              Pay {formatCents(priceCents, currency)} from balance <ArrowRight className="size-4" />
            </>
          ) : (
            <>
              Proceed to payment · <Price usd={plan.price} /> <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-ink-muted">
          <li className="inline-flex items-center gap-1">
            <Check className="size-3.5 text-emerald" /> SSL 256-bit secure
          </li>
          <li className="inline-flex items-center gap-1">
            <Bolt className="size-3.5 text-emerald" /> Instant delivery
          </li>
          <li className="inline-flex items-center gap-1">
            <Check className="size-3.5 text-emerald" /> No hidden fees
          </li>
        </ul>

        <div className="mt-5 flex flex-col items-center gap-3 border-t border-hairline pt-5">
          <PaymentMarks />
          <p className="text-center text-[0.7rem] leading-relaxed text-ink-muted">
            Merchant of Record: {site.company} · Reg. no. {site.regNumber} · {site.address}.
          </p>
        </div>
      </form>

      {/* Order summary */}
      <OrderTicket plan={plan} className="order-1 lg:order-2" />
    </div>
  );
}

function OrderTicket({ plan, className }: { plan: PlanSummary; className?: string }) {
  return (
    <aside className={cn("rounded-panel glass aurora-edge shadow-aurora", className)}>
      <div className="p-6">
        <p className="eyebrow flex items-center gap-2">
          <Pulse className="size-4 text-emerald" />
          <span className="text-ink">Order summary</span>
        </p>
        <h3 className="mt-1 font-display text-2xl text-ink">
          <span aria-hidden className="mr-1.5">{plan.flag}</span>
          {plan.title}
        </h3>
        <p className="font-mono text-[0.68rem] text-ink-muted">{plan.coords}</p>
      </div>
      <div className="signal-perf mx-6" aria-hidden />
      <div className="p-6">
        <dl className="space-y-2 font-mono text-sm">
          <Line label="Data" value={plan.data} />
          <Line label="Validity" value={`${plan.days} days`} />
          <Line label="Network" value={`${plan.speed} · ${plan.network}`} />
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-sm text-ink-muted">Total due</span>
          <Price usd={plan.price} className="text-2xl font-semibold text-ink" />
        </div>
      </div>
    </aside>
  );
}

function Delivery({
  plan,
  order,
  email,
  copied,
  setCopied,
}: {
  plan: PlanSummary;
  order: OrderResult;
  email: string;
  copied: boolean;
  setCopied: (v: boolean) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="relative inline-grid size-16 place-items-center rounded-full bg-emerald text-on-aurora animate-fade-up">
          <span aria-hidden className="absolute inset-0 rounded-full border border-aurora-1/60 animate-pulse-ring" />
          <span aria-hidden className="absolute -inset-2 rounded-full border border-aurora-2/30 animate-pulse-ring [animation-delay:0.6s]" />
          <Check className="size-7" />
        </span>
        <h2 className="mt-4 font-display text-4xl text-ink">Your eSIM is ready</h2>
        <p className="mt-2 text-ink-muted">
          Order <span className="font-mono text-ink">{order.orderId}</span> · a copy is on its way to{" "}
          <span className="font-medium text-ink">{email}</span>.
        </p>
      </div>

      <div className="glass aurora-edge relative mt-8 grid gap-6 overflow-hidden rounded-panel p-6 shadow-aurora sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px animate-border-signal" />
        <div className="mx-auto animate-fade-up">
          <QrCode value={order.qrCode} />
        </div>
        <div>
          <p className="eyebrow">Scan to install</p>
          <h3 className="mt-1 font-display text-2xl text-ink">
            <span aria-hidden className="mr-1.5">{plan.flag}</span>
            {plan.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            {plan.data} · {plan.days} days · {plan.speed}
          </p>

          <div className="mt-4 space-y-1.5 rounded-field bg-surface p-4 font-mono text-xs text-ink">
            <p className="flex justify-between gap-2">
              <span className="text-ink-muted">SM-DP+</span>
              <span>{order.smdpAddress}</span>
            </p>
            <p className="flex flex-col gap-1">
              <span className="text-ink-muted">Activation code</span>
              <span className="break-all">{order.activationCode}</span>
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(order.activationCode);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-full glass px-4 text-sm font-medium text-ink hover:border-emerald"
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald" /> Copied
              </>
            ) : (
              "Copy activation code"
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-panel glass p-6 sm:p-8">
        <h3 className="font-display text-2xl text-ink">Install in about a minute</h3>
        <p className="mb-5 mt-1 text-sm text-ink-muted">Pick your device below.</p>
        <InstallSteps />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/account?tab=esims"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-aurora px-6 font-medium text-on-aurora hover:brightness-[1.06]"
        >
          View in My eSIMs <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/destinations"
          className="inline-flex h-12 items-center rounded-full glass px-6 font-medium text-ink hover:border-hairline-strong"
        >
          Add another destination
        </Link>
      </div>
    </div>
  );
}

function MethodTab({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-12 items-center justify-center rounded-field border px-3 text-sm font-medium transition-colors",
        active
          ? "border-emerald bg-emerald/10 text-ink"
          : "border-hairline bg-night text-ink-muted hover:border-hairline-strong",
        disabled && "cursor-not-allowed opacity-50 hover:border-hairline"
      )}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
