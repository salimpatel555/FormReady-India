"use client";
import { useMemo, useState } from "react";
export function InrFormatter() {
  const [n, setN] = useState("1234567.89");
  const formatted = useMemo(() => {
    const x = parseFloat(n.replace(/,/g,""));
    if (isNaN(x)) return "";
    return x.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }, [n]);
  return (
    <div className="space-y-6">
      <input value={n} onChange={e=>setN(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"/>
      <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-3xl font-bold font-mono">₹{formatted||"—"}</p></div>
    </div>
  );
}
