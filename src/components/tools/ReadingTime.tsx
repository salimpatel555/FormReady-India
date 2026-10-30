"use client";
import { useMemo, useState } from "react";
export function ReadingTime() {
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(200);
  const r = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const mins = words / wpm;
    return { words, mins };
  }, [text, wpm]);
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={8} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm" placeholder="Paste article or essay"/>
      <div><label className="text-sm font-medium">Reading speed: {wpm} WPM</label><input type="range" min={100} max={400} value={wpm} onChange={e=>setWpm(Number(e.target.value))} className="w-full"/></div>
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">{r.words} words</p>
        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{r.mins < 1 ? "< 1 min" : `${r.mins.toFixed(1)} min`}</p>
      </div>
    </div>
  );
}
