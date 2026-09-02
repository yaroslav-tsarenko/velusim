import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { getCurrentUser } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Velusim account password.",
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  if (await getCurrentUser()) redirect("/account");
  return (
    <AuthShell title="Forgot password" subtitle="Enter your email and we'll send you a link to reset it.">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
