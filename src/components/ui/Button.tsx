import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,color,box-shadow,border-color] " +
  "duration-[var(--dur-base)] ease-[var(--ease-signal)] active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  /* The aurora gradient is reserved for the one primary action per view.
     Night ink on the gradient clears AA at every stop. */
  primary: "bg-aurora text-on-aurora shadow-aurora hover:brightness-[1.06]",
  secondary: "bg-emerald text-on-aurora shadow-emerald hover:brightness-[1.06]",
  outline: "glass text-ink hover:border-hairline-strong",
  ghost: "text-ink-muted hover:bg-surface hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
