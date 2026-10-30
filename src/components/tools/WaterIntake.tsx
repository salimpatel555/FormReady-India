"use client";
import { useMemo, useState } from "react";
export function WaterIntake() {
  const [kg, setKg] = useState("70");
  const liters = useMemo(() => { const w=parseFloat(kg); return isNaN(w)?null: w*0.033; }, [kg]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Weight (kg)</label><input type="number" value={kg} onChange={e=>setKg(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      {liters!==null && <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">Suggested daily water</p><p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{liters.toFixed(2)} L</p><p className="text-xs text-muted-foreground mt-2">Rough guide only (~33 ml per kg).</p></div>}
    </div>
  );
}
