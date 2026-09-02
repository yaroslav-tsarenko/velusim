import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { generalFaq } from "@/lib/data/faq";
import { site } from "@/lib/site";
import { Pulse, QrGlyph, Bolt, Check } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Help centre & support",
  description: "Velusim help centre — installation guides, compatibility, refunds and 24/7 contact. Get answers fast.",
  alternates: { canonical: "/help" },
};

const topics = [
  { icon: <QrGlyph className="size-5" />, title: "Installation guides", body: "Step-by-step setup for iOS and Android.", href: "/how-it-works" },
  { icon: <Check className="size-5" />, title: "Compatibility", body: "Check your phone supports eSIM in two taps.", href: "/compatibility" },
  { icon: <Bolt className="size-5" />, title: "Top-ups", body: "Add more data to an active eSIM anytime.", href: "/account?tab=esims" },
  { icon: <Pulse className="size-5" />, title: "Coverage", body: "See supported countries and networks.", href: "/coverage" },
];

export default function HelpPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
  ];
  return (
    <>
      <JsonLd data={faqSchema(generalFaq.map((f) => ({ q: f.q, a: typeof f.a === "string" ? f.a : "" })))} />
      <Section band="night" starfield aurora>
        <Container className="py-12 sm:py-16">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-6" coords="24/7 support">Help centre</Eyebrow>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl text-ink sm:text-6xl">
            We&apos;re with you, every time zone
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ink-muted">
            Browse the essentials or reach a human any time — most issues are a quick settings fix.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((t) => (
              <Link key={t.title} href={t.href} className="group rounded-panel glass p-5 transition-transform hover:-translate-y-1">
                <span className="inline-grid size-10 place-items-center rounded-full bg-emerald-soft text-emerald">{t.icon}</span>
                <h2 className="mt-3 font-display text-lg text-ink">{t.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">{t.body}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section band="surface" id="contact">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-panel glass px-6">
              <Accordion items={generalFaq} />
            </div>
            <div>
              <h2 className="font-display text-3xl text-ink">Still need a hand?</h2>
              <p className="mt-2 text-pretty text-ink-muted">Our team replies within minutes, day or night.</p>
              <a href={`mailto:${site.supportEmail}`} className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-aurora px-6 font-medium text-on-aurora hover:brightness-[1.06]">
                <Pulse className="size-4" /> Email support
              </a>
              <dl className="mt-8 space-y-4 text-sm">
                <div id="about"><dt className="eyebrow">About</dt><dd className="mt-1 text-ink-muted">{site.name} is operated by {site.company}, connecting curious travellers in {site.countriesCovered} countries. Registered office: {site.address} · Reg. no. {site.regNumber} · <a href={`mailto:${site.supportEmail}`} className="text-emerald hover:underline">{site.supportEmail}</a>.</dd></div>
                <div id="refunds"><dt className="eyebrow">Refunds</dt><dd className="mt-1 text-ink-muted">If we can&apos;t get you online and it&apos;s on us, you&apos;re covered by our refund policy. <Link href="/legal/refund-cancellation" className="text-emerald hover:underline">Read the full policy</Link>.</dd></div>
                <div id="privacy"><dt className="eyebrow">Privacy</dt><dd className="mt-1 text-ink-muted">We collect only what&apos;s needed to deliver your eSIM and never sell your data. <Link href="/legal/privacy" className="text-emerald hover:underline">Read the privacy policy</Link>.</dd></div>
                <div id="terms"><dt className="eyebrow">Terms</dt><dd className="mt-1 text-ink-muted">Using {site.name} means you accept our terms of service, including eSIM activation and fair-use conditions. <Link href="/legal/terms" className="text-emerald hover:underline">Read the terms</Link>.</dd></div>
                <div id="cookies"><dt className="eyebrow">Cookies</dt><dd className="mt-1 text-ink-muted">We use essential cookies to run the site plus optional ones you control via the cookie banner. <Link href="/legal/cookies" className="text-emerald hover:underline">Read the cookie policy</Link>.</dd></div>
              </dl>
              <p className="mt-4 text-sm text-ink-muted">See the complete <Link href="/legal" className="text-emerald hover:underline">policy library</Link>, including delivery &amp; activation, acceptable use and complaints handling.</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
