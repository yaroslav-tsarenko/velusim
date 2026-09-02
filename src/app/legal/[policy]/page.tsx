import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { policies, policyBySlug } from "@/lib/data/policies";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return policies.map((p) => ({ policy: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[policy]">): Promise<Metadata> {
  const { policy: slug } = await params;
  const policy = policyBySlug(slug);
  if (!policy) return {};
  return {
    title: policy.title,
    description: policy.summary,
    alternates: { canonical: `/legal/${policy.slug}` },
    openGraph: { title: `${policy.title} · ${site.name}`, description: policy.summary, type: "website" },
  };
}

export default async function PolicyPage({ params }: PageProps<"/legal/[policy]">) {
  const { policy: slug } = await params;
  const policy = policyBySlug(slug);
  if (!policy) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Legal", path: "/legal" },
    { name: policy.shortTitle, path: `/legal/${policy.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <Section band="night" starfield aurora>
        <Container className="py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-6" coords={`updated ${policy.lastUpdated}`}>
            Legal
          </Eyebrow>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl text-ink sm:text-5xl">
            {policy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-ink-muted">{policy.summary}</p>
        </Container>
      </Section>

      <Section band="night" starfield>
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
            {/* Contents rail */}
            <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow/70">On this page</p>
              <ol className="mt-3 space-y-2">
                {policy.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#section-${i + 1}`}
                      className="text-sm text-ink-muted transition-colors hover:text-emerald"
                    >
                      <span className="font-mono text-xs text-ink-muted/60">{String(i + 1).padStart(2, "0")}</span>{" "}
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Body */}
            <article className="max-w-2xl">
              {policy.sections.map((section, i) => (
                <section key={section.heading} id={`section-${i + 1}`} className="scroll-mt-24 not-first:mt-12">
                  <h2 className="flex items-baseline gap-3 font-display text-2xl text-ink sm:text-3xl">
                    <span className="font-mono text-sm text-emerald">{String(i + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.clauses.map((clause, j) => (
                      <p key={j} className="text-pretty text-ink-muted">{clause}</p>
                    ))}
                  </div>
                </section>
              ))}

              <p className="mt-12 border-t border-hairline pt-6 text-sm text-ink-muted">
                Questions about this policy? Email{" "}
                <a href={`mailto:${site.supportEmail}`} className="text-emerald hover:underline">
                  {site.supportEmail}
                </a>
                . Browse the full{" "}
                <Link href="/legal" className="text-emerald hover:underline">
                  policy library
                </Link>
                .
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
