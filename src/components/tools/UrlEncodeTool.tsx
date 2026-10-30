"use client";
import { useState } from "react";
export function UrlEncodeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="Text or URL"/>
      <div className="flex gap-2">
        <button type="button" onClick={()=>setOutput(encodeURIComponent(input))} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Encode</button>
        <button type="button" onClick={()=>{try{setOutput(decodeURIComponent(input))}catch{setOutput("Invalid")}}} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold">Decode</button>
      </div>
      <textarea readOnly value={output} rows={4} className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm break-all" placeholder="Output"/>
    </div>
  );
}
