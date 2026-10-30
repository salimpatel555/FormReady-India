"use client";
import { useMemo, useState } from "react";
export function QuadraticSolver() {
  const [a,setA]=useState("1"); const [b,setB]=useState("-3"); const [c,setC]=useState("2");
  const r = useMemo(() => {
    const A=parseFloat(a),B=parseFloat(b),C=parseFloat(c);
    if(isNaN(A)||isNaN(B)||isNaN(C)||A===0) return null;
    const d=B*B-4*A*C;
    if(d<0) return { type:"complex" as const };
    if(d===0) return { type:"one" as const, x: -B/(2*A) };
    const s=Math.sqrt(d);
    return { type:"two" as const, x1:(-B+s)/(2*A), x2:(-B-s)/(2*A) };
  }, [a,b,c]);
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">ax² + bx + c = 0</p>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-sm">a</label><input type="number" value={a} onChange={e=>setA(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm">b</label><input type="number" value={b} onChange={e=>setB(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm">c</label><input type="number" value={c} onChange={e=>setC(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r && <div className="rounded-2xl border border-border bg-card p-6 text-center">
        {r.type==="complex" && <p>No real roots</p>}
        {r.type==="one" && <p className="text-2xl font-bold">x = {r.x.toFixed(4)}</p>}
        {r.type==="two" && <p className="text-xl font-bold">x₁ = {r.x1.toFixed(4)} · x₂ = {r.x2.toFixed(4)}</p>}
      </div>}
    </div>
  );
}
