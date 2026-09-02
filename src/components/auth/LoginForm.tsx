"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type FormState } from "@/lib/auth/actions";
import { Field } from "./AuthField";
import { ArrowRight } from "@/components/ui/icons";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(loginAction, {});
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-3">
      {state.message ? (
        <p className="rounded-xl border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald">{state.message}</p>
      ) : null}
      <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@example.com" errors={e.email} />
      <div>
        <Field label="Password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" errors={e.password} />
        <div className="mt-1 text-right">
          <Link href="/forgot-password" className="text-xs text-ink-muted underline hover:text-ink">Forgot password?</Link>
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-aurora font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"} <ArrowRight className="size-4" />
      </button>
      <p className="text-center text-sm text-ink-muted">
        New to Velusim?{" "}
        <Link href="/register" className="font-medium text-emerald underline">Create an account</Link>
      </p>
    </form>
  );
}
