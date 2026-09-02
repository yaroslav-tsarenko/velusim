import Link from "next/link";
import { User } from "@/components/ui/icons";
import type { AccountSummary } from "./Header";

export function AccountButton({ account }: { account: AccountSummary | null }) {
  return (
    <Link
      href={account ? "/account" : "/login"}
      aria-label={account ? "Account" : "Sign in"}
      title={account ? "Account" : "Sign in"}
      className="relative grid size-10 place-items-center rounded-full text-ink transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-emerald"
    >
      <User className="size-5" />
      {account ? (
        <span
          aria-hidden
          className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald ring-2 ring-night"
        />
      ) : null}
    </Link>
  );
}
