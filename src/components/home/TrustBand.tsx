import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Bolt, Check, Globe, Shield } from "@/components/ui/icons";
import { site } from "@/lib/site";

/** Only values we can stand behind: the catalogue size and what every plan
 *  actually includes. No invented ratings, counts or testimonials. */
const stats = [
  { value: site.countriesCovered, label: "Countries covered" },
  { value: "£0", label: "Roaming fees" },
  { value: "24/7", label: "Human support" },
  { value: "~60s", label: "Typical install time" },
];

const included = [
  {
    icon: <Bolt className="size-5" />,
    title: "Instant QR delivery",
    body: "Your code appears the moment payment clears, and lands in your inbox as well.",
  },
  {
    icon: <Check className="size-5" />,
    title: "Keep your own number",
    body: "The eSIM runs alongside your usual SIM, so calls and messages carry on as normal.",
  },
  {
    icon: <Globe className="size-5" />,
    title: "Local 4G and 5G",
    body: "Each plan rides a national operator in the country you're visiting — no throttled fallback.",
  },
  {
    icon: <Shield className="size-5" />,
    title: "No contract, no surprises",
    body: "You pay once for a set amount of data and days. Nothing renews on its own.",
  },
];

export function TrustBand() {
  return (
    <Section band="deep" starfield>
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">What every plan includes</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-4xl text-ink sm:text-5xl">
            One purchase. Connected on landing.
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

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {included.map((f, i) => (
            <Reveal key={f.title} as="li" delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="glass flex h-full items-start gap-4 rounded-panel p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald">
                  {f.icon}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-pretty text-ink-muted">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
