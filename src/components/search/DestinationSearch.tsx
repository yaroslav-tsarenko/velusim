"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchCountries } from "@/lib/data/countries";
import { formatPrice, cn } from "@/lib/utils";
import { usePreferences } from "@/components/providers/Preferences";
import { Search } from "@/components/ui/icons";

interface Props {
  size?: "md" | "lg";
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

/** ARIA combobox: destination-first search with instant flag + from-price
 *  results. At `lg` it is the hero centerpiece and carries the aurora glow. */
export function DestinationSearch({
  size = "md",
  placeholder = "Where to next?",
  autoFocus,
  className,
}: Props) {
  const router = useRouter();
  const { currency } = usePreferences();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchCountries(query, 6), [query]);

  function choose(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/destinations/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) choose(results[active].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const big = size === "lg";

  return (
    <div className={cn("relative", className)}>
      {/* The glow behind the field — the one hero moment on the home screen. */}
      {big ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-3 rounded-[999px] bg-aurora opacity-25 blur-2xl transition-opacity duration-[var(--dur-slow)]",
            open && "opacity-40",
          )}
        />
      ) : null}

      <div
        className={cn(
          "glass relative flex items-center gap-3 rounded-full transition-[border-color,box-shadow] duration-[var(--dur-base)]",
          open && "border-aurora-2 shadow-aurora",
          big ? "h-16 px-6" : "h-11 px-4",
        )}
      >
        <Search className={cn("shrink-0 text-ink-muted", big ? "size-6" : "size-5")} />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="Search destinations"
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          autoFocus={autoFocus}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          className={cn(
            "w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none",
            big ? "text-lg" : "text-sm",
          )}
        />
        {big ? (
          <kbd className="hidden rounded-full border border-hairline px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.1em] text-ink-muted sm:block">
            ↵
          </kbd>
        ) : null}
      </div>

      {open && results.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Destination results"
          className="glass-overlay absolute z-50 mt-2 w-full overflow-hidden rounded-panel text-left"
        >
          {!query ? (
            <li className="eyebrow px-4 pt-3.5 pb-1">Popular destinations</li>
          ) : null}
          {results.map((c, i) => (
            <li
              key={c.slug}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(c.slug);
              }}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "relative flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors duration-[var(--dur-fast)]",
                i === active && "bg-emerald-soft",
              )}
            >
              {i === active ? (
                <span aria-hidden className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-aurora" />
              ) : null}
              <span className="text-xl" aria-hidden>{c.flag}</span>
              <span className="flex-1">
                <span className="block font-medium text-ink">{c.name}</span>
                <span className="font-mono text-[0.68rem] tracking-[0.06em] text-ink-muted">
                  {c.iso3} · {c.dialCode}
                </span>
              </span>
              <span className="font-mono text-xs text-emerald">
                from {formatPrice(c.fromPrice, currency)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
