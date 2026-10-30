"use client";
import { useMemo, useState } from "react";
function gcd(a:number,b:number):number{ a=Math.abs(Math.round(a)); b=Math.abs(Math.round(b)); while(b){[a,b]=[b,a%b];} return a||1; }
export function PixelAspect() {
  const [w,setW]=useState("1920"); const [h,setH]=useState("1080");
  const r = useMemo(() => {
    const W=parseInt(w,10), H=parseInt(h,10);
    if(isNaN(W)||isNaN(H)||W<=0||H<=0) return null;
    const g=gcd(W,H);
    return `${W/g}:${H/g}`;
  }, [w,h]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Width</label><input type="number" value={w} onChange={e=>setW(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Height</label><input type="number" value={h} onChange={e=>setH(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">Aspect ratio</p><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{r}</p></div>}
    </div>
  );
}
