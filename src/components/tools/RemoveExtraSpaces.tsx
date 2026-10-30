"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
export function RemoveExtraSpaces() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const cleaned = text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="Paste messy text"/>
      <button type="button" onClick={()=>{setText(cleaned);toast("Cleaned");}} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Clean spaces</button>
      <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground mb-1">Preview</p><pre className="whitespace-pre-wrap text-sm">{cleaned||"—"}</pre></div>
    </div>
  );
}
