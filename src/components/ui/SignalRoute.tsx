import { cn } from "@/lib/utils";

interface SignalRouteProps {
  /** Destination label — usually an ISO alpha-3 code. */
  to: string;
  /** Origin label. */
  from?: string;
  /** Draws the arc in on scroll instead of showing it immediately. */
  animate?: boolean;
  className?: string;
}

/**
 * The signal arc — a thin aurora arc connecting your point to the
 * destination. The recurring wayfinding motif: hero, plan cards, how-it-works.
 */
export function SignalRoute({ to, from = "You", animate, className }: SignalRouteProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-field border border-hairline bg-surface/50 px-3 py-2",
        className,
      )}
    >
      <span className="eyebrow shrink-0">{from}</span>
      <svg viewBox="0 0 120 24" className="h-5 flex-1" fill="none" aria-hidden preserveAspectRatio="none">
        <path
          d="M5 19 Q 60 -4 115 13"
          stroke="url(#velusim-arc)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray={animate ? "220" : undefined}
          className={animate ? "animate-draw-arc [--arc-len:220]" : undefined}
        />
        <circle cx="5" cy="19" r="2.6" fill="var(--aurora-1)" />
        <circle cx="115" cy="13" r="2.6" fill="var(--aurora-3)" />
      </svg>
      <span className="eyebrow shrink-0 text-emerald">{to}</span>
    </div>
  );
}
