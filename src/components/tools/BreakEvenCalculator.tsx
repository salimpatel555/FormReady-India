"use client";
import { useMemo, useState } from "react";
export function BreakEvenCalculator() {
  const [fixed, setFixed] = useState("50000");
  const [price, setPrice] = useState("500");
  const [variable, setVariable] = useState("200");
  const r = useMemo(() => {
    const f=parseFloat(fixed),p=parseFloat(price),v=parseFloat(variable);
    if([f,p,v].some(isNaN)||p<=v) return null;
    const units = f/(p-v);
    return { units, revenue: units*p };
  }, [fixed,price,variable]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div><label className="text-sm font-medium">Fixed cost (₹)</label><input type="number" value={fixed} onChange={e=>setFixed(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Price / unit</label><input type="number" value={price} onChange={e=>setPrice(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Variable cost / unit</label><input type="number" value={variable} onChange={e=>setVariable(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r && <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-6 text-center"><p className="text-sm text-muted-foreground">Break-even units</p><p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{Math.ceil(r.units)}</p></div>
        <div className="rounded-xl border border-border bg-card p-6 text-center"><p className="text-sm text-muted-foreground">Revenue at break-even</p><p className="text-3xl font-bold">₹{r.revenue.toLocaleString("en-IN",{maximumFractionDigits:0})}</p></div>
      </div>}
    </div>
  );
}
