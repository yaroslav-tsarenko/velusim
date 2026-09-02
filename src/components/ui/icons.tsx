import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** The brand glyph — a map pin. Used in the logo, markers, and loaders. */
export function Pin({ title, ...props }: IconProps & { title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} {...props}>
      {title ? <title>{title}</title> : null}
      <path
        d="M12 22s7-6.28 7-12a7 7 0 1 0-14 0c0 5.72 7 12 7 12Z"
        fill="currentColor"
      />
      <circle cx="12" cy="10" r="2.6" fill="var(--night)" />
    </svg>
  );
}

export function PinOutline(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...props}>
      <path d="M12 21.5s6.5-5.8 6.5-11.5a6.5 6.5 0 1 0-13 0c0 5.7 6.5 11.5 6.5 11.5Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function Cart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 8H6" />
      <circle cx="9.5" cy="20.5" r="1.3" />
      <circle cx="18" cy="20.5" r="1.3" />
    </svg>
  );
}

export function Heart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 20s-7-4.6-9-9.2C1.6 7.3 3.5 4.5 6.6 4.5c1.9 0 3.4 1.1 4.4 2.6 1-1.5 2.5-2.6 4.4-2.6 3.1 0 5 2.8 3.6 6.3C19 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function User(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </svg>
  );
}

export function Moon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function Bolt(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function QrGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3 3h7v7H3V3Zm2 2v3h3V5H5Zm9-2h7v7h-7V3Zm2 2v3h3V5h-3ZM3 14h7v7H3v-7Zm2 2v3h3v-3H5Zm9 0h2v2h-2v-2Zm2 2h2v2h-2v-2Zm-2 2h2v1h-2v-1Zm4-4h2v2h-2v-2Zm0 4h2v1h-2v-1Z" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Signal arc — the thin aurora arc connecting two points. */
export function SignalArc(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden {...props}>
      <path d="M3 18C6 8.5 18 8.5 21 18" />
      <circle cx="3" cy="18" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="21" cy="18" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Radar pulse — the recurring "connected" motif. */
export function Pulse(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden {...props}>
      <path d="M8.5 15.5a5 5 0 0 1 7-7" />
      <path d="M5.5 18.5a9.2 9.2 0 0 1 13-13" opacity="0.5" />
      <circle cx="7.6" cy="16.4" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" strokeLinecap="round" />
    </svg>
  );
}

export function Device(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
      <path d="M10.8 5.6h2.4" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.4" />
      <path d="m3.6 6.6 8.4 6 8.4-6" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
