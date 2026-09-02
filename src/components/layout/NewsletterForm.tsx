"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  }

  if (done) {
    return (
      <p
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald-soft px-4 py-3 text-sm text-emerald",
          className,
        )}
      >
        <Check className="size-4" /> You&apos;re on the list — safe travels.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("glass inline-flex w-full max-w-sm items-center gap-2 rounded-full p-1.5 md:w-auto", className)}
    >
      <label htmlFor="newsletter" className="sr-only">Email address</label>
      <input
        id="newsletter"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-aurora px-4 text-sm font-medium text-on-aurora transition-[filter,transform] duration-[var(--dur-base)] hover:brightness-[1.06] active:scale-[0.98]"
      >
        Subscribe <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
