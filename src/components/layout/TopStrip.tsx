"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./PrefSelects";
import { site } from "@/lib/site";

const MESSAGES = [
  "Instant QR delivery",
  `${site.countriesCovered} destinations`,
  "No roaming fees, ever",
  "24/7 human support",
];

/** Slim top strip — rotating reassurance, currency, theme. */
export function TopStrip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-hairline bg-night-deep">
      <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <p className="flex items-center gap-2" aria-live="polite">
          <span className="relative grid size-1.5 place-items-center" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-aurora-1 opacity-60 animate-pulse-ring" />
            <span className="size-1.5 rounded-full bg-aurora-1" />
          </span>
          <span className="eyebrow text-ink">{MESSAGES[i]}</span>
        </p>
        <div className="flex items-center gap-3 text-ink-muted">
          <CurrencySelect />
          <span className="h-3 w-px bg-hairline" aria-hidden />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
