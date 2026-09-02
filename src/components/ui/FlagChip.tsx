import { cn } from "@/lib/utils";

interface FlagChipProps {
  flag: string;
  name: string;
  code?: string;
  className?: string;
  size?: "sm" | "md";
}

/** Country identity chip — flag + name + mono ISO code, on glass. */
export function FlagChip({ flag, name, code, className, size = "md" }: FlagChipProps) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className,
      )}
    >
      <span className={cn("leading-none", size === "sm" ? "text-sm" : "text-base")} aria-hidden>
        {flag}
      </span>
      <span className="font-medium text-ink">{name}</span>
      {code ? (
        <span className="font-mono text-[0.72em] uppercase tracking-[0.12em] text-ink-muted">
          {code}
        </span>
      ) : null}
    </span>
  );
}
