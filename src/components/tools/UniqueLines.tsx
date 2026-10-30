"use client";
import { useState } from "react";
export function UniqueLines() {
  const [text, setText] = useState("a\nb\na\nc\nb");
  const [out, setOut] = useState("");
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm"/>
      <button type="button" onClick={()=>setOut([...new Set(text.split("\n"))].join("\n"))} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Remove duplicates</button>
      <textarea readOnly value={out} rows={6} className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm"/>
    </div>
  );
}
