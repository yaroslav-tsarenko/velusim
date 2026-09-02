import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { regions, getRegion } from "@/lib/data/regions";
import { countriesByRegion } from "@/lib/data/countries";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { FlagChip } from "@/components/ui/FlagChip";
import { ConstellationMap } from "@/components/ui/ConstellationMap";
import { Price } from "@/components/ui/Price";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { Pulse } from "@/components/ui/icons";

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.id }));
}

export async function generateMetadata({ params }: PageProps<"/regions/[region]">): Promise<Metadata> {
  const { region: id } = await params;
  const region = getRegion(id);
  if (!region) return {};
  return {
    title: `${region.name} eSIM — one plan across ${region.countryCount} countries`,
    description: `${region.name} travel eSIM from $${region.fromPrice.toFixed(2)}. ${region.blurb} Instant QR delivery, no roaming.`,
    alternates: { canonical: `/regions/${region.id}` },
  };
}

export default async function RegionPage({ params }: PageProps<"/regions/[region]">) {
  const { region: id } = await params;
  const region = getRegion(id);
  if (!region) notFound();

  const list = countriesByRegion(region.id);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Regional plans", path: "/plans/regional" },
    { name: region.name, path: `/regions/${region.id}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <Section band="night" starfield aurora>
        <Container className="py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Eyebrow coords={region.coords}>{region.name}</Eyebrow>
              <h1 className="mt-3 font-display text-4xl text-ink sm:text-6xl">{region.name} eSIM</h1>
              <p className="mt-4 max-w-md text-pretty text-ink-muted">{region.blurb} One plan keeps you online across {region.countryCount} countries — no swapping SIMs at every border.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-sm text-ink">
                  <Pulse className="size-3.5 text-emerald" /> {region.countryCount} countries
                </span>
                <span className="text-sm text-ink-muted">
                  from <Price usd={region.fromPrice} className="font-semibold text-emerald" />
                </span>
              </div>
            </div>
            <div className="rounded-panel glass/70 p-4 shadow-glow-md">
              <ConstellationMap />
            </div>
          </div>
        </Container>
      </Section>

      <Section band="surface">
        <Container className="py-12 sm:py-16">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Countries covered</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {list.map((c) => (
              <FlagChip key={c.slug} flag={c.flag} name={c.name} code={c.iso3} />
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((c) => (
              <DestinationCard key={c.slug} country={c} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
