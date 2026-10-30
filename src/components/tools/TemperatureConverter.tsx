"use client";
import { useMemo, useState } from "react";
export function TemperatureConverter() {
  const [v, setV] = useState("25");
  const [from, setFrom] = useState("C");
  const r = useMemo(() => {
    const n = parseFloat(v); if (isNaN(n)) return null;
    let c = n;
    if (from==="F") c = (n-32)*5/9;
    if (from==="K") c = n-273.15;
    return { C: c, F: c*9/5+32, K: c+273.15 };
  }, [v, from]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Value</label><input type="number" value={v} onChange={e=>setV(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">From</label>
          <select value={from} onChange={e=>setFrom(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option value="C">Celsius</option><option value="F">Fahrenheit</option><option value="K">Kelvin</option>
          </select>
        </div>
      </div>
      {r && <div className="grid sm:grid-cols-3 gap-3">{[["°C",r.C],["°F",r.F],["K",r.K]].map(([l,val])=>(
        <div key={l as string} className="rounded-xl border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground">{l}</p><p className="text-2xl font-bold">{Number(val).toFixed(2)}</p></div>
      ))}</div>}
    </div>
  );
}
