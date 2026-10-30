"use client";
import { useMemo, useState } from "react";
export function PrimeChecker() {
  const [n, setN] = useState("17");
  const r = useMemo(() => {
    const x = parseInt(n,10); if(isNaN(x)||x<2) return { prime:false, factors:[] as number[] };
    const factors:number[] = [];
    for(let i=2;i*i<=x;i++) if(x%i===0){ factors.push(i); if(i*i!==x) factors.push(x/i); }
    factors.sort((a,b)=>a-b);
    return { prime: factors.length===0, factors };
  }, [n]);
  return (
    <div className="space-y-6">
      <input type="number" value={n} onChange={e=>setN(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-2xl font-bold">{r.prime ? "Prime number" : "Not prime"}</p>
        {!r.prime && r.factors.length>0 && <p className="mt-2 text-sm text-muted-foreground">Factors: {r.factors.join(", ")}</p>}
      </div>
    </div>
  );
}
