import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The pulse glyph — a signal point with two aurora arcs radiating from it.
 *  The same motif recurs in loading states and on the "connected" screen. */
export function PulseMark({ className, ring = true }: { className?: string; ring?: boolean }) {
  return (
    <span className={cn("relative grid size-9 shrink-0 place-items-center", className)}>
      {ring ? (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-aurora-1/25 animate-pulse-ring"
        />
      ) : null}
      <svg viewBox="0 0 64 64" className="relative size-9" aria-hidden focusable="false">
        <defs>
          <linearGradient id="velusim-mark" x1="20" y1="42" x2="50" y2="14" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--aurora-1)" />
            <stop offset="0.52" stopColor="var(--aurora-2)" />
            <stop offset="1" stopColor="var(--aurora-3)" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="var(--night-deep)" />
        <g fill="none" stroke="url(#velusim-mark)" strokeLinecap="round">
          <path d="M20.96 23.76A17.5 17.5 0 0 1 41.49 41.61" strokeWidth="3.6" />
          <path d="M19.4 14.9A26.5 26.5 0 0 1 50.48 41.92" strokeWidth="2.8" opacity="0.5" />
        </g>
        <circle cx="24" cy="41" r="5.2" fill="var(--aurora-1)" />
      </svg>
    </span>
  );
}

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} home`}
    >
      <PulseMark className="transition-transform duration-[var(--dur-slow)] ease-[var(--ease-signal)] group-hover:scale-105" />
      <span className="font-display text-[1.4rem] font-semibold leading-none tracking-[-0.03em] text-ink">
        {site.name}
      </span>
    </Link>
  );
}
