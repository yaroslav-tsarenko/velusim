import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Price } from "@/components/ui/Price";
import { StampBadge } from "@/components/ui/StampBadge";
import { Pulse, ArrowRight, Check } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Global eSIM plans — one plan, 130+ countries",
  description: "A single Velusim global eSIM that works across 130+ countries. Perfect for multi-country trips and digital nomads. Instant QR delivery.",
  alternates: { canonical: "/plans/global" },
};

const globalPlans = [
  { id: "global-1-7", data: "1 GB", days: 7, price: 9, countries: 130, badge: undefined as string | undefined },
  { id: "global-3-30", data: "3 GB", days: 30, price: 22, countries: 130, badge: "BESTSELLER" },
  { id: "global-10-30", data: "10 GB", days: 30, price: 45, countries: 130, badge: undefined },
  { id: "global-unl-15", data: "Unlimited", days: 15, price: 69, countries: 130, badge: "UNLIMITED" },
];

export default function GlobalPlansPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Global plans", path: "/plans/global" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <Section band="deep" starfield>
        <Container className="py-14 sm:py-20">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-6 text-emerald">Global plans</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
            One eSIM. The whole planet.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ink-muted">
            Built for multi-country trips and nomads — a single plan that follows you across 130+ countries without a single SIM swap.
          </p>
        </Container>
      </Section>

      <Section band="surface">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {globalPlans.map((p) => (
              <article key={p.id} className="flex flex-col rounded-panel glass">
                <div className="flex items-start justify-between p-5 pb-6">
                  <div>
                    <div className="flex items-center gap-1.5 eyebrow">
                      <Pulse className="size-3 text-emerald" /> GLOBAL · {p.countries}+
                    </div>
                    <h2 className="mt-1 font-display text-2xl text-ink">{p.data}</h2>
                  </div>
                  {p.badge ? <StampBadge ink={p.badge === "UNLIMITED" ? "teal" : "emerald"}>{p.badge}</StampBadge> : null}
                </div>
                <div className="signal-perf mx-5" aria-hidden />
                <div className="flex flex-1 flex-col p-5 pt-6">
                  <dl className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between"><dt className="text-ink-muted">Validity</dt><dd className="text-ink">{p.days} days</dd></div>
                    <div className="flex justify-between"><dt className="text-ink-muted">Coverage</dt><dd className="text-ink">{p.countries}+ countries</dd></div>
                    <div className="flex justify-between"><dt className="text-ink-muted">Speed</dt><dd className="text-ink">4G/5G</dd></div>
                  </dl>
                  <div className="mt-4">
                    <Price usd={p.price} className="text-2xl font-semibold text-ink" />
                  </div>
                  <Link
                    href={{ pathname: "/checkout", query: { plan: p.id } }}
                    className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-aurora font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98]"
                  >
                    Get this plan <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            {["Works in 130+ countries", "Keep your home number", "Top up anytime", "Instant QR delivery"].map((f) => (
              <li key={f} className="inline-flex items-center gap-1.5"><Check className="size-4 text-emerald" /> {f}</li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
