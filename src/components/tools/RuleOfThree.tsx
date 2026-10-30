"use client";
import { useMemo, useState } from "react";
export function RuleOfThree() {
  const [a,setA]=useState("2"); const [b,setB]=useState("5"); const [c,setC]=useState("4");
  const x = useMemo(() => {
    const A=parseFloat(a),B=parseFloat(b),C=parseFloat(c);
    if([A,B,C].some(isNaN)||A===0) return null;
    return (B*C)/A;
  }, [a,b,c]);
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">If a → b, then c → x</p>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-sm">a</label><input type="number" value={a} onChange={e=>setA(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm">b</label><input type="number" value={b} onChange={e=>setB(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm">c</label><input type="number" value={c} onChange={e=>setC(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {x!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">x</p><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{x.toLocaleString("en-IN",{maximumFractionDigits:4})}</p></div>}
    </div>
  );
}
