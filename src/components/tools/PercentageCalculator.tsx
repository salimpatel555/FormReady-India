"use client";

import { useMemo, useState } from "react";

export function PercentageCalculator() {
  const [mode, setMode] = useState<"of" | "change" | "what">("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const result = useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return null;
    if (mode === "of") return { label: `${x}% of ${y}`, value: (x / 100) * y };
    if (mode === "change") {
      if (x === 0) return null;
      return { label: `Change from ${x} to ${y}`, value: ((y - x) / x) * 100, suffix: "%" };
    }
    if (y === 0) return null;
    return { label: `${x} is what % of ${y}`, value: (x / y) * 100, suffix: "%" };
  }, [a, b, mode]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {([
          ["of", "X% of Y"],
          ["change", "% change"],
          ["what", "X is what % of Y"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              mode === id
                ? "bg-indigo-600 text-white"
                : "border border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {mode === "of" ? "Percentage (X)" : mode === "change" ? "Original value" : "Value (X)"}
            </label>
            <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" placeholder="e.g. 25" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {mode === "of" ? "Number (Y)" : mode === "change" ? "New value" : "Total (Y)"}
            </label>
            <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" placeholder="e.g. 400" />
          </div>
        </div>
      </section>

      {result && (
        <section className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">{result.label}</p>
          <p className="mt-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            {Number.isFinite(result.value)
              ? `${result.value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}${result.suffix || ""}`
              : "—"}
          </p>
        </section>
      )}
    </div>
  );
}
