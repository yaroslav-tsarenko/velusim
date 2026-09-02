import { Section, Container } from "@/components/ui/Section";

export function AuthShell({
  title,
  subtitle,
  children,
  wide,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Section band="night" starfield aurora>
      <Container className="grid place-items-center py-16 sm:py-24">
        <div className={`w-full ${wide ? "max-w-xl" : "max-w-sm"} rounded-panel glass p-6 sm:p-8`}>
          <h1 className="font-display text-3xl text-ink">{title}</h1>
          <p className="mb-6 mt-1 text-sm text-ink-muted">{subtitle}</p>
          {children}
        </div>
      </Container>
    </Section>
  );
}
