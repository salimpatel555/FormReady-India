"use client";
import { useMemo, useState } from "react";
export function AverageCalculator() {
  const [text, setText] = useState("10, 20, 30, 40, 50");
  const r = useMemo(() => {
    const nums = text.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    if (!nums.length) return null;
    const sum = nums.reduce((a,b)=>a+b,0);
    return { count: nums.length, sum, avg: sum/nums.length, min: Math.min(...nums), max: Math.max(...nums) };
  }, [text]);
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="Enter numbers separated by commas or spaces"/>
      {r && <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">{[["Count",r.count],["Sum",r.sum],["Average",r.avg],["Min",r.min],["Max",r.max]].map(([l,v])=>(
        <div key={l as string} className="rounded-xl border border-border bg-card p-3 text-center"><p className="text-xs text-muted-foreground">{l}</p><p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{Number(v).toLocaleString("en-IN",{maximumFractionDigits:2})}</p></div>
      ))}</div>}
    </div>
  );
}
