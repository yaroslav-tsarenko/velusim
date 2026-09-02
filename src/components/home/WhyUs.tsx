import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Check, Close } from "@/components/ui/icons";
import { site } from "@/lib/site";

const rows = [
  { label: "Cost for 3 GB abroad", us: "from $6.90", roaming: "$45+ in overage" },
  { label: "Delivery", us: "Instant QR", roaming: "Buy a local SIM on arrival" },
  { label: "Setup", us: "~1 minute", roaming: "Store queue + passport" },
  { label: "Keep your number", us: "Yes, dual-SIM", roaming: "Swap card, lose it" },
  { label: "Coverage", us: `${site.countriesCovered} countries`, roaming: "Per-country plans" },
  { label: "Top-ups", us: "In-app, anytime", roaming: "Back to the store" },
];

export function WhyUs() {
  return (
    <Section band="night" starfield>
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow coords="us vs roaming">Why travellers switch</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl text-ink sm:text-5xl">
              Same journey. None of the roaming shock.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-ink-muted">
              A travel eSIM replaces the airport SIM queue and the bill-shock text with a QR code you
              scan before you leave home.
            </p>
          </div>

          <div className="glass overflow-hidden rounded-panel">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-hairline bg-surface/60">
              <span className="eyebrow px-4 py-3.5">Feature</span>
              <span className="eyebrow px-4 py-3.5 text-emerald">{site.name}</span>
              <span className="eyebrow px-4 py-3.5">Roaming</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className={`grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-hairline/60 text-sm last:border-b-0 ${
                  i % 2 ? "" : "bg-night/25"
                }`}
              >
                <span className="px-4 py-3.5 text-ink">{r.label}</span>
                <span className="flex items-center gap-1.5 px-4 py-3.5 font-medium text-ink">
                  <Check className="size-3.5 shrink-0 text-emerald" /> {r.us}
                </span>
                <span className="flex items-center gap-1.5 px-4 py-3.5 text-ink-muted">
                  <Close className="size-3 shrink-0 text-danger" /> {r.roaming}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
