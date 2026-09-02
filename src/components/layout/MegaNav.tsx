"use client";

import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { FlagChip } from "@/components/ui/FlagChip";
import { StampBadge } from "@/components/ui/StampBadge";
import { Price } from "@/components/ui/Price";
import { ArrowRight, Globe } from "@/components/ui/icons";
import { popularCountries } from "@/lib/data/countries";
import { regions } from "@/lib/data/regions";
import { site } from "@/lib/site";

export function MegaNav({ onClose }: { onClose: () => void }) {
  const popular = popularCountries().slice(0, 8);

  return (
    <div
      onMouseLeave={onClose}
      className="absolute inset-x-0 top-full border-b border-hairline bg-night/95 backdrop-blur-xl shadow-glow-lg"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-aurora opacity-60" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        {/* Search + popular destinations */}
        <div>
          <DestinationSearch
            className="mb-5"
            placeholder={`Search ${site.countriesCovered} destinations…`}
          />
          <p className="eyebrow mb-3">Popular destinations</p>
          <ul className="grid grid-cols-2 gap-1">
            {popular.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/destinations/${c.slug}`}
                  className="flex items-center justify-between rounded-field px-2 py-1.5 transition-colors duration-[var(--dur-fast)] hover:bg-surface"
                >
                  <FlagChip
                    flag={c.flag}
                    name={c.name}
                    className="border-transparent bg-transparent px-0 shadow-none backdrop-blur-none"
                    size="sm"
                  />
                  <span className="font-mono text-[0.7rem] text-emerald">
                    <Price usd={c.fromPrice} prefix="from " />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Regions */}
        <div>
          <p className="eyebrow mb-3">Regions</p>
          <ul className="space-y-0.5">
            {regions.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/regions/${r.id}`}
                  className="group flex items-center justify-between rounded-field px-2 py-2 transition-colors duration-[var(--dur-fast)] hover:bg-surface"
                >
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Globe className="size-4 text-teal" /> {r.name}
                  </span>
                  <span className="font-mono text-[0.7rem] text-ink-muted">
                    {r.countryCount} countries
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* One featured glass-card deal */}
        <div>
          <p className="eyebrow mb-3">Featured deal</p>
          <Link
            href="/destinations/jp"
            className="glass aurora-edge group block overflow-hidden rounded-panel shadow-aurora"
          >
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <span className="text-2xl" aria-hidden>🇯🇵</span>
                <h4 className="mt-1 font-display text-xl text-ink">Japan · 5G</h4>
                <p className="mt-0.5 font-mono text-[0.68rem] text-ink-muted">JPN · +81</p>
              </div>
              <StampBadge ink="violet" pulse>Bestseller</StampBadge>
            </div>
            <div className="signal-perf mx-4" aria-hidden />
            <div className="flex items-center justify-between p-4">
              <span className="font-mono text-sm text-ink">3 GB · 30 days</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-emerald">
                <Price usd={7.5} />
                <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
