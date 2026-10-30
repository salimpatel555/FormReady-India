"use client";

import { useMemo, useState } from "react";

export function CompoundInterest() {
  const [p, setP] = useState("100000");
  const [r, setR] = useState("8");
  const [t, setT] = useState("5");
  const [n, setN] = useState("4"); // compounding per year

  const result = useMemo(() => {
    const P = parseFloat(p), rate = parseFloat(r), time = parseFloat(t), freq = parseFloat(n);
    if ([P, rate, time, freq].some((x) => isNaN(x) || x < 0) || freq === 0) return null;
    const amount = P * Math.pow(1 + rate / 100 / freq, freq * time);
    return { amount, interest: amount - P };
  }, [p, r, t, n]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Principal (₹)</label>
          <input type="number" value={p} onChange={(e) => setP(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual rate (%)</label>
          <input type="number" value={r} onChange={(e) => setR(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time (years)</label>
          <input type="number" value={t} onChange={(e) => setT(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Compounded</label>
          <select value={n} onChange={(e) => setN(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </div>
      </section>
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Interest earned</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              ₹{result.interest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Maturity amount</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              ₹{result.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">A = P (1 + r/n)^(nt). Indicative only.</p>
    </div>
  );
}
