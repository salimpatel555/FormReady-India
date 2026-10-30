"use client";
import { useMemo, useState } from "react";
export function LeapYearChecker() {
  const [year, setYear] = useState("2024");
  const isLeap = useMemo(() => {
    const y = parseInt(year,10); if (isNaN(y)) return null;
    return (y%4===0 && y%100!==0) || y%400===0;
  }, [year]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Year</label><input type="number" value={year} onChange={e=>setYear(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      {isLeap!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-3xl font-bold">{isLeap ? "Leap year ✓" : "Not a leap year"}</p></div>}
    </div>
  );
}
