"use client";
import { useMemo, useState } from "react";
export function FactorialCalculator() {
  const [n, setN] = useState("10");
  const r = useMemo(() => {
    const x = parseInt(n,10); if(isNaN(x)||x<0||x>170) return null;
    let f = 1; for(let i=2;i<=x;i++) f*=i;
    return f;
  }, [n]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">n (0–170)</label><input type="number" value={n} onChange={e=>setN(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      {r!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">n!</p><p className="text-2xl font-bold font-mono break-all mt-2">{r.toLocaleString("en-IN")}</p></div>}
    </div>
  );
}
