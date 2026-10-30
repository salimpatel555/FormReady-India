"use client";
import { useMemo, useState } from "react";
export function SleepCycles() {
  const [wake, setWake] = useState("06:30");
  const beds = useMemo(() => {
    const [h,m] = wake.split(":").map(Number);
    if(isNaN(h)||isNaN(m)) return [];
    const wakeMin = h*60+m;
    const out: string[] = [];
    for (let cycles=6; cycles>=3; cycles--) {
      let bed = wakeMin - cycles*90 - 15; // 15 min fall asleep
      if (bed < 0) bed += 24*60;
      const hh = Math.floor(bed/60)%24, mm = bed%60;
      out.push(`${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")} (${cycles} cycles)`);
    }
    return out;
  }, [wake]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Wake-up time</label><input type="time" value={wake} onChange={e=>setWake(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      <ul className="space-y-2">{beds.map(b=><li key={b} className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium">{b}</li>)}</ul>
      <p className="text-xs text-muted-foreground">Assumes ~90-minute cycles + 15 minutes to fall asleep. Approximate only.</p>
    </div>
  );
}
