import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Section, Container, Eyebrow } from "@/components/ui/Section";
import { AccountView, type Tab } from "@/components/account/AccountView";
import { getCurrentUser, getTransactions, getEsims } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "My eSIMs & account",
  description: "Manage your Velusim eSIMs, view QR codes, track remaining data and top up.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/account" },
};

export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  const raw = typeof sp.tab === "string" ? sp.tab : "esims";
  const tab: Tab =
    raw === "saved" || raw === "profile" || raw === "wallet" ? raw : "esims";

  const [transactions, esims] = await Promise.all([
    getTransactions(user.id),
    getEsims(user.id),
  ]);

  return (
    <Section band="night" starfield aurora>
      <Container className="py-12 sm:py-16">
        <Eyebrow coords="your balance">Account</Eyebrow>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Welcome back, {user.firstName}</h1>
        <p className="mt-2 max-w-xl text-ink-muted">Every eSIM you own, as a glass card — QR ready to scan, data at a glance, top-ups one tap away.</p>
        <div className="mt-10">
          <AccountView initialTab={tab} user={user} transactions={transactions} esims={esims} />
        </div>
      </Container>
    </Section>
  );
}
