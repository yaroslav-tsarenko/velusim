"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CurrencyCode } from "@/lib/types";

type Theme = "light" | "dark";

interface PreferencesValue {
  theme: Theme;
  toggleTheme: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

const Ctx = createContext<PreferencesValue | null>(null);

// The inline script in the document head resolves the theme and sets the
// `.dark` class before React hydrates, so the DOM is the source of truth for
// the initial value — reading it here keeps React in sync with what was painted.
function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [currency, setCurrency] = useState<CurrencyCode>("GBP");

  // Hydrate currency from storage on mount.
  useEffect(() => {
    const cur = localStorage.getItem("velusim:currency") as CurrencyCode | null;
    if (cur) setCurrency(cur);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("velusim:theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    [],
  );

  const setCurrencyPersist = useCallback((c: CurrencyCode) => {
    setCurrency(c);
    localStorage.setItem("velusim:currency", c);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      currency,
      setCurrency: setCurrencyPersist,
    }),
    [theme, toggleTheme, currency, setCurrencyPersist],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePreferences(): PreferencesValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
