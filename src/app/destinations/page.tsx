import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DestinationsExplorer } from "@/components/destination/DestinationsExplorer";
import { countries } from "@/lib/data/countries";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: `All destinations — travel eSIMs for ${site.countriesCovered} countries`,
  description: "Browse Velusim travel eSIMs by country and region. Instant QR delivery, no roaming fees, from $4 per plan.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <Section band="night" starfield aurora>
        <Container className="py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-6" coords="full index">All destinations</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
            Pick where you&apos;re going.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ink-muted">
            {countries.length} destinations and counting — each delivered as an instant QR code.
          </p>
        </Container>
      </Section>

      <Section band="surface">
        <Container className="py-12 sm:py-16">
          <DestinationsExplorer countries={countries} />
        </Container>
      </Section>
    </>
  );
}
