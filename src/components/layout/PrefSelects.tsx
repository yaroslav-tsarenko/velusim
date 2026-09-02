"use client";

import { usePreferences } from "@/components/providers/Preferences";
import type { CurrencyCode } from "@/lib/types";

const selectCls =
  "cursor-pointer rounded bg-transparent font-mono text-[0.68rem] uppercase tracking-[0.12em] " +
  "text-current transition-colors hover:text-emerald focus-visible:outline-2";

export function CurrencySelect() {
  const { currency, setCurrency } = usePreferences();
  return (
    <label className="inline-flex items-center gap-1">
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className={selectCls}
      >
        <option value="GBP">£ GBP</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
    </label>
  );
}
