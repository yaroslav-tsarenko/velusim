"use client";

import { usePreferences } from "@/components/providers/Preferences";
import { Sun, Moon } from "@/components/ui/icons";

export function ThemeToggle() {
  const { toggleTheme } = usePreferences();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="inline-flex size-8 items-center justify-center rounded-full text-current transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-emerald"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
