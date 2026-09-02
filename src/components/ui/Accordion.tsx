"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "./icons";

export interface AccordionItem {
  q: string;
  a: React.ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className={cn("divide-y divide-hairline", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg text-ink">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-emerald transition-transform duration-200 ease-[var(--ease-signal)]",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-5 text-pretty text-ink-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
