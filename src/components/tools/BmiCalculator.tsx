"use client";

import { useMemo, useState } from "react";

export function BmiCalculator() {
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");

  const result = useMemo(() => {
    const h = parseFloat(cm) / 100;
    const w = parseFloat(kg);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const bmi = w / (h * h);
    let category = "Normal";
    let color = "text-emerald-600 dark:text-emerald-400";
    if (bmi < 18.5) { category = "Underweight"; color = "text-amber-600 dark:text-amber-400"; }
    else if (bmi < 25) { category = "Normal"; color = "text-emerald-600 dark:text-emerald-400"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-orange-600 dark:text-orange-400"; }
    else { category = "Obese"; color = "text-red-600 dark:text-red-400"; }
    return { bmi, category, color };
  }, [cm, kg]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <input type="number" value={cm} onChange={(e) => setCm(e.target.value)} placeholder="170" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <input type="number" value={kg} onChange={(e) => setKg(e.target.value)} placeholder="65" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
      </section>
      {result && (
        <section className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">Your BMI</p>
          <p className={`mt-2 text-5xl font-bold ${result.color}`}>{result.bmi.toFixed(1)}</p>
          <p className={`mt-2 text-lg font-semibold ${result.color}`}>{result.category}</p>
          <p className="mt-4 text-xs text-muted-foreground">WHO categories for adults. Not medical advice.</p>
        </section>
      )}
    </div>
  );
}
