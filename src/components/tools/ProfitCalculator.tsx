"use client";
import { useMemo, useState } from "react";
export function ProfitCalculator() {
  const [cost, setCost] = useState("500");
  const [sell, setSell] = useState("750");
  const r = useMemo(() => {
    const c = parseFloat(cost), s = parseFloat(sell);
    if (isNaN(c)||isNaN(s)||c===0) return null;
    const diff = s - c;
    return { diff, pct: (diff/c)*100, type: diff >= 0 ? "Profit" : "Loss" };
  }, [cost, sell]);
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Cost price (₹)</label><input type="number" value={cost} onChange={e=>setCost(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Selling price (₹)</label><input type="number" value={sell} onChange={e=>setSell(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </section>
      {r && <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">{r.type}</p>
        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">₹{Math.abs(r.diff).toLocaleString("en-IN",{maximumFractionDigits:2})}</p>
        <p className="mt-2 text-muted-foreground">{r.pct.toFixed(2)}%</p>
      </div>}
    </div>
  );
}
