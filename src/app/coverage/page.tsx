import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CoverageExplorer } from "@/components/coverage/CoverageExplorer";

export const metadata: Metadata = {
  title: "Coverage explorer — where Velusim works",
  description: "Explore Velusim eSIM coverage across every region. Tap a continent to see supported countries, networks and starting prices.",
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Coverage", path: "/coverage" },
  ];
  return (
    <Section band="night" starfield aurora>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs trail={trail} />
        <Eyebrow className="mt-6" coords="global network">Coverage explorer</Eyebrow>
        <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
          See where the signal reaches
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-ink-muted">
          Pick a region to reveal the countries we cover, the local networks, and the price your trip starts at.
        </p>
        <div className="mt-10">
          <CoverageExplorer />
        </div>
      </Container>
    </Section>
  );
}
