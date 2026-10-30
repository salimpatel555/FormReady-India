"use client";

import { useMemo, useState } from "react";

export function GstCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r) || a < 0 || r < 0) return null;
    if (mode === "exclusive") {
      const gst = (a * r) / 100;
      return { base: a, gst, total: a + gst };
    }
    const base = a / (1 + r / 100);
    const gst = a - base;
    return { base, gst, total: a };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["exclusive", "inclusive"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${mode === m ? "bg-indigo-600 text-white" : "border border-border bg-card text-muted-foreground"}`}>
            {m === "exclusive" ? "Add GST" : "Remove GST"}
          </button>
        ))}
      </div>
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GST rate (%)</label>
          <select value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
            {["0", "5", "12", "18", "28"].map((r) => (
              <option key={r} value={r}>{r}%</option>
            ))}
          </select>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Custom rate" />
        </div>
      </section>
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            ["Base amount", result.base],
            ["GST", result.gst],
            ["Total", result.total],
          ].map(([label, val]) => (
            <div key={label as string} className="rounded-xl border border-border bg-card p-5 text-center">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹{Number(val).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
