import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { regions } from "@/lib/data/regions";
import { Price } from "@/components/ui/Price";
import { Pulse, ArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Regional eSIM plans — one plan per continent",
  description: "Cover a whole region with a single Velusim eSIM. Europe, Asia, Americas and more, from $4. Instant QR delivery.",
  alternates: { canonical: "/plans/regional" },
};

export default function RegionalPlansPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Regional plans", path: "/plans/regional" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <Section band="night" starfield aurora>
        <Container className="py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-6">Regional plans</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
            One eSIM for the whole region
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ink-muted">
            Hopping between countries? A regional plan keeps you connected across an entire continent without swapping a thing.
          </p>
        </Container>
      </Section>

      <Section band="surface">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((r) => (
              <Link
                key={r.id}
                href={`/regions/${r.id}`}
                className="group flex flex-col justify-between rounded-panel glass p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-teal">
                      <Pulse className="size-3.5 text-emerald" /> {r.coords}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">{r.countryCount} countries</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl text-ink">{r.name}</h2>
                  <p className="mt-2 text-pretty text-ink-muted">{r.blurb}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="text-sm text-ink-muted">
                    from <Price usd={r.fromPrice} className="text-base font-semibold text-emerald" />
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-teal group-hover:text-teal">
                    View plans <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
