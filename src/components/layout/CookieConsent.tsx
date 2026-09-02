"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "velusim:cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // Read consent after mount to stay SSR-safe (localStorage is client-only).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage unavailable — stay hidden */
    }
  }, []);

  function decide(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-panel glass p-4 sm:inset-x-auto sm:right-4 sm:left-auto sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          We use cookies to run the site and improve your experience. See our{" "}
          <Link href="/legal/cookies" className="text-emerald underline-offset-2 hover:underline">
            cookie policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide("rejected")}
            className="inline-flex h-10 items-center rounded-full glass px-4 text-sm font-medium text-ink hover:border-hairline-strong"
          >
            Reject
          </button>
          <button
            onClick={() => decide("accepted")}
            className="inline-flex h-10 items-center rounded-full bg-aurora px-5 text-sm font-medium text-on-aurora hover:brightness-[1.06]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
