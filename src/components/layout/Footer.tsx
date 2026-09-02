import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { site } from "@/lib/site";
import { regions } from "@/lib/data/regions";
import { popularCountries } from "@/lib/data/countries";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { Shield } from "@/components/ui/icons";

const columns = [
  {
    title: "Plans",
    links: [
      { label: "Regional plans", href: "/plans/regional" },
      { label: "Global plans", href: "/plans/global" },
      { label: "Unlimited data", href: "/plans/global" },
      { label: "All destinations", href: "/destinations" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "Installation guides", href: "/how-it-works" },
      { label: "Compatibility check", href: "/compatibility" },
      { label: "Refund policy", href: "/legal/refund-cancellation" },
      { label: "Contact us", href: "/help#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/help#about" },
      { label: "Coverage explorer", href: "/coverage" },
      { label: "Compatibility", href: "/compatibility" },
      { label: "Contact us", href: "/help#contact" },
    ],
  },
];

/** Rich, layered footer on the deepest night surface. Tiers are separated by
 *  a thin aurora hairline; the columns collapse to accordions on mobile. */
export function Footer() {
  const topCountries = popularCountries().slice(0, 6);

  return (
    <footer className="surface-night mt-auto bg-starfield">
      {/* Tier 1 — identity + newsletter */}
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-pretty text-ink-muted">
            {site.tagline}. Travel data for the whole planet, delivered as a QR code in seconds.
          </p>
        </div>
        <div className="md:justify-self-end md:text-right">
          <p className="eyebrow mb-2 md:justify-end">New destinations &amp; fare drops</p>
          <p className="font-display text-xl text-ink">Occasionally. Never spam.</p>
          <NewsletterForm className="mt-4" />
        </div>
      </div>

      <hr className="aurora-rule" />

      {/* Tier 2 — grouped columns */}
      <div className="mx-auto grid w-full max-w-7xl gap-2 px-5 py-10 sm:px-8 md:grid-cols-4 md:gap-8 md:py-14">
        <FooterCol title="Destinations">
          <ul className="space-y-2">
            {topCountries.map((c) => (
              <li key={c.slug}>
                <FooterLink href={`/destinations/${c.slug}`}>
                  <span aria-hidden className="mr-1.5">{c.flag}</span>
                  {c.name}
                </FooterLink>
              </li>
            ))}
            {regions.slice(0, 2).map((r) => (
              <li key={r.id}>
                <FooterLink href={`/regions/${r.id}`}>{r.name} plans</FooterLink>
              </li>
            ))}
          </ul>
        </FooterCol>
        {columns.map((col) => (
          <FooterCol key={col.title} title={col.title}>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterCol>
        ))}
      </div>

      <hr className="aurora-rule opacity-30" />

      {/* Tier 3 — trust row */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
        <PaymentMarks />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-emerald">
          <Shield className="size-3.5" /> Secure checkout
        </span>
      </div>

      <hr className="aurora-rule opacity-30" />

      {/* Tier 4 — legal bar */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-ink-muted sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-pretty">
          © {new Date().getFullYear()} {site.company} · Reg. no. {site.regNumber} · {site.address} ·{" "}
          {site.supportEmail}. All rights reserved.
        </p>
        <nav aria-label="Legal" className="flex flex-wrap gap-4">
          <FooterLink href="/legal/privacy">Privacy</FooterLink>
          <FooterLink href="/legal/terms">Terms</FooterLink>
          <FooterLink href="/legal/cookies">Cookies</FooterLink>
          <FooterLink href="/legal/refund-cancellation">Refund Policy</FooterLink>
          <FooterLink href="/legal">All policies</FooterLink>
        </nav>
      </div>
    </footer>
  );
}

/** Plain column from `md` up; a disclosure on phones. */
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <details className="group border-b border-hairline md:hidden">
        <summary className="eyebrow flex cursor-pointer list-none items-center justify-between py-3.5">
          {title}
          <span aria-hidden className="text-base leading-none text-ink-muted transition-transform duration-[var(--dur-base)] group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pb-4">{children}</div>
      </details>
      <div className="hidden md:block">
        <h3 className="eyebrow mb-4">{title}</h3>
        {children}
      </div>
    </>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-ink-muted transition-colors duration-[var(--dur-fast)] hover:text-emerald"
    >
      {children}
    </Link>
  );
}
