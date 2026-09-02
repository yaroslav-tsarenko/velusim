"use client";

import { useMemo, useState } from "react";
import type { Country, RegionId } from "@/lib/types";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { regions } from "@/lib/data/regions";
import { cn } from "@/lib/utils";

export function DestinationsExplorer({ countries }: { countries: Country[] }) {
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return countries.filter(
      (c) =>
        (region === "all" || c.region === region) &&
        (!query || c.name.toLowerCase().includes(query) || c.iso3.toLowerCase().includes(query)),
    );
  }, [countries, region, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by region">
          <Filter active={region === "all"} onClick={() => setRegion("all")}>All</Filter>
          {regions.map((r) => (
            <Filter key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>
              {r.name}
            </Filter>
          ))}
        </div>
        <label className="relative">
          <span className="sr-only">Filter destinations</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by name…"
            className="h-10 w-full rounded-full glass px-4 text-sm text-ink placeholder:text-ink-muted focus:border-aurora-2 focus:outline-none md:w-64"
          />
        </label>
      </div>

      {filtered.length ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((c) => (
            <DestinationCard key={c.slug} country={c} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center font-mono text-sm text-ink-muted">No destinations match “{q}”.</p>
      )}
    </div>
  );
}

function Filter({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active ? "border-emerald bg-emerald text-on-aurora" : "border-hairline bg-card text-ink hover:border-hairline-strong",
      )}
    >
      {children}
    </button>
  );
}
