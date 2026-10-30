"use client";
import { useMemo, useState } from "react";
const toM2: Record<string, number> = { m2: 1, sqft: 0.092903, acre: 4046.86, hectare: 10000 };
export function AreaConverter() {
  const [v, setV] = useState("100");
  const [from, setFrom] = useState("sqft");
  const [to, setTo] = useState("m2");
  const out = useMemo(() => {
    const n = parseFloat(v); if (isNaN(n)) return null;
    return (n * toM2[from]) / toM2[to];
  }, [v, from, to]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div><label className="text-sm font-medium">Value</label><input type="number" value={v} onChange={e=>setV(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">From</label><select value={from} onChange={e=>setFrom(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">{Object.keys(toM2).map(u=><option key={u} value={u}>{u}</option>)}</select></div>
        <div><label className="text-sm font-medium">To</label><select value={to} onChange={e=>setTo(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">{Object.keys(toM2).map(u=><option key={u} value={u}>{u}</option>)}</select></div>
      </div>
      {out!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{out.toLocaleString("en-IN",{maximumFractionDigits:4})} {to}</p></div>}
    </div>
  );
}
