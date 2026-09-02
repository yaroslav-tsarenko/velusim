"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Logo } from "./Logo";
import { CurrencySelect } from "./PrefSelects";
import { ThemeToggle } from "./ThemeToggle";
import { nav } from "@/lib/site";
import { regions } from "@/lib/data/regions";
import { popularCountries } from "@/lib/data/countries";
import { ChevronDown, Globe, Close } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={cn("fixed inset-0 z-[60] lg:hidden", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn("absolute inset-0 bg-night-deep/75 backdrop-blur-sm transition-opacity duration-[var(--dur-slow)]", open ? "opacity-100" : "opacity-0")}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-hairline bg-night shadow-glow-lg transition-transform duration-300 ease-[var(--ease-signal)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline p-4">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface hover:text-emerald"
          >
            <Close className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <DestinationSearch className="mb-5" placeholder="Where to next?" />

          <nav aria-label="Mobile primary">
            <ul className="space-y-1">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-field px-3 py-3 font-medium text-ink transition-colors hover:bg-surface">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileAccordion title="Regions">
            <ul className="space-y-1 pb-2">
              {regions.map((r) => (
                <li key={r.id}>
                  <Link href={`/regions/${r.id}`} className="flex items-center gap-2 rounded-field px-3 py-2 text-sm text-ink transition-colors hover:bg-surface">
                    <Globe className="size-4 text-teal" /> {r.name}
                    <span className="ml-auto font-mono text-[0.68rem] text-ink-muted">{r.countryCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title="Popular destinations">
            <ul className="grid grid-cols-2 gap-1 pb-2">
              {popularCountries().slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/destinations/${c.slug}`} className="flex items-center gap-2 rounded-field px-3 py-2 text-sm text-ink transition-colors hover:bg-surface">
                    <span aria-hidden>{c.flag}</span> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-hairline p-4 text-ink">
          <CurrencySelect />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="border-t border-hairline py-1">
      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between px-3 py-3">
        {title}
        <ChevronDown className="size-4" />
      </summary>
      {children}
    </details>
  );
}
