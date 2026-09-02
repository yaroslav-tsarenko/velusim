"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ConstellationNode {
  x: number;
  y: number;
  label: string;
  /** Larger nodes read as hub destinations. */
  hub?: boolean;
}

const NODES: ConstellationNode[] = [
  { x: 74, y: 94, label: "New York", hub: true },
  { x: 164, y: 66, label: "London", hub: true },
  { x: 192, y: 86, label: "Paris" },
  { x: 244, y: 116, label: "Dubai" },
  { x: 300, y: 148, label: "Singapore" },
  { x: 344, y: 84, label: "Tokyo", hub: true },
  { x: 372, y: 190, label: "Sydney" },
  { x: 112, y: 178, label: "São Paulo" },
  { x: 202, y: 192, label: "Cape Town" },
];

/** Index pairs joined by a faint line. */
const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [4, 6],
  [0, 7],
  [3, 8],
];

interface ConstellationMapProps {
  className?: string;
  nodes?: ConstellationNode[];
  links?: Array<[number, number]>;
}

/**
 * The coverage constellation — destinations as stars, joined by faint lines
 * that light up with the aurora on hover. The links draw themselves in on
 * mount; `prefers-reduced-motion` leaves them fully drawn and still.
 */
export function ConstellationMap({ className, nodes = NODES, links = LINKS }: ConstellationMapProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const paths = ref.current?.querySelectorAll<SVGPathElement>("[data-link]");
    paths?.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.setProperty("--arc-len", String(len));
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
      p.style.animationDelay = `${0.25 + i * 0.16}s`;
      p.classList.add("animate-draw-arc");
    });
  }, [links]);

  /** A shallow arc between two nodes — signals bend over the globe. The bow
   *  scales with distance so short and long hops read as the same family. */
  function arc(a: number, b: number): string {
    const p1 = nodes[a];
    const p2 = nodes[b];
    const mx = (p1.x + p2.x) / 2;
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const my = (p1.y + p2.y) / 2 - dist * 0.16 - 6;
    return `M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`;
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 232"
      className={cn("h-auto w-full", className)}
      fill="none"
      role="img"
      aria-label="Coverage constellation — connected destinations across the network"
    >
      <defs>
        <linearGradient id="constellation-aurora" x1="50" y1="200" x2="390" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--aurora-1)" />
          <stop offset="0.52" stopColor="var(--aurora-2)" />
          <stop offset="1" stopColor="var(--aurora-3)" />
        </linearGradient>
      </defs>

      {/* Micro-dot starfield behind the constellation. */}
      <g fill="var(--star)">
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>

      {/* Signal links */}
      <g strokeLinecap="round">
        {links.map(([a, b], i) => {
          const lit = active !== null && (active === a || active === b);
          return (
            <path
              key={i}
              data-link
              d={arc(a, b)}
              stroke={lit ? "url(#constellation-aurora)" : "color-mix(in oklab, var(--aurora-2) 32%, transparent)"}
              strokeWidth={lit ? 1.5 : 1}
              strokeDasharray="1 5"
              className="transition-[stroke,stroke-width] duration-[var(--dur-slow)]"
            />
          );
        })}
      </g>

      {/* Destination stars */}
      <g>
        {nodes.map((n, i) => {
          const lit = active === i;
          return (
            <g
              key={n.label}
              transform={`translate(${n.x} ${n.y})`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="cursor-default"
            >
              <circle r="14" fill="transparent" />
              <circle
                r={n.hub ? 9 : 7}
                fill="var(--aurora-1)"
                className="transition-opacity duration-[var(--dur-slow)]"
                opacity={lit ? 0.28 : 0.12}
              />
              <circle r={n.hub ? 3.6 : 2.6} fill={lit ? "var(--aurora-2)" : "var(--aurora-1)"} />
              {lit ? (
                <text
                  y={-16}
                  textAnchor="middle"
                  className="fill-[var(--ink)] font-mono text-[9px] tracking-[0.12em] uppercase"
                >
                  {n.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** A fixed scatter — deterministic so server and client markup match. */
const STARS: Array<[number, number, number]> = [
  [30, 38, 0.9], [62, 168, 0.7], [96, 46, 0.6], [128, 214, 0.8], [156, 30, 0.7],
  [186, 220, 0.6], [214, 140, 0.5], [248, 44, 0.9], [262, 202, 0.6], [286, 74, 0.6],
  [312, 196, 0.8], [336, 40, 0.7], [358, 138, 0.6], [392, 210, 0.9], [404, 74, 0.6],
  [48, 126, 0.6], [88, 148, 0.5], [140, 116, 0.5], [172, 154, 0.6], [226, 74, 0.5],
  [274, 116, 0.5], [318, 218, 0.6], [370, 46, 0.5], [408, 152, 0.7], [18, 78, 0.6],
];
