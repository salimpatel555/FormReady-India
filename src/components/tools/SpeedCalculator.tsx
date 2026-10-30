"use client";
import { useMemo, useState } from "react";
export function SpeedCalculator() {
  const [mode, setMode] = useState<"speed"|"distance"|"time">("speed");
  const [a, setA] = useState("100");
  const [b, setB] = useState("2");
  const r = useMemo(() => {
    const x=parseFloat(a), y=parseFloat(b);
    if (isNaN(x)||isNaN(y)||y===0) return null;
    if (mode==="speed") return { label: "Speed", value: x/y, unit: "km/h" };
    if (mode==="distance") return { label: "Distance", value: x*y, unit: "km" };
    return { label: "Time", value: x/y, unit: "h" };
  }, [mode,a,b]);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">{(["speed","distance","time"] as const).map(m=>(
        <button key={m} type="button" onClick={()=>setMode(m)} className={`rounded-full px-3 py-1 text-sm ${mode===m?"bg-indigo-600 text-white":"border border-border"}`}>{m}</button>
      ))}</div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">{mode==="speed"?"Distance (km)":mode==="distance"?"Speed (km/h)":"Distance (km)"}</label><input type="number" value={a} onChange={e=>setA(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">{mode==="speed"?"Time (h)":mode==="distance"?"Time (h)":"Speed (km/h)"}</label><input type="number" value={b} onChange={e=>setB(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">{r.label}</p><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{r.value.toFixed(2)} {r.unit}</p></div>}
    </div>
  );
}
