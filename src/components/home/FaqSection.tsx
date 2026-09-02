import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { generalFaq } from "@/lib/data/faq";

export function FaqSection({
  items = generalFaq,
  title = "Questions, answered",
}: {
  items?: AccordionItem[];
  title?: string;
}) {
  return (
    <Section band="surface" id="faq">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow coords="help desk">FAQ</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl text-ink sm:text-5xl">{title}</h2>
            <p className="mt-4 max-w-sm text-pretty text-ink-muted">
              Everything you need before you fly. Still unsure? Our team answers in minutes, in any
              time zone.
            </p>
          </div>
          <div className="glass rounded-panel px-6">
            <Accordion items={items} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
