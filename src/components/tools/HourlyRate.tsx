"use client";
import { useMemo, useState } from "react";
export function HourlyRate() {
  const [monthly, setMonthly] = useState("50000");
  const [hours, setHours] = useState("160");
  const r = useMemo(() => {
    const m=parseFloat(monthly), h=parseFloat(hours);
    if(isNaN(m)||isNaN(h)||h===0) return null;
    return m/h;
  }, [monthly,hours]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Monthly salary (₹)</label><input type="number" value={monthly} onChange={e=>setMonthly(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Hours / month</label><input type="number" value={hours} onChange={e=>setHours(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">Hourly rate</p><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">₹{r.toLocaleString("en-IN",{maximumFractionDigits:2})}</p></div>}
    </div>
  );
}
