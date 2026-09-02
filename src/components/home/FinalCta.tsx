import { Section, Container } from "@/components/ui/Section";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Pulse } from "@/components/ui/icons";

export function FinalCta() {
  return (
    <Section band="deep" starfield aurora>
      <Container className="py-20 text-center sm:py-24">
        <p className="eyebrow inline-flex items-center justify-center gap-2">
          <Pulse className="size-4 text-emerald" />
          <span className="text-ink">Your next trip starts here</span>
        </p>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
          Pick a destination. Be online before you land.
        </h2>
        <div className="mx-auto mt-9 max-w-xl">
          <DestinationSearch size="lg" placeholder="Where to next?" />
        </div>
        <p className="mt-5 text-sm text-ink-muted">
          Instant QR delivery · No roaming fees · 24/7 support
        </p>
      </Container>
    </Section>
  );
}
