"use client";

import { useMemo, useState } from "react";

export function DateDifference() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(today);

  const result = useMemo(() => {
    if (!from || !to) return null;
    const a = new Date(from + "T00:00:00");
    const b = new Date(to + "T00:00:00");
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;
    const ms = Math.abs(b.getTime() - a.getTime());
    const days = Math.floor(ms / 86400000);
    const weeks = Math.floor(days / 7);
    const monthsApprox = Math.floor(days / 30.44);
    const yearsApprox = Math.floor(days / 365.25);
    return { days, weeks, monthsApprox, yearsApprox };
  }, [from, to]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From date</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To date</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
      </section>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ["Days", result.days],
            ["Weeks", result.weeks],
            ["~Months", result.monthsApprox],
            ["~Years", result.yearsApprox],
          ].map(([label, val]) => (
            <div key={label as string} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{Number(val).toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
