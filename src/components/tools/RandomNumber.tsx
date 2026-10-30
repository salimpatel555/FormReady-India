"use client";
import { useState } from "react";
export function RandomNumber() {
  const [min,setMin]=useState(1); const [max,setMax]=useState(100); const [n,setN]=useState<number|null>(null);
  const gen = () => {
    const a=Math.min(min,max), b=Math.max(min,max);
    const buf = new Uint32Array(1); crypto.getRandomValues(buf);
    setN(a + (buf[0] % (b-a+1)));
  };
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Min</label><input type="number" value={min} onChange={e=>setMin(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Max</label><input type="number" value={max} onChange={e=>setMax(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      <button type="button" onClick={gen} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">Generate</button>
      {n!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{n}</p></div>}
    </div>
  );
}
