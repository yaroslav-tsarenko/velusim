"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordResetAction, type FormState } from "@/lib/auth/actions";
import { Field } from "./AuthField";
import { ArrowRight } from "@/components/ui/icons";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(requestPasswordResetAction, {});
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className="space-y-4">
        <p className="rounded-xl border border-teal/40 bg-teal/10 px-4 py-3 text-sm text-ink">{state.message}</p>
        <Link href="/login" className="inline-flex text-sm font-medium text-emerald underline">Back to sign in</Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      {state.message ? (
        <p className="rounded-xl border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald">{state.message}</p>
      ) : null}
      <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@example.com" errors={e.email} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-aurora font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send reset link"} <ArrowRight className="size-4" />
      </button>
      <p className="text-center text-sm text-ink-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-emerald underline">Sign in</Link>
      </p>
    </form>
  );
}
