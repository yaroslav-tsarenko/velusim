import { Section, Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Pulse } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <Section band="night" starfield aurora>
      <Container className="py-24 text-center">
        <span className="inline-grid size-16 place-items-center rounded-full bg-emerald-soft text-emerald animate-fade-up">
          <Pulse className="size-8" />
        </span>
        <p className="mt-6 eyebrow">Error 404 · off the map</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-6xl">This signal doesn&apos;t reach here</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-ink-muted">
          The page you&apos;re looking for has wandered off. Let&apos;s get you back on course — pick a destination.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <DestinationSearch size="lg" />
        </div>
        <div className="mt-6">
          <ButtonLink href="/" variant="outline">Back to home</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
