"use client";
import { useMemo, useState } from "react";
export function AspectRatioCalculator() {
  const [rw, setRw] = useState("16");
  const [rh, setRh] = useState("9");
  const [w, setW] = useState("1920");
  const h = useMemo(() => {
    const a=parseFloat(rw),b=parseFloat(rh),width=parseFloat(w);
    if([a,b,width].some(x=>isNaN(x)||x<=0)) return null;
    return (width * b) / a;
  }, [rw,rh,w]);
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid sm:grid-cols-3 gap-4">
        <div><label className="text-sm font-medium">Ratio W</label><input type="number" value={rw} onChange={e=>setRw(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Ratio H</label><input type="number" value={rh} onChange={e=>setRh(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Width (px)</label><input type="number" value={w} onChange={e=>setW(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </section>
      {h!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">Height</p><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{h.toFixed(0)} px</p></div>}
    </div>
  );
}
