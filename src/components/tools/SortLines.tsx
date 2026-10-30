"use client";
import { useState } from "react";
export function SortLines() {
  const [text, setText] = useState("banana\napple\ncherry");
  const [out, setOut] = useState("");
  const run = (desc: boolean) => {
    const lines = text.split("\n");
    lines.sort((a,b)=>desc ? b.localeCompare(a) : a.localeCompare(b));
    setOut(lines.join("\n"));
  };
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm"/>
      <div className="flex gap-2">
        <button type="button" onClick={()=>run(false)} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">A–Z</button>
        <button type="button" onClick={()=>run(true)} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold">Z–A</button>
      </div>
      <textarea readOnly value={out} rows={6} className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm"/>
    </div>
  );
}
