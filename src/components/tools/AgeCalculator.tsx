"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { todayLocalISO } from "@/lib/utils";

function calcAge(dob: string, asOf: string) {
  const birth = new Date(dob + "T00:00:00");
  const end = new Date(asOf + "T00:00:00");
  if (isNaN(birth.getTime()) || isNaN(end.getTime()) || end < birth) return null;

  let years = end.getFullYear() - birth.getFullYear();
  let months = end.getMonth() - birth.getMonth();
  let days = end.getDate() - birth.getDate();

  // Borrow days from previous months until non-negative (handles month-end dates like 31 Jan -> 1 Mar).
  let borrowYear = end.getFullYear();
  let borrowMonth = end.getMonth();
  while (days < 0) {
    months -= 1;
    borrowMonth -= 1;
    if (borrowMonth < 0) {
      borrowMonth = 11;
      borrowYear -= 1;
    }
    days += new Date(borrowYear, borrowMonth + 1, 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalDays = Math.round((end.getTime() - birth.getTime()) / 86400000);
  return { years, months, days, totalDays };
}

export function AgeCalculator() {
  const [dob, setDob] = useState("");
  // Set after mount (local date) to avoid a server/client hydration mismatch and UTC off-by-one.
  const [asOf, setAsOf] = useState("");
  useEffect(() => {
    setAsOf(todayLocalISO());
  }, []);

  const result = useMemo(() => (dob && asOf ? calcAge(dob, asOf) : null), [dob, asOf]);
  const invalidRange = dob && asOf && !result;

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Date of birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Age as on (exam date)</label>
            <input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          Use the cut-off date from the official notification for eligibility checks.
        </p>
        {invalidRange && (
          <p className="text-sm text-red-600" role="alert">
            The “age as on” date must be on or after the date of birth.
          </p>
        )}
      </section>

      {result && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Result</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-indigo-500/10 p-4">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result.years}</p>
              <p className="text-xs font-medium text-muted-foreground mt-1">Years</p>
            </div>
            <div className="rounded-xl bg-violet-500/10 p-4">
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{result.months}</p>
              <p className="text-xs font-medium text-muted-foreground mt-1">Months</p>
            </div>
            <div className="rounded-xl bg-fuchsia-500/10 p-4">
              <p className="text-3xl font-bold text-fuchsia-600 dark:text-fuchsia-400">{result.days}</p>
              <p className="text-xs font-medium text-muted-foreground mt-1">Days</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Total days: <strong className="text-foreground">{result.totalDays.toLocaleString("en-IN")}</strong>
          </p>
        </section>
      )}
    </div>
  );
}
