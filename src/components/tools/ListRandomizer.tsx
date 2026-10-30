"use client";
import { useState } from "react";
export function ListRandomizer() {
  const [text, setText] = useState("Apple\nBanana\nCherry\nDate\nElderberry");
  const [out, setOut] = useState("");
  const shuffle = () => {
    const items = text.split("\n").map(s=>s.trim()).filter(Boolean);
    for (let i=items.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [items[i],items[j]]=[items[j],items[i]]; }
    setOut(items.join("\n"));
  };
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="One item per line"/>
      <button type="button" onClick={shuffle} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Shuffle</button>
      <textarea readOnly value={out} rows={6} className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm" placeholder="Shuffled list"/>
    </div>
  );
}
