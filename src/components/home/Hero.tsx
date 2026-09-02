import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { FlagChip } from "@/components/ui/FlagChip";
import { Container } from "@/components/ui/Section";
import { Bolt, Check, Shield, Pulse } from "@/components/ui/icons";
import { popularCountries } from "@/lib/data/countries";
import { site } from "@/lib/site";

const steps = [
  { n: "01", label: "Choose destination" },
  { n: "02", label: "Scan the QR" },
  { n: "03", label: "You're connected" },
];

/**
 * The night-flight window. The aurora drifts across the upper third, the
 * starfield sits beneath it, and the destination search is the one bright
 * object on the screen. A signal arc runs from the "you" dot out to the
 * destination as the eye travels down the page.
 */
export function Hero() {
  const chips = popularCountries().slice(0, 6);

  return (
    <section className="surface-night bg-aurora-sky relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-starfield" aria-hidden />

      <Container className="relative flex flex-col items-center py-16 text-center sm:py-24">
        <p className="eyebrow animate-fade-up flex items-center gap-2">
          <Pulse className="size-4 text-emerald" />
          <span className="text-ink">{site.countriesCovered} destinations</span>
          <span aria-hidden>·</span>
          <span>Instant delivery</span>
        </p>

        <h1
          className="animate-fade-up mt-6 max-w-4xl text-balance font-display text-[2.75rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-[5.25rem] lg:leading-[0.98]"
          data-delay="1"
        >
          Land <span className="text-aurora">connected</span>.
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-xl text-pretty text-lg text-ink-muted"
          data-delay="2"
        >
          A travel eSIM for {site.countriesCovered} countries. Your QR code arrives the second you
          pay — no roaming bills, no plastic SIM, no queue at the airport.
        </p>

        {/* Centerpiece — the glowing destination field */}
        <div className="animate-fade-up relative z-30 mt-10 w-full max-w-2xl" data-delay="3">
          <DestinationSearch size="lg" placeholder="Where to next?" />
          <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Popular destinations">
            {chips.map((c) => (
              <li key={c.slug}>
                <Link href={`/destinations/${c.slug}`} className="block rounded-full">
                  <FlagChip
                    flag={c.flag}
                    name={c.name}
                    code={c.iso3}
                    size="sm"
                    className="transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-aurora-2 hover:shadow-aurora"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The signal arc — you → destination */}
        <HeroArc />

        {/* Trust ribbon */}
        <ul
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted"
          data-delay="5"
        >
          <TrustItem icon={<Bolt className="size-3.5 text-emerald" />}>Instant delivery</TrustItem>
          <TrustItem icon={<Check className="size-3.5 text-emerald" />}>No roaming fees</TrustItem>
          <TrustItem icon={<Check className="size-3.5 text-emerald" />}>Keep your number</TrustItem>
          <TrustItem icon={<Shield className="size-3.5 text-teal" />}>Secure checkout</TrustItem>
        </ul>

        {/* Compact 3-step strip — each step marked by a pulse */}
        <ol
          className="animate-fade-up mt-12 grid w-full max-w-3xl gap-3 sm:grid-cols-3"
          data-delay="6"
        >
          {steps.map((s) => (
            <li key={s.n} className="glass flex items-center gap-3 rounded-card px-4 py-3.5 text-left">
              <span className="relative grid size-8 shrink-0 place-items-center" aria-hidden>
                <span className="absolute inset-0 rounded-full border border-aurora-1/40 animate-pulse-ring" />
                <span className="size-2 rounded-full bg-aurora-1" />
              </span>
              <span>
                <span className="block font-mono text-[0.62rem] tracking-[0.16em] text-ink-muted">{s.n}</span>
                <span className="block text-sm font-medium text-ink">{s.label}</span>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** A wide aurora arc drawing itself in from the "you" dot to the destination. */
function HeroArc() {
  return (
    <div className="animate-fade-up mt-12 w-full max-w-2xl" data-delay="4">
      <div className="flex items-center justify-between px-1">
        <span className="eyebrow">You</span>
        <span className="eyebrow text-emerald">Anywhere</span>
      </div>
      <svg viewBox="0 0 600 90" className="mt-1 h-12 w-full sm:h-16" fill="none" aria-hidden preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-arc" x1="0" y1="90" x2="600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--aurora-1)" />
            <stop offset="0.52" stopColor="var(--aurora-2)" />
            <stop offset="1" stopColor="var(--aurora-3)" />
          </linearGradient>
        </defs>
        <path
          d="M24 72 Q 300 -14 576 44"
          stroke="url(#hero-arc)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="700"
          className="animate-draw-arc [--arc-len:700]"
        />
        <circle cx="24" cy="72" r="4.5" fill="var(--aurora-1)" />
        <circle cx="24" cy="72" r="11" fill="none" stroke="var(--aurora-1)" strokeWidth="1" opacity="0.4" />
        <circle cx="576" cy="44" r="4.5" fill="var(--aurora-3)" />
      </svg>
    </div>
  );
}

function TrustItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      {icon}
      <span className="font-medium text-ink">{children}</span>
    </li>
  );
}
