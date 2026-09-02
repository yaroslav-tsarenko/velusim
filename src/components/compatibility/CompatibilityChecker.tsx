"use client";

import { useState } from "react";
import { deviceBrands, modelsForBrand } from "@/lib/data/devices";
import { Check, Close, Device } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const selectCls =
  "h-11 w-full rounded-field border border-hairline bg-night px-3 text-ink " +
  "transition-colors duration-[var(--dur-base)] focus:border-aurora-2 focus:outline-none disabled:opacity-50";

/** Diagnostics panel: brand → model → verdict, with a mono readout. */
export function CompatibilityChecker() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = brand ? modelsForBrand(brand) : [];
  const selected = models.find((m) => m.model === model);

  return (
    <div className="glass mx-auto max-w-xl rounded-panel p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <p className="eyebrow">Diagnostics · device check</p>
          <h2 className="mt-2 font-display text-2xl text-ink">Will your phone take an eSIM?</h2>
        </div>
        <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald">
          <span aria-hidden className="absolute inset-0 rounded-full border border-aurora-1/40 animate-pulse-ring" />
          <Device className="size-5" />
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Brand">
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel("");
            }}
            className={selectCls}
          >
            <option value="">Select brand…</option>
            {deviceBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>

        <Field label="Model">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!brand}
            className={selectCls}
          >
            <option value="">{brand ? "Select model…" : "Pick a brand first"}</option>
            {models.map((m) => (
              <option key={m.model} value={m.model}>{m.model}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Mono readout — the verdict reads like an instrument panel. */}
      {selected ? (
        <div
          className={cn(
            "mt-6 rounded-field border p-5",
            selected.esimSupported
              ? "border-emerald/40 bg-emerald-soft"
              : "border-danger/40 bg-danger-soft",
          )}
          role="status"
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full text-on-aurora",
                selected.esimSupported ? "bg-emerald" : "bg-danger",
              )}
            >
              {selected.esimSupported ? <Check className="size-5" /> : <Close className="size-5" />}
            </span>
            <div className="min-w-0">
              <p className="font-display text-xl text-ink">
                {selected.esimSupported ? "Compatible — you're good to go" : "Not eSIM-compatible"}
              </p>
              <p className="mt-0.5 font-mono text-[0.72rem] tracking-[0.08em] text-ink-muted">
                {selected.brand.toUpperCase()} · {selected.model.toUpperCase()} ·{" "}
                <span className={selected.esimSupported ? "text-emerald" : "text-danger"}>
                  ESIM {selected.esimSupported ? "OK" : "NO"}
                </span>
              </p>
            </div>
          </div>
          {selected.note ? (
            <p className="mt-3 text-sm text-ink-muted">{selected.note}</p>
          ) : null}
          {selected.esimSupported ? (
            <p className="mt-3 text-sm text-ink-muted">
              Also make sure your phone is carrier-unlocked. Then pick a destination and you&apos;ll be
              online in about a minute.
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 rounded-field border border-hairline bg-surface/60 p-4 text-sm text-ink-muted">
          Select your brand and model for an instant verdict. We check {deviceBrands.length} brands and
          dozens of models.
        </p>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
    </label>
  );
}
