"use client";
import { useMemo, useState } from "react";
export function ColorConverter() {
  const [hex, setHex] = useState("#4F46E5");
  const rgb = useMemo(() => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
    if (!m) return null;
    return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
  }, [hex]);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[160px]"><label className="text-sm font-medium">HEX</label><input value={hex} onChange={e=>setHex(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"/></div>
        <div className="h-12 w-12 rounded-lg border border-border shadow-inner" style={{ background: rgb ? `rgb(${rgb.r},${rgb.g},${rgb.b})` : "transparent" }} />
      </div>
      {rgb && <div className="rounded-xl border border-border bg-card p-6 text-center"><p className="text-sm text-muted-foreground">RGB</p><p className="text-2xl font-bold font-mono mt-2">rgb({rgb.r}, {rgb.g}, {rgb.b})</p></div>}
    </div>
  );
}
