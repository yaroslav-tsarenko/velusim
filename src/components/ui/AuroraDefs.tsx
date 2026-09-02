/**
 * Shared SVG gradient definitions, mounted once per document.
 *
 * Components that repeat on a page (the signal arc appears on every plan
 * card) must not each emit their own `<defs>` — duplicate element ids are
 * invalid HTML. The gradient uses the default objectBoundingBox units so a
 * single definition scales to whatever shape references it.
 */
export function AuroraDefs() {
  return (
    <svg aria-hidden focusable="false" className="pointer-events-none absolute size-0">
      <defs>
        <linearGradient id="velusim-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--aurora-1)" />
          <stop offset="0.52" stopColor="var(--aurora-2)" />
          <stop offset="1" stopColor="var(--aurora-3)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
