import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countries, getCountry } from "@/lib/data/countries";
import { getRegion } from "@/lib/data/regions";
import { fetchPlans } from "@/lib/api/client";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PlanGrid } from "@/components/destination/PlanGrid";
import { DataCalculator } from "@/components/destination/DataCalculator";
import { FaqSection } from "@/components/home/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, destinationSchema } from "@/lib/seo";
import { Pulse, Check, Bolt } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[country]">): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  const title = `${country.name} eSIM — instant data from $${country.fromPrice.toFixed(2)}`;
  const description = `Travel eSIM for ${country.name}. ${country.speeds.join("/")} data on ${country.networks.join(" & ")}, delivered as a QR code in seconds. No roaming fees.`;
  return {
    title,
    description,
    alternates: { canonical: `/destinations/${country.slug}` },
    openGraph: { title: `${title} · ${site.name}`, description, type: "website" },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[country]">) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const plans = await fetchPlans(country.slug);
  const region = getRegion(country.region);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: country.name, path: `/destinations/${country.slug}` },
  ];

  return (
    <>
      <JsonLd data={[destinationSchema(country, plans), breadcrumbSchema(trail)]} />

      {/* Country header */}
      <Section band="night" starfield aurora>
        <Container className="py-10 sm:py-14">
          <Breadcrumbs trail={trail} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-5xl" aria-hidden>{country.flag}</span>
                <div>
                  <h1 className="font-display text-4xl text-ink sm:text-5xl">{country.name} eSIM</h1>
                  <p className="font-mono text-sm text-ink-muted">
                    {country.iso3} · {country.dialCode} · {country.coords}
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-lg text-pretty text-ink-muted">
                Stay online across {country.name} the moment you land. Instant QR delivery, {country.speeds.join("/")} speeds, and no roaming bills.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <Badge icon={<Bolt className="size-3.5 text-emerald" />}>Instant delivery</Badge>
                <Badge icon={<Check className="size-3.5 text-emerald" />}>{country.speeds.join(" & ")} coverage</Badge>
                <Badge icon={<Pulse className="size-3.5 text-teal" />}>{region?.name}</Badge>
              </div>
            </div>

            {/* Coverage / network card */}
            <div className="rounded-panel glass p-6">
              <p className="eyebrow">Coverage & network</p>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Operators" value={country.networks.join(", ")} />
                <Row label="Speeds" value={country.speeds.join(" / ")} />
                <Row label="Region" value={region?.name ?? "—"} />
                <Row label="Activation" value="Scan QR · eKYC-free" />
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Plans */}
      <Section band="surface">
        <Container className="py-14 sm:py-16">
          <Eyebrow coords={country.coords}>Available plans</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Choose your {country.name} plan</h2>
          <p className="mt-2 max-w-xl text-ink-muted">Every plan is delivered instantly as a QR code. Data starts counting only once you connect on arrival.</p>
          <div className="mt-8">
            <PlanGrid country={country} plans={plans} />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <DataCalculator plans={plans} />
            <div className="rounded-panel glass p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-teal">Compatible devices</p>
              <h3 className="mt-2 font-display text-2xl text-ink">Will it work on my phone?</h3>
              <p className="mt-2 text-pretty text-ink-muted">
                Most phones from 2018 onward support eSIM — iPhone XR and later, recent Samsung Galaxy, Google Pixel and more. Your device must be carrier-unlocked.
              </p>
              <a href="/compatibility" className="mt-4 inline-flex items-center gap-1.5 font-medium text-emerald hover:text-emerald">
                Run the compatibility check <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection title={`${country.name} eSIM — good to know`} />
    </>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 font-medium text-ink">
      {icon}
      {children}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-hairline pb-2 last:border-0 last:pb-0">
      <dt className="eyebrow">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
