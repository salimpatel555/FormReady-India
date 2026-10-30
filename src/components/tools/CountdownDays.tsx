"use client";
import { useMemo, useState } from "react";
export function CountdownDays() {
  const [date, setDate] = useState("2026-12-31");
  const days = useMemo(() => {
    const t = new Date(date+"T00:00:00");
    if(isNaN(t.getTime())) return null;
    const now = new Date(); now.setHours(0,0,0,0);
    return Math.ceil((t.getTime()-now.getTime())/86400000);
  }, [date]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Target date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      {days!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{days}</p><p className="text-sm text-muted-foreground mt-2">{days>=0?"days remaining":"days ago"}</p></div>}
    </div>
  );
}
