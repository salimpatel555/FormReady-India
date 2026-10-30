"use client";

import { useMemo, useState } from "react";

export function FuelCost() {
  const [distance, setDistance] = useState("250");
  const [mileage, setMileage] = useState("18");
  const [price, setPrice] = useState("100");

  const result = useMemo(() => {
    const d = parseFloat(distance);
    const m = parseFloat(mileage);
    const p = parseFloat(price);
    if ([d, m, p].some((x) => isNaN(x) || x <= 0)) return null;
    const litres = d / m;
    return { litres, cost: litres * p };
  }, [distance, mileage, price]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Distance (km)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mileage (km/l)</label>
          <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fuel price (₹/l)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
      </section>
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Fuel needed</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{result.litres.toFixed(2)} L</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Estimated cost</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{result.cost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
      )}
    </div>
  );
}
