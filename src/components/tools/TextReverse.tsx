"use client";
import { useState } from "react";
export function TextReverse() {
  const [text, setText] = useState("");
  const byChar = text.split("").reverse().join("");
  const byWord = text.split(/(\s+)/).reverse().join("");
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="Enter text"/>
      <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground mb-1">By character</p><p className="break-all">{byChar||"—"}</p></div>
      <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground mb-1">By word</p><p className="break-all">{byWord||"—"}</p></div>
    </div>
  );
}
