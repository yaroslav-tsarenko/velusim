import type { Metadata } from "next";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CompatibilityChecker } from "@/components/compatibility/CompatibilityChecker";

export const metadata: Metadata = {
  title: "eSIM compatibility check — is your phone supported?",
  description: "Check if your phone supports eSIM in seconds. Pick your brand and model for an instant verdict before you buy a travel eSIM.",
  alternates: { canonical: "/compatibility" },
};

export default function CompatibilityPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Compatibility", path: "/compatibility" },
  ];
  return (
    <Section band="night" starfield aurora>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs trail={trail} />
        <div className="mx-auto mt-6 max-w-xl text-center">
          <Eyebrow className="justify-center">Compatibility</Eyebrow>
          <h1 className="mt-3 text-balance font-display text-4xl text-ink sm:text-5xl">
            Does your phone support eSIM?
          </h1>
          <p className="mt-3 text-pretty text-ink-muted">
            Most phones from 2018 onward do. Check yours in two taps — no sign-up needed.
          </p>
        </div>
        <div className="mt-10">
          <CompatibilityChecker />
        </div>
      </Container>
    </Section>
  );
}
