import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { policies } from "@/lib/data/policies";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal & policies",
  description: `The full ${site.name} policy library — terms, refunds, delivery, privacy, cookies, acceptable use and complaints.`,
  alternates: { canonical: "/legal" },
};

export default function LegalIndexPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Legal", path: "/legal" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <Section band="night" starfield aurora>
        <Container className="py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-6" coords="the fine print">Legal &amp; policies</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
            Everything, in plain sight
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ink-muted">
            The policies that govern your purchase and use of {site.name}. Sold by {site.company}, reg. no. {site.regNumber}.
          </p>
        </Container>
      </Section>

      <Section band="surface">
        <Container className="py-14 sm:py-16">
          <ul className="grid gap-4 sm:grid-cols-2">
            {policies.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/legal/${p.slug}`}
                  className="group flex h-full flex-col rounded-panel glass p-6 transition-transform hover:-translate-y-1"
                >
                  <h2 className="font-display text-xl text-ink group-hover:text-emerald">{p.title}</h2>
                  <p className="mt-2 text-pretty text-sm text-ink-muted">{p.summary}</p>
                  <span className="mt-4 eyebrow/70">
                    Last updated: {p.lastUpdated}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
