"use client";
import { useMemo, useState } from "react";
export function TextStatistics() {
  const [text, setText] = useState("Hello 123!");
  const s = useMemo(() => ({
    letters: (text.match(/[a-zA-Z]/g)||[]).length,
    digits: (text.match(/[0-9]/g)||[]).length,
    spaces: (text.match(/\s/g)||[]).length,
    special: (text.match(/[^a-zA-Z0-9\s]/g)||[]).length,
    total: text.length,
  }), [text]);
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm"/>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">{Object.entries(s).map(([k,v])=>(
        <div key={k} className="rounded-xl border border-border bg-card p-3 text-center"><p className="text-xs text-muted-foreground capitalize">{k}</p><p className="text-xl font-bold">{v}</p></div>
      ))}</div>
    </div>
  );
}
