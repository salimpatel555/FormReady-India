"use client";
import { useMemo, useState } from "react";
export function HtmlStripper() {
  const [html, setHtml] = useState("<p>Hello <b>world</b></p>");
  const text = useMemo(() => html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(), [html]);
  return (
    <div className="space-y-4">
      <textarea value={html} onChange={e=>setHtml(e.target.value)} rows={5} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-mono"/>
      <textarea readOnly value={text} rows={4} className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm"/>
    </div>
  );
}
