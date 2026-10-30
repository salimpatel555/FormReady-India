"use client";
import { useMemo, useState } from "react";
export function MarginMarkup() {
  const [mode, setMode] = useState<"margin"|"markup">("margin");
  const [val, setVal] = useState("25");
  const r = useMemo(() => {
    const x = parseFloat(val); if (isNaN(x) || x <= 0 || x >= 100) return null;
    if (mode === "margin") return { label: "Markup", value: (x/(100-x))*100 };
    return { label: "Margin", value: (x/(100+x))*100 };
  }, [mode, val]);
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button type="button" onClick={()=>setMode("margin")} className={`rounded-full px-3 py-1 text-sm ${mode==="margin"?"bg-indigo-600 text-white":"border border-border"}`}>Margin → Markup</button>
        <button type="button" onClick={()=>setMode("markup")} className={`rounded-full px-3 py-1 text-sm ${mode==="markup"?"bg-indigo-600 text-white":"border border-border"}`}>Markup → Margin</button>
      </div>
      <div><label className="text-sm font-medium">{mode==="margin"?"Margin %":"Markup %"}</label><input type="number" value={val} onChange={e=>setVal(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      {r && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">{r.label}</p><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{r.value.toFixed(2)}%</p></div>}
    </div>
  );
}
