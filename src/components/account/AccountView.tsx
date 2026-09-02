"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { getCountry } from "@/lib/data/countries";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { StampBadge } from "@/components/ui/StampBadge";
import { QrCode } from "@/components/checkout/QrCode";
import { topUpAction, logoutAction, type FormState } from "@/lib/auth/actions";
import type { User, Transaction, EsimRecord } from "@/lib/auth/types";
import { usePreferences } from "@/components/providers/Preferences";
import { Bolt } from "@/components/ui/icons";
import { cn, formatCents } from "@/lib/utils";

export type Tab = "esims" | "wallet" | "saved" | "profile";

const savedSlugs: string[] = [];

export function AccountView({
  initialTab,
  user,
  transactions,
  esims,
}: {
  initialTab: Tab;
  user: User;
  transactions: Transaction[];
  esims: EsimRecord[];
}) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div>
      <div role="tablist" aria-label="Account sections" className="flex flex-wrap gap-2">
        <TabBtn active={tab === "esims"} onClick={() => setTab("esims")}>My eSIMs</TabBtn>
        <TabBtn active={tab === "wallet"} onClick={() => setTab("wallet")}>Balance</TabBtn>
        <TabBtn active={tab === "saved"} onClick={() => setTab("saved")}>Saved destinations</TabBtn>
        <TabBtn active={tab === "profile"} onClick={() => setTab("profile")}>Profile</TabBtn>
      </div>

      <div className="mt-8">
        {tab === "esims" ? (
          esims.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {esims.map((e) => (
                <WalletTicket key={e.id} item={e} />
              ))}
            </div>
          ) : (
            <Empty>
              No eSIMs yet.{" "}
              <Link href="/destinations" className="text-emerald underline">Browse destinations</Link> to get your first one.
            </Empty>
          )
        ) : null}

        {tab === "wallet" ? <WalletPanel user={user} transactions={transactions} /> : null}

        {tab === "saved" ? (
          savedSlugs.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {savedSlugs.map((s) => {
                const c = getCountry(s);
                return c ? <DestinationCard key={s} country={c} /> : null;
              })}
            </div>
          ) : (
            <Empty>No saved destinations yet.</Empty>
          )
        ) : null}

        {tab === "profile" ? <ProfilePanel user={user} /> : null}
      </div>
    </div>
  );
}

function WalletPanel({ user, transactions }: { user: User; transactions: Transaction[] }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(topUpAction, {});
  const { currency } = usePreferences();

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-panel glass p-6">
        <p className="eyebrow">Current balance</p>
        <p className="mt-1 font-display text-4xl text-ink">{formatCents(user.balanceCents, currency)}</p>

        <form action={formAction} className="mt-6 space-y-3">
          {state.message ? (
            <p className={cn("rounded-xl border px-4 py-3 text-sm", state.ok ? "border-teal/40 bg-teal/10 text-ink" : "border-emerald/40 bg-emerald/10 text-emerald")}>
              {state.message}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {[10, 25, 50].map((amt) => (
              <button
                key={amt}
                type="submit"
                name="amount"
                value={amt}
                disabled={pending}
                className="inline-flex h-10 items-center rounded-full border border-hairline px-4 text-sm font-medium text-ink transition-colors hover:border-hairline-strong disabled:opacity-50"
              >
                + ${amt}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              name="amount"
              min={1}
              max={1000}
              step="0.01"
              placeholder="Custom amount"
              className="w-full rounded-xl glass px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-emerald"
            />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-full bg-aurora px-5 text-sm font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
            >
              <Bolt className="size-4" /> {pending ? "…" : "Top up"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-panel glass p-6">
        <h3 className="font-display text-xl text-ink">Transaction history</h3>
        {transactions.length ? (
          <ul className="mt-4 divide-y divide-hairline">
            {transactions.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="text-ink">{t.description}</p>
                  <p className="font-mono text-xs text-ink-muted">{new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={cn("font-mono font-semibold", t.amountCents >= 0 ? "text-teal" : "text-emerald")}>
                  {t.amountCents >= 0 ? "+" : "−"}{formatCents(Math.abs(t.amountCents), currency)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink-muted">No transactions yet. Top up to get started.</p>
        )}
      </div>
    </div>
  );
}

function ProfilePanel({ user }: { user: User }) {
  return (
    <div className="max-w-lg rounded-panel glass p-6">
      <h2 className="font-display text-2xl text-ink">Profile</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <Row label="Name" value={`${user.firstName} ${user.lastName}`} />
        <Row label="Email" value={user.email} />
        <Row label="Phone" value={user.phone} />
        <Row label="Date of birth" value={user.dob} />
        <Row label="Address" value={`${user.street}, ${user.city}, ${user.postalCode}, ${user.country}`} />
        <Row label="Member since" value={new Date(user.createdAt).getFullYear().toString()} />
      </dl>
      <form action={logoutAction}>
        <button
          type="submit"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full border border-hairline px-5 text-sm font-medium text-ink transition-colors hover:border-hairline-strong"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

function WalletTicket({ item }: { item: EsimRecord }) {
  const { currency } = usePreferences();
  const country = item.countrySlug ? getCountry(item.countrySlug) : undefined;
  const topUpHref = country ? `/checkout?plan=${country.slug}-3-30` : "/destinations";
  const detailsHref = country ? `/destinations/${country.slug}` : "/destinations";
  const issued = new Date(item.createdAt).toLocaleDateString();

  return (
    <article className="flex flex-col rounded-panel glass">
      <div className="flex items-start justify-between p-5">
        <div>
          <h3 className="font-display text-xl text-ink">
            <span aria-hidden className="mr-1.5">{item.flag}</span>{item.title}
          </h3>
          <p className="font-mono text-[0.68rem] text-ink-muted">{item.orderRef} · issued {issued}</p>
        </div>
        <StampBadge ink="violet">Ready to install</StampBadge>
      </div>
      <div className="signal-perf mx-5" aria-hidden />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4">
          <div className="shrink-0 scale-90 origin-left">
            <QrCode value={item.activationCode} size={96} />
          </div>
          <dl className="flex-1 space-y-1 font-mono text-xs">
            <div className="flex justify-between"><dt className="text-ink-muted">Plan</dt><dd className="text-ink">{item.dataLabel}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Validity</dt><dd className="text-ink">{item.days} days</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Paid</dt><dd className="text-ink">{formatCents(item.priceCents, currency)}</dd></div>
          </dl>
        </div>

        <div className="mt-4 space-y-1 rounded-field bg-surface p-3 font-mono text-[0.68rem] text-ink">
          <p className="flex justify-between gap-2"><span className="text-ink-muted">SM-DP+</span><span>{item.smdpAddress}</span></p>
          <p className="flex flex-col gap-0.5">
            <span className="text-ink-muted">Activation code</span>
            <span className="break-all">{item.activationCode}</span>
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={topUpHref}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-aurora text-sm font-medium text-on-aurora hover:brightness-[1.06]"
          >
            <Bolt className="size-4" /> Top up
          </Link>
          <Link
            href={detailsHref}
            className="inline-flex h-10 items-center justify-center rounded-full border border-hairline px-4 text-sm font-medium text-ink hover:border-hairline-strong"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
        active ? "border-emerald bg-emerald text-on-aurora" : "border-hairline bg-card text-ink hover:border-hairline-strong",
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-hairline pb-2 last:border-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-panel border border-dashed border-hairline bg-card p-10 text-center text-ink-muted">{children}</p>;
}
