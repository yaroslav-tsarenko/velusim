import Link from "next/link";
import type { Country, Plan } from "@/lib/types";
import { formatData } from "@/lib/data/plans";
import { Price } from "@/components/ui/Price";
import { StampBadge } from "@/components/ui/StampBadge";
import { ArrowRight } from "@/components/ui/icons";
import { SignalRoute } from "@/components/ui/SignalRoute";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  plan: Plan;
  country: Country;
  /** The recommended plan — carries the aurora edge-light and the pulse. */
  featured?: boolean;
}

/**
 * The flagship component — a plan as a frosted-glass panel floating on the
 * night base. Header stub: destination + badge. Perforated aurora divider.
 * Body: the mono data block (GB · DAYS · NETWORK), a signal arc from you to
 * the destination, and the CTA. The recommended plan is edge-lit with the
 * aurora gradient and a signal pulse travels its border on hover.
 */
export function PlanCard({ plan, country, featured }: PlanCardProps) {
  const badgeInk = plan.badge === "UNLIMITED" ? "violet" : plan.badge === "NEW" ? "teal" : "emerald";

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-panel glass transition-transform duration-[var(--dur-slow)] ease-[var(--ease-signal)] hover:-translate-y-1",
        featured && "aurora-edge shadow-aurora",
      )}
    >
      {/* The activating signal — a pulse travelling the card's top edge. */}
      {featured ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 animate-border-signal transition-opacity duration-[var(--dur-slow)] group-hover:opacity-100"
        />
      ) : null}

      {/* Header stub — destination */}
      <div className="flex items-start justify-between gap-3 p-5 pb-6">
        <div className="min-w-0">
          <p className="eyebrow">
            {country.iso3} · {country.dialCode}
          </p>
          <h3 className="mt-1.5 truncate font-display text-2xl leading-tight text-ink">
            <span aria-hidden className="mr-1.5">{country.flag}</span>
            {country.name}
          </h3>
          <p className="mt-1 font-mono text-[0.68rem] text-ink-muted">{country.coords}</p>
        </div>
        {plan.badge ? (
          <StampBadge ink={badgeInk} pulse={plan.badge === "BESTSELLER"} className="shrink-0">
            {plan.badge}
          </StampBadge>
        ) : null}
      </div>

      <div className="signal-perf mx-5" aria-hidden />

      {/* Body — mono data block + CTA */}
      <div className="flex flex-1 flex-col p-5 pt-6">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3.5">
          <Field label="Data" value={formatData(plan)} strong />
          <Field label="Validity" value={`${plan.validityDays} days`} />
          <Field label="Network" value={`${plan.speed} · ${plan.network}`} />
          <div>
            <dt className="eyebrow">Price</dt>
            <dd className="mt-1">
              <Price usd={plan.price} className="text-xl font-semibold text-emerald" />
            </dd>
          </div>
        </dl>

        <SignalRoute to={country.iso3} className="mt-5" />

        <Link
          href={{ pathname: "/checkout", query: { plan: plan.id } }}
          className={cn(
            "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full font-medium",
            "transition-[filter,transform] duration-[var(--dur-base)] ease-[var(--ease-signal)]",
            "hover:brightness-[1.06] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2",
            featured
              ? "bg-aurora text-on-aurora shadow-aurora"
              : "bg-emerald text-on-aurora shadow-emerald",
          )}
        >
          Get this plan
          <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-2.5 text-center text-xs text-ink-muted">
          Instant QR delivery · Works on {country.speeds.join("/")}
        </p>
      </div>
    </article>
  );
}

function Field({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className={cn("mt-1 font-mono", strong ? "text-xl font-semibold text-ink" : "text-sm text-ink")}>
        {value}
      </dd>
    </div>
  );
}
