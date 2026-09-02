import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StampBadge } from "@/components/ui/StampBadge";
import { site } from "@/lib/site";

const reviews = [
  {
    name: "Mara L.",
    trip: "Tokyo · JPN",
    text: "Scanned the QR at the gate in Lisbon and had 5G the moment we landed at Haneda. Genuinely one minute.",
    stamp: "Verified",
  },
  {
    name: "Daniel R.",
    trip: "Bangkok · THA",
    text: "Skipped the airport SIM kiosk entirely. The plan cards made picking the right amount of data obvious.",
    stamp: "Bestseller buyer",
  },
  {
    name: "Priya S.",
    trip: "New York · USA",
    text: "Kept my home number on dual-SIM and topped up from the app mid-trip. No bill shock this time.",
    stamp: "Repeat traveller",
  },
];

const stats = [
  { value: site.countriesCovered, label: "Countries covered" },
  { value: "£0", label: "Roaming fees" },
  { value: "24/7", label: "Human support" },
  { value: "60s", label: "Typical install time" },
];

export function Reviews() {
  return (
    <Section band="deep" starfield>
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Trusted by travellers</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-4xl text-ink sm:text-5xl">
            Loved from departure to landing
          </h2>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-card p-5 text-center">
              <dt className="font-mono text-3xl font-semibold text-emerald">{s.value}</dt>
              <dd className="mt-1.5 text-sm text-ink-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i + 1) as 1 | 2 | 3}>
              <figure className="glass flex h-full flex-col rounded-panel p-6">
                <div className="flex items-center justify-between">
                  <span className="text-violet" aria-label="5 out of 5">★★★★★</span>
                  <StampBadge ink="teal">{r.stamp}</StampBadge>
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-ink">“{r.text}”</blockquote>
                <figcaption className="mt-4 border-t border-hairline pt-3 text-sm">
                  <span className="font-medium text-ink">{r.name}</span>
                  <span className="ml-2 font-mono text-[0.7rem] text-ink-muted">{r.trip}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
