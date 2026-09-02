"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopStrip } from "./TopStrip";
import { Logo } from "./Logo";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { MegaNav } from "./MegaNav";
import { MobileDrawer } from "./MobileDrawer";
import { AccountButton } from "./AccountButton";
import { usePreferences } from "@/components/providers/Preferences";
import { nav } from "@/lib/site";
import { cn, formatCents } from "@/lib/utils";
import { Cart, Heart, ChevronDown, Menu } from "@/components/ui/icons";

export interface AccountSummary {
  firstName: string;
  balanceCents: number;
}

export function Header({ account }: { account: AccountSummary | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { currency } = usePreferences();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes the mega-panel wherever focus currently sits.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:block">
        <TopStrip />
      </div>

      <div
        className={cn(
          "relative border-b border-hairline bg-night/80 backdrop-blur-xl transition-shadow duration-[var(--dur-slow)]",
          scrolled && "shadow-glow-md",
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        {/* Aurora hairline — brightens as the header condenses on scroll. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-aurora transition-opacity duration-[var(--dur-slow)]",
            scrolled ? "opacity-70" : "opacity-0",
          )}
        />

        {/* Main bar */}
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
          <div
            className={cn(
              "flex items-center transition-all duration-[var(--dur-slow)] ease-[var(--ease-signal)]",
              scrolled ? "py-2.5" : "py-3.5",
            )}
          >
            <Logo href="/" />
          </div>

          <div className="hidden flex-1 justify-center lg:flex">
            <DestinationSearch className="w-full max-w-md" placeholder="Where to next?" />
          </div>

          <div className="ml-auto flex items-center gap-1">
            {account ? (
              <Link
                href="/account?tab=wallet"
                className="glass mr-1 hidden items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs transition-colors hover:border-hairline-strong sm:inline-flex"
                title="Balance"
              >
                <span className="text-ink-muted">Balance</span>
                <span className="font-semibold text-emerald">
                  {formatCents(account.balanceCents, currency)}
                </span>
              </Link>
            ) : null}
            <AccountButton account={account} />
            <IconLink href="/account?tab=saved" label="Saved destinations" icon={<Heart className="size-5" />} />
            <IconLink href="/account?tab=esims" label="My eSIMs" icon={<Cart className="size-5" />} />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="ml-1 grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        {/* Nav row */}
        <nav
          aria-label="Primary"
          className="mx-auto hidden w-full max-w-7xl items-center gap-1 px-5 pb-2 sm:px-8 lg:flex"
        >
          {nav.primary.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return "mega" in item && item.mega ? (
              <button
                key={item.href}
                onClick={() => setMegaOpen((o) => !o)}
                onMouseEnter={() => setMegaOpen(true)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-[var(--dur-fast)]",
                  megaOpen || active ? "bg-surface text-ink" : "text-ink-muted hover:bg-surface hover:text-ink",
                )}
              >
                {item.label}
                <ChevronDown className={cn("size-4 transition-transform duration-[var(--dur-base)]", megaOpen && "rotate-180")} />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-[var(--dur-fast)]",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-px bg-aurora" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {megaOpen ? <MegaNav onClose={() => setMegaOpen(false)} /> : null}
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

function IconLink({
  href,
  label,
  icon,
  count,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="relative grid size-10 place-items-center rounded-full text-ink transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-emerald"
    >
      {icon}
      {count ? (
        <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-emerald font-mono text-[0.55rem] font-bold text-on-aurora">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
