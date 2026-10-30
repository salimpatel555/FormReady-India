"use client";

import { useMemo, useState } from "react";

const lengthToMeters: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  inch: 0.0254,
  px: 0.0254 / 96, // CSS px at 96dpi
};

export function UnitConverter() {
  const [value, setValue] = useState("3.5");
  const [from, setFrom] = useState("cm");
  const [to, setTo] = useState("inch");

  const converted = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    const meters = v * lengthToMeters[from];
    return meters / lengthToMeters[to];
  }, [value, from, to]);

  const units = Object.keys(lengthToMeters);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Useful for photo sizes (e.g. 3.5 × 4.5 cm) and pixel estimates at 96 DPI. Official forms may specify exact pixels separately.
      </p>
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </section>
      {converted !== null && (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">{value} {from} =</p>
          <p className="mt-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            {converted.toLocaleString("en-IN", { maximumFractionDigits: 4 })} {to}
          </p>
        </div>
      )}
    </div>
  );
}
