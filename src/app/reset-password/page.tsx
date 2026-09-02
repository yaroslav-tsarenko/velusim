import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your Velusim account.",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({ searchParams }: PageProps<"/reset-password">) {
  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : "";

  if (!token) {
    return (
      <AuthShell title="Reset password" subtitle="This reset link is missing its token.">
        <Link href="/forgot-password" className="text-sm font-medium text-emerald underline">Request a new link</Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password you haven't used before.">
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
