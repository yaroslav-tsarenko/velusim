import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { getCurrentUser } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Velusim travel wallet.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/account");
  return (
    <AuthShell title="Sign in" subtitle="Access your travel wallet, saved destinations and eSIMs.">
      <LoginForm />
    </AuthShell>
  );
}
