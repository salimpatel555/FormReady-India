"use client";

import { useMemo, useState } from "react";

export function DiscountCalculator() {
  const [price, setPrice] = useState("1999");
  const [discount, setDiscount] = useState("20");

  const result = useMemo(() => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (isNaN(p) || isNaN(d) || p < 0 || d < 0) return null;
    const save = (p * d) / 100;
    return { save, final: p - save };
  }, [price, discount]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Original price (₹)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
        </div>
      </section>
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">You save</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">₹{result.save.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Final price</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{result.final.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      )}
    </div>
  );
}
