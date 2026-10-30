"use client";

import { useMemo, useState } from "react";

export function SimpleInterest() {
  const [p, setP] = useState("100000");
  const [r, setR] = useState("8");
  const [t, setT] = useState("2");

  const result = useMemo(() => {
    const principal = parseFloat(p);
    const rate = parseFloat(r);
    const time = parseFloat(t);
    if ([principal, rate, time].some((n) => isNaN(n) || n < 0)) return null;
    const interest = (principal * rate * time) / 100;
    return { interest, total: principal + interest };
  }, [p, r, t]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Principal (₹)</label>
          <input type="number" value={p} onChange={(e) => setP(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rate (% per year)</label>
          <input type="number" value={r} onChange={(e) => setR(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time (years)</label>
          <input type="number" value={t} onChange={(e) => setT(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
      </section>
      {result && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Simple interest</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{result.interest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Total amount</p>
            <p className="mt-2 text-3xl font-bold text-foreground">₹{result.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
          </div>
        </section>
      )}
      <p className="text-xs text-muted-foreground">Formula: SI = (P × R × T) / 100</p>
    </div>
  );
}
