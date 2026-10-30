"use client";
import { useMemo, useState } from "react";
export function TextRepeater() {
  const [text, setText] = useState("FormReady India");
  const [n, setN] = useState(5);
  const out = useMemo(() => Array.from({length: Math.min(500, Math.max(1,n))}, () => text).join("\n"), [text,n]);
  return (
    <div className="space-y-4">
      <input value={text} onChange={e=>setText(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Text to repeat"/>
      <div><label className="text-sm font-medium">Times: {n}</label><input type="range" min={1} max={100} value={n} onChange={e=>setN(Number(e.target.value))} className="w-full"/></div>
      <textarea readOnly value={out} rows={8} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-mono"/>
    </div>
  );
}
