"use client";

import { useMemo, useState } from "react";

export function MarksPercentage() {
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");

  const result = useMemo(() => {
    const o = parseFloat(obtained);
    const t = parseFloat(total);
    if (isNaN(o) || isNaN(t) || t <= 0) return null;
    const pct = (o / t) * 100;
    return { pct, grade: pct >= 90 ? "Outstanding" : pct >= 75 ? "Distinction" : pct >= 60 ? "First class" : pct >= 50 ? "Second class" : pct >= 35 ? "Pass" : "Needs improvement" };
  }, [obtained, total]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Marks obtained</label>
          <input type="number" value={obtained} onChange={(e) => setObtained(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" placeholder="e.g. 420" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total marks</label>
          <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" placeholder="e.g. 500" />
        </div>
      </section>
      {result && (
        <section className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">Percentage</p>
          <p className="mt-2 text-5xl font-bold text-indigo-600 dark:text-indigo-400">
            {result.pct.toLocaleString("en-IN", { maximumFractionDigits: 2 })}%
          </p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">{result.grade} (indicative label only)</p>
        </section>
      )}
    </div>
  );
}
