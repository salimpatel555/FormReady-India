"use client";
import { useMemo, useState } from "react";
export function TextDiffLength() {
  const [a,setA]=useState(""); const [b,setB]=useState("");
  const d = useMemo(() => a.length - b.length, [a,b]);
  return (
    <div className="space-y-4">
      <textarea value={a} onChange={e=>setA(e.target.value)} rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="Text A"/>
      <textarea value={b} onChange={e=>setB(e.target.value)} rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="Text B"/>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-border bg-card p-3"><p className="text-xs text-muted-foreground">A</p><p className="text-xl font-bold">{a.length}</p></div>
        <div className="rounded-xl border border-border bg-card p-3"><p className="text-xs text-muted-foreground">B</p><p className="text-xl font-bold">{b.length}</p></div>
        <div className="rounded-xl border border-border bg-card p-3"><p className="text-xs text-muted-foreground">Diff</p><p className="text-xl font-bold">{d}</p></div>
      </div>
    </div>
  );
}
