"use client";
import { useMemo, useState } from "react";
export function TipCalculator() {
  const [bill, setBill] = useState("1000");
  const [tip, setTip] = useState("10");
  const [people, setPeople] = useState("1");
  const r = useMemo(() => {
    const b = parseFloat(bill), t = parseFloat(tip), p = parseFloat(people);
    if ([b,t,p].some(x => isNaN(x) || x < 0) || p === 0) return null;
    const tipAmt = b * t / 100;
    return { tipAmt, total: b + tipAmt, each: (b + tipAmt) / p };
  }, [bill, tip, people]);
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid sm:grid-cols-3 gap-4">
        <div><label className="text-sm font-medium">Bill (₹)</label><input type="number" value={bill} onChange={e=>setBill(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Tip %</label><input type="number" value={tip} onChange={e=>setTip(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">People</label><input type="number" value={people} onChange={e=>setPeople(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </section>
      {r && <div className="grid sm:grid-cols-3 gap-3">{[["Tip", r.tipAmt],["Total", r.total],["Each", r.each]].map(([l,v])=>(
        <div key={l as string} className="rounded-xl border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground">{l}</p><p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{Number(v).toLocaleString("en-IN",{maximumFractionDigits:2})}</p></div>
      ))}</div>}
    </div>
  );
}
