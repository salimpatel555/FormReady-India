"use client";
import { useMemo, useState } from "react";
export function HoursConverter() {
  const [hours, setHours] = useState("2.5");
  const r = useMemo(() => {
    const h = parseFloat(hours); if (isNaN(h)) return null;
    const totalMin = h * 60;
    const totalSec = h * 3600;
    const hh = Math.floor(h);
    const mm = Math.floor((h - hh) * 60);
    const ss = Math.round((((h - hh) * 60) - mm) * 60);
    return { totalMin, totalSec, pretty: `${hh}h ${mm}m ${ss}s` };
  }, [hours]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Hours</label><input type="number" step="0.01" value={hours} onChange={e=>setHours(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      {r && <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground">Minutes</p><p className="text-xl font-bold">{r.totalMin.toFixed(1)}</p></div>
        <div className="rounded-xl border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground">Seconds</p><p className="text-xl font-bold">{r.totalSec.toFixed(0)}</p></div>
        <div className="rounded-xl border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground">Breakdown</p><p className="text-xl font-bold">{r.pretty}</p></div>
      </div>}
    </div>
  );
}
