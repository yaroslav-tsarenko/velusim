"use client";

import { useActionState } from "react";
import { resetPasswordAction, type FormState } from "@/lib/auth/actions";
import { Field } from "./AuthField";
import { ArrowRight } from "@/components/ui/icons";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(resetPasswordAction, {});
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="token" value={token} />
      {state.message ? (
        <p className="rounded-xl border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald">{state.message}</p>
      ) : null}
      <Field label="New password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.password} />
      <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.confirmPassword} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-aurora font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? "Saving…" : "Set new password"} <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
