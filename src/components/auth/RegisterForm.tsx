"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction, type FormState } from "@/lib/auth/actions";
import { addressCountries } from "@/lib/auth/countries";
import { Field, FieldError, authInputClass, authLabelClass } from "./AuthField";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const steps = ["Account", "About you", "Address"] as const;

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(registerAction, {});
  const [step, setStep] = useState(0);
  const [terms, setTerms] = useState(false);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <ol className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-6 place-items-center rounded-full border",
                i === step ? "border-emerald bg-emerald text-on-aurora" : i < step ? "border-teal text-teal" : "border-hairline text-ink-muted",
              )}
            >
              {i + 1}
            </span>
            <span className={i === step ? "text-ink" : "text-ink-muted"}>{label}</span>
            {i < steps.length - 1 ? <span className="h-px w-4 bg-hairline" /> : null}
          </li>
        ))}
      </ol>

      {state.message ? (
        <p className="rounded-xl border border-emerald/40 bg-emerald/10 px-4 py-3 text-sm text-emerald">{state.message}</p>
      ) : null}

      {/* Step 1 — Account. Hidden steps stay mounted so all values submit together. */}
      <div className={cn("space-y-3", step === 0 ? "" : "hidden")}>
        <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@example.com" errors={e.email} />
        <Field label="Password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.password} />
        <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.confirmPassword} />
      </div>

      {/* Step 2 — About you */}
      <div className={cn("space-y-3", step === 1 ? "" : "hidden")}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" name="firstName" autoComplete="given-name" defaultValue={v.firstName} errors={e.firstName} />
          <Field label="Last name" name="lastName" autoComplete="family-name" defaultValue={v.lastName} errors={e.lastName} />
        </div>
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="+1 555 000 0000" errors={e.phone} />
        <Field label="Date of birth" name="dob" type="date" defaultValue={v.dob} errors={e.dob} />
      </div>

      {/* Step 3 — Address */}
      <div className={cn("space-y-3", step === 2 ? "" : "hidden")}>
        <Field label="Street address" name="street" autoComplete="street-address" defaultValue={v.street} errors={e.street} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" name="city" autoComplete="address-level2" defaultValue={v.city} errors={e.city} />
          <Field label="Postal code" name="postalCode" autoComplete="postal-code" defaultValue={v.postalCode} errors={e.postalCode} />
        </div>
        <div>
          <label htmlFor="country" className={authLabelClass}>Country</label>
          <select id="country" name="country" defaultValue={v.country ?? ""} className={authInputClass}>
            <option value="" disabled>Select a country</option>
            {addressCountries.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          <FieldError errors={e.country} />
        </div>
        <label className="flex items-start gap-2 pt-1 text-sm text-ink-muted">
          <input
            type="checkbox"
            name="terms"
            checked={terms}
            onChange={(ev) => setTerms(ev.target.checked)}
            className="mt-0.5 size-4 accent-[var(--aurora-1)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/legal/terms" className="text-emerald underline">Terms &amp; Conditions</Link> and{" "}
            <Link href="/legal/privacy" className="text-emerald underline">Privacy Policy</Link>.
          </span>
        </label>
        <FieldError errors={e.terms} />
      </div>

      <div className="flex items-center gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex h-12 items-center justify-center rounded-full border border-hairline px-5 text-sm font-medium text-ink transition-colors hover:border-hairline-strong"
          >
            Back
          </button>
        ) : null}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-aurora font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98]"
          >
            Continue <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!terms || pending}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-aurora font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Creating account…" : "Create account"} <ArrowRight className="size-4" />
          </button>
        )}
      </div>

      <p className="text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-emerald underline">Sign in</Link>
      </p>
    </form>
  );
}
