"use client";

import { useMemo, useState } from "react";
import type { Plan } from "@/lib/types";
import { formatData } from "@/lib/data/plans";
import { Price } from "@/components/ui/Price";
import { Pulse } from "@/components/ui/icons";

const HABITS = [
  { key: "maps", label: "Maps & navigation", perDay: 0.15 },
  { key: "chat", label: "Messaging & email", perDay: 0.1 },
  { key: "social", label: "Social & browsing", perDay: 0.4 },
  { key: "video", label: "Streaming video", perDay: 1.2 },
];

/** Interactive "how much data do I need?" widget → recommends a plan.
 *  The estimate bar fills with the aurora as the requirement grows. */
export function DataCalculator({ plans, days: initialDays = 7 }: { plans: Plan[]; days?: number }) {
  const [days, setDays] = useState(initialDays);
  const [active, setActive] = useState<Record<string, boolean>>({
    maps: true,
    chat: true,
    social: true,
    video: false,
  });

  const perDay = HABITS.reduce((sum, h) => sum + (active[h.key] ? h.perDay : 0), 0);
  const needGb = Math.max(0.5, Math.round(perDay * days * 10) / 10);

  const recommended = useMemo(() => {
    const sorted = [...plans].sort((a, b) => (a.dataGb ?? 999) - (b.dataGb ?? 999));
    return sorted.find((p) => p.unlimited || (p.dataGb ?? 0) >= needGb) ?? sorted[sorted.length - 1];
  }, [plans, needGb]);

  /** Cap the meter at 20 GB so the bar stays readable on long trips. */
  const fill = Math.min(100, (needGb / 20) * 100);

  return (
    <div className="glass rounded-panel p-6">
      <p className="eyebrow flex items-center gap-2">
        <Pulse className="size-4 text-emerald" />
        <span className="text-ink">Data calculator</span>
      </p>
      <h3 className="mt-3 font-display text-2xl text-ink">How much data do you need?</h3>

      <div className="mt-6">
        <label htmlFor="trip-days" className="flex items-center justify-between text-sm text-ink">
          <span>Trip length</span>
          <span className="font-mono font-semibold text-emerald">{days} days</span>
        </label>
        <input
          id="trip-days"
          type="range"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="mt-2.5 w-full accent-[var(--aurora-1)]"
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm text-ink">What will you do online?</legend>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {HABITS.map((h) => (
            <label
              key={h.key}
              className={`flex cursor-pointer items-center gap-2 rounded-field border px-3 py-2.5 text-sm transition-colors duration-[var(--dur-base)] ${
                active[h.key]
                  ? "border-emerald/50 bg-emerald-soft text-ink"
                  : "border-hairline text-ink-muted hover:border-hairline-strong"
              }`}
            >
              <input
                type="checkbox"
                checked={!!active[h.key]}
                onChange={(e) => setActive((s) => ({ ...s, [h.key]: e.target.checked }))}
                className="accent-[var(--aurora-1)]"
              />
              {h.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Estimate meter — an aurora-filled progress bar. */}
      <div className="mt-6 rounded-field border border-hairline bg-surface/60 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Estimated need</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-ink">{needGb} GB</p>
          </div>
          {recommended ? (
            <div className="text-right">
              <p className="eyebrow">We recommend</p>
              <p className="mt-1 font-mono text-sm text-ink">
                {formatData(recommended)} · {recommended.validityDays}d
              </p>
              <Price usd={recommended.price} className="text-sm font-semibold text-emerald" />
            </div>
          ) : null}
        </div>
        <div
          className="mt-4 h-1.5 overflow-hidden rounded-full bg-night"
          role="progressbar"
          aria-valuenow={needGb}
          aria-valuemin={0}
          aria-valuemax={20}
          aria-label="Estimated data need"
        >
          <div
            className="h-full rounded-full bg-aurora transition-[width] duration-[var(--dur-slow)] ease-[var(--ease-signal)]"
            style={{ width: `${fill}%` }}
          />
        </div>
      </div>
    </div>
  );
}
