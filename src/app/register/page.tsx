import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getCurrentUser } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Velusim account to buy and manage travel eSIMs.",
  robots: { index: false, follow: false },
};

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/account");
  return (
    <AuthShell wide title="Create your account" subtitle="Join Velusim to buy eSIMs, top up your balance and track every trip.">
      <RegisterForm />
    </AuthShell>
  );
}
