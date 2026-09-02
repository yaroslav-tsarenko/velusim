import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Search, QrGlyph, Bolt } from "@/components/ui/icons";

const steps = [
  {
    n: "01",
    icon: <Search className="size-6" />,
    title: "Choose your destination",
    body: "Search a country or region and pick the plan that matches your trip — data, days, done.",
  },
  {
    n: "02",
    icon: <QrGlyph className="size-6" />,
    title: "Scan the QR",
    body: "Pay on one page. Your eSIM QR code appears immediately and lands in your inbox — no waiting, no shipping.",
  },
  {
    n: "03",
    icon: <Bolt className="size-6" />,
    title: "You're connected",
    body: "Follow the per-device steps and step off the plane already online. It takes about a minute.",
  },
];

/** The three-step journey, wired together by a signal arc that draws in. */
export function HowItWorks() {
  return (
    <Section band="surface" id="how">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">How it works</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-4xl text-ink sm:text-5xl">
            Three steps from checkout to connected
          </h2>
        </div>

        <div className="relative mt-14">
          {/* The arc threading the three steps together, desktop only. */}
          <svg
            viewBox="0 0 1000 60"
            className="pointer-events-none absolute inset-x-0 -top-6 hidden h-14 w-full md:block"
            fill="none"
            aria-hidden
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="how-arc" x1="0" y1="60" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="var(--aurora-1)" />
                <stop offset="0.52" stopColor="var(--aurora-2)" />
                <stop offset="1" stopColor="var(--aurora-3)" />
              </linearGradient>
            </defs>
            <path
              d="M166 44 Q 500 -12 834 44"
              stroke="url(#how-arc)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="720"
              className="animate-draw-arc [--arc-len:720]"
              opacity="0.7"
            />
          </svg>

          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} as="li" delay={(i + 1) as 1 | 2 | 3}>
                <div className="glass relative h-full rounded-panel p-7">
                  <span className="absolute right-6 top-6 font-mono text-4xl text-ink-muted/25">{s.n}</span>
                  <span className="relative inline-grid size-12 place-items-center rounded-full bg-emerald-soft text-emerald">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-aurora-1/40 animate-pulse-ring"
                    />
                    {s.icon}
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-pretty text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
