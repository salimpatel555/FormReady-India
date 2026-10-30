"use client";
import { useMemo, useState } from "react";
export function WordFrequency() {
  const [text, setText] = useState("the quick brown fox jumps over the lazy dog the fox");
  const rows = useMemo(() => {
    const m = new Map<string, number>();
    text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).forEach(w => m.set(w, (m.get(w)||0)+1));
    return [...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,30);
  }, [text]);
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={5} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm"/>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-muted/50"><tr><th className="text-left p-2">Word</th><th className="text-right p-2">Count</th></tr></thead>
        <tbody>{rows.map(([w,c])=><tr key={w} className="border-t border-border"><td className="p-2">{w}</td><td className="p-2 text-right font-semibold">{c}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
