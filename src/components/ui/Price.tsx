"use client";

import { usePreferences } from "@/components/providers/Preferences";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

/** Renders a USD-base price in the user's selected currency. */
export function Price({ usd, className, prefix }: { usd: number; className?: string; prefix?: string }) {
  const { currency } = usePreferences();
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {formatPrice(usd, currency)}
    </span>
  );
}
