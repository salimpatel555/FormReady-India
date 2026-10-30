"use client";
import { useMemo, useState } from "react";
export function DayOfWeek() {
  const [date, setDate] = useState("2026-01-26");
  const day = useMemo(() => {
    const d = new Date(date+"T00:00:00");
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }, [date]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      {day && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{day}</p></div>}
    </div>
  );
}
