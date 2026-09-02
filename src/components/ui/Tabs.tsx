"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const base = useId();

  return (
    <div className={className}>
      <div role="tablist" aria-label="Options" className="inline-flex gap-1 rounded-full border border-hairline bg-surface p-1">
        {tabs.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`${base}-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                selected ? "bg-card text-ink shadow-glow-sm" : "text-ink-muted hover:text-ink",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-${t.id}`}
          hidden={active !== t.id}
          className="mt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
