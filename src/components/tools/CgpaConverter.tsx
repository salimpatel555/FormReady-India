"use client";

import { useMemo, useState } from "react";

export function CgpaConverter() {
  const [cgpa, setCgpa] = useState("8.2");
  const [scale, setScale] = useState<"10" | "4">("10");
  const [multiplier, setMultiplier] = useState("9.5"); // common CBSE-style

  const pct = useMemo(() => {
    const c = parseFloat(cgpa);
    const m = parseFloat(multiplier);
    if (isNaN(c) || isNaN(m)) return null;
    if (scale === "10") return Math.min(100, c * m);
    // 4.0 scale rough: convert to 10 then multiply
    return Math.min(100, (c / 4) * 10 * m);
  }, [cgpa, scale, multiplier]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Many Indian universities use different formulas (e.g. CGPA × 9.5). Adjust the multiplier to match your board or university rules.
      </p>
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CGPA</label>
          <input type="number" step="0.01" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Scale</label>
          <select value={scale} onChange={(e) => setScale(e.target.value as "10" | "4")} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
            <option value="10">Out of 10</option>
            <option value="4">Out of 4</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Multiplier</label>
          <input type="number" step="0.1" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
      </section>
      {pct !== null && (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">Approximate percentage</p>
          <p className="mt-2 text-5xl font-bold text-indigo-600 dark:text-indigo-400">{pct.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
