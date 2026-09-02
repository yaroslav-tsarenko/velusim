"use client";

import { useState } from "react";
import Link from "next/link";
import type { RegionId } from "@/lib/types";
import { regions } from "@/lib/data/regions";
import { countriesByRegion } from "@/lib/data/countries";
import { ConstellationMap } from "@/components/ui/ConstellationMap";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/utils";

/** The coverage explorer — pick a region, the constellation lights up and the
 *  country list beside it fills with starting prices. */
export function CoverageExplorer() {
  const [region, setRegion] = useState<RegionId>("europe");
  const list = countriesByRegion(region);
  const active = regions.find((r) => r.id === region)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Regions">
          {regions.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={region === r.id}
              onClick={() => setRegion(r.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-[var(--dur-base)]",
                region === r.id
                  ? "border-transparent bg-aurora text-on-aurora shadow-aurora"
                  : "glass text-ink hover:border-hairline-strong",
              )}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="glass mt-6 rounded-panel bg-starfield p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="eyebrow flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-aurora-1 animate-pulse-dot" aria-hidden />
              <span className="text-ink">{active.name}</span>
            </span>
            <span className="font-mono text-[0.62rem] tracking-[0.12em] text-teal">{active.coords}</span>
          </div>
          <ConstellationMap />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl text-ink">{active.name}</h2>
          <span className="shrink-0 text-sm text-ink-muted">
            from <Price usd={active.fromPrice} className="font-semibold text-emerald" />
          </span>
        </div>
        <p className="mt-2 text-pretty text-ink-muted">{active.blurb}</p>

        <ul className="glass mt-5 divide-y divide-hairline overflow-hidden rounded-panel">
          {list.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/destinations/${c.slug}`}
                className="flex items-center justify-between px-4 py-3 transition-colors duration-[var(--dur-fast)] hover:bg-surface"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>{c.flag}</span>
                  <span>
                    <span className="block font-medium text-ink">{c.name}</span>
                    <span className="font-mono text-[0.68rem] tracking-[0.06em] text-ink-muted">
                      {c.iso3} · {c.speeds.join("/")}
                    </span>
                  </span>
                </span>
                <span className="font-mono text-sm text-emerald">
                  <Price usd={c.fromPrice} prefix="from " />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
