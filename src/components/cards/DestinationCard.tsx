import Link from "next/link";
import type { Country } from "@/lib/types";
import { Price } from "@/components/ui/Price";
import { StampBadge } from "@/components/ui/StampBadge";

/** Compact destination tile — flag, mono country code, from-price. A faint
 *  constellation lights up with the aurora on hover. */
export function DestinationCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/destinations/${country.slug}`}
      className="glass group relative flex flex-col justify-between overflow-hidden rounded-card p-5 transition-[transform,border-color] duration-[var(--dur-slow)] ease-[var(--ease-signal)] hover:-translate-y-1 hover:border-hairline-strong"
    >
      {/* Constellation corner — dots joined by a faint arc. */}
      <svg
        viewBox="0 0 120 90"
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-32 text-aurora-2 opacity-25 transition-opacity duration-[var(--dur-slow)] group-hover:opacity-70"
      >
        <path d="M14 74 Q 56 8 108 26" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" />
        <circle cx="14" cy="74" r="2" fill="currentColor" />
        <circle cx="58" cy="30" r="1.6" fill="currentColor" />
        <circle cx="108" cy="26" r="2.4" fill="currentColor" />
        <circle cx="86" cy="58" r="1.2" fill="currentColor" />
      </svg>

      <div className="relative flex items-start justify-between gap-2">
        <span className="text-3xl leading-none" aria-hidden>{country.flag}</span>
        {country.bestseller ? (
          <StampBadge ink="violet" pulse>Bestseller</StampBadge>
        ) : country.popular ? (
          <StampBadge ink="teal">Popular</StampBadge>
        ) : null}
      </div>

      <div className="relative mt-4">
        <h3 className="font-display text-xl text-ink">{country.name}</h3>
        <p className="mt-0.5 font-mono text-[0.68rem] text-ink-muted">
          {country.iso3} · {country.dialCode}
        </p>
      </div>

      <div className="relative mt-4 flex items-end justify-between">
        <span className="text-xs text-ink-muted">
          from <Price usd={country.fromPrice} className="text-sm font-semibold text-emerald" />
        </span>
        <span className="eyebrow text-teal">{country.speeds.join("/")}</span>
      </div>
    </Link>
  );
}
