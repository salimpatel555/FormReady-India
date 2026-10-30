"use client";
import { useMemo, useState } from "react";
const map: [number,string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
function toRoman(n: number) {
  if (n < 1 || n > 3999) return "";
  let s = "";
  for (const [v, sym] of map) { while (n >= v) { s += sym; n -= v; } }
  return s;
}
export function RomanNumerals() {
  const [n, setN] = useState("2024");
  const roman = useMemo(() => { const x = parseInt(n,10); return isNaN(x)?"":toRoman(x); }, [n]);
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Number (1–3999)</label><input type="number" value={n} onChange={e=>setN(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">Roman</p><p className="text-4xl font-bold tracking-wide mt-2">{roman||"—"}</p></div>
    </div>
  );
}
