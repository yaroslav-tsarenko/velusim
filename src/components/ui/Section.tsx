import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** night = page base · surface = elevated band · deep = the deepest night */
  band?: "night" | "surface" | "deep";
  /** Adds the micro-dot starfield — felt, not seen. */
  starfield?: boolean;
  /** Adds the ambient aurora wash across the top of the band. */
  aurora?: boolean;
  /** Lets absolutely-positioned children (e.g. a search dropdown) escape the
   *  band instead of being clipped by the default `overflow-hidden`. */
  overflowVisible?: boolean;
  id?: string;
}

const bands = {
  night: "bg-night text-ink",
  surface: "bg-surface text-ink",
  deep: "surface-night bg-night-deep",
};

export function Section({
  children,
  className,
  band = "night",
  starfield,
  aurora,
  overflowVisible,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        overflowVisible ? "overflow-visible" : "overflow-hidden",
        bands[band],
        aurora && "bg-aurora-sky",
        className,
      )}
    >
      {starfield ? (
        <div className="pointer-events-none absolute inset-0 bg-starfield opacity-70" aria-hidden />
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

interface EyebrowProps {
  children: React.ReactNode;
  /** Optional coordinates-style caption, e.g. "35.6762° N · 139.6503° E". */
  coords?: string;
  className?: string;
}

/** Wide-tracked uppercase micro-label preceded by an aurora tick. */
export function Eyebrow({ children, coords, className }: EyebrowProps) {
  return (
    <div className={cn("eyebrow flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-aurora" aria-hidden />
      <span className="text-ink">{children}</span>
      {coords ? <span className="text-ink-muted">· {coords}</span> : null}
    </div>
  );
}
