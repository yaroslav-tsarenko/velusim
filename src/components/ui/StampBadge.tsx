import { cn } from "@/lib/utils";

type Ink = "emerald" | "teal" | "violet";

const inks: Record<Ink, string> = {
  emerald: "text-emerald border-emerald/45 bg-emerald-soft",
  teal: "text-teal border-teal/45 bg-teal-soft",
  violet: "text-violet border-violet/45 bg-violet-soft",
};

interface StampBadgeProps {
  children: React.ReactNode;
  ink?: Ink;
  /** Adds the recurring signal pulse — reserve it for genuine bestsellers. */
  pulse?: boolean;
  className?: string;
}

/** Micro-label badge — mono, wide-tracked, on a tinted hairline pill. */
export function StampBadge({ children, ink = "emerald", pulse, className }: StampBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em]",
        inks[ink],
        className,
      )}
    >
      {pulse ? (
        <span className="relative grid size-2 place-items-center" aria-hidden>
          <span className="absolute inset-0 rounded-full bg-current opacity-50 animate-pulse-ring" />
          <span className="size-1.5 rounded-full bg-current" />
        </span>
      ) : null}
      {children}
    </span>
  );
}
