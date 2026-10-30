"use client";
import { useMemo, useState } from "react";
export function PercentageIncrease() {
  const [a, setA] = useState("100");
  const [b, setB] = useState("125");
  const r = useMemo(() => {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y) || x === 0) return null;
    return ((y - x) / x) * 100;
  }, [a, b]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Original</label><input type="number" value={a} onChange={e=>setA(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">New</label><input type="number" value={b} onChange={e=>setB(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r !== null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{r >= 0 ? "+" : ""}{r.toFixed(2)}%</p></div>}
    </div>
  );
}
