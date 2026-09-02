import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstallSteps } from "@/components/how/InstallSteps";
import { FaqSection } from "@/components/home/FaqSection";
import { generalFaq } from "@/lib/data/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How it works — buy, scan, travel",
  description: "See how a Velusim travel eSIM works: choose a destination, get your QR code instantly, install in about a minute. iOS and Android guides included.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "How it works", path: "/how-it-works" },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(generalFaq.map((f) => ({ q: f.q, a: typeof f.a === "string" ? f.a : "" }))),
        ]}
      />
      <Section band="night" starfield aurora>
        <Container className="py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-6">How it works</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
            From checkout to connected in one minute
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ink-muted">
            No plastic SIM, no store queue. Here&apos;s the whole journey — and exactly how to install your eSIM on any phone.
          </p>
        </Container>
      </Section>

      <HowItWorks />

      <Section band="night" starfield>
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow coords="installation">Install guide</Eyebrow>
              <h2 className="mt-3 font-display text-4xl text-ink">Scan and connect</h2>
              <p className="mt-4 max-w-sm text-pretty text-ink-muted">
                Follow the steps for your device. You can install before you fly — data only starts once you connect at your destination.
              </p>
            </div>
            <div className="rounded-panel glass p-6 sm:p-8">
              <InstallSteps />
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection />
    </>
  );
}
