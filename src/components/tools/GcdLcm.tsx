"use client";
import { useMemo, useState } from "react";
function gcd(a:number,b:number):number { a=Math.abs(a);b=Math.abs(b); while(b){[a,b]=[b,a%b];} return a; }
export function GcdLcm() {
  const [a, setA] = useState("12");
  const [b, setB] = useState("18");
  const r = useMemo(() => {
    const x=parseInt(a,10), y=parseInt(b,10);
    if(isNaN(x)||isNaN(y)||x===0||y===0) return null;
    const g = gcd(x,y);
    return { g, l: Math.abs(x*y)/g };
  }, [a,b]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">A</label><input type="number" value={a} onChange={e=>setA(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">B</label><input type="number" value={b} onChange={e=>setB(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r && <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-6 text-center"><p className="text-sm text-muted-foreground">GCD</p><p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{r.g}</p></div>
        <div className="rounded-xl border border-border bg-card p-6 text-center"><p className="text-sm text-muted-foreground">LCM</p><p className="text-3xl font-bold">{r.l}</p></div>
      </div>}
    </div>
  );
}
