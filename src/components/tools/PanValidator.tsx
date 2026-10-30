"use client";
import { useMemo, useState } from "react";
export function PanValidator() {
  const [pan, setPan] = useState("");
  const ok = useMemo(() => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase().trim()), [pan]);
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Checks format only (AAAAA9999A). Does not verify with the Income Tax Department.</p>
      <input value={pan} onChange={e=>setPan(e.target.value.toUpperCase())} maxLength={10} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono uppercase" placeholder="ABCDE1234F"/>
      {pan.length>0 && <div className="rounded-2xl border border-border bg-card p-6 text-center text-xl font-bold">{ok ? "Valid format" : "Invalid format"}</div>}
    </div>
  );
}
