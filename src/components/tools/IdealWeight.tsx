"use client";
import { useMemo, useState } from "react";
export function IdealWeight() {
  const [cm, setCm] = useState("170");
  const [gender, setGender] = useState<"m"|"f">("m");
  const r = useMemo(() => {
    const h = parseFloat(cm); if (isNaN(h)||h<100) return null;
    const inches = h / 2.54;
    // Devine formula
    const base = gender==="m" ? 50 + 2.3*(inches-60) : 45.5 + 2.3*(inches-60);
    return { ideal: base, low: base*0.9, high: base*1.1 };
  }, [cm, gender]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Height (cm)</label><input type="number" value={cm} onChange={e=>setCm(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">Gender (formula)</label>
          <select value={gender} onChange={e=>setGender(e.target.value as "m"|"f")} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option value="m">Male</option><option value="f">Female</option>
          </select>
        </div>
      </div>
      {r && <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Estimated ideal weight (Devine)</p>
        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{r.ideal.toFixed(1)} kg</p>
        <p className="mt-2 text-sm text-muted-foreground">Range ~ {r.low.toFixed(1)} – {r.high.toFixed(1)} kg. Not medical advice.</p>
      </div>}
    </div>
  );
}
