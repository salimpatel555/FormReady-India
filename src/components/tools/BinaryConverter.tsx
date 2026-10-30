"use client";
import { useMemo, useState } from "react";
export function BinaryConverter() {
  const [value, setValue] = useState("42");
  const [from, setFrom] = useState("dec");
  const r = useMemo(() => {
    try {
      let n = 0;
      if (from === "dec") n = parseInt(value, 10);
      else if (from === "bin") n = parseInt(value, 2);
      else if (from === "oct") n = parseInt(value, 8);
      else n = parseInt(value, 16);
      if (isNaN(n) || n < 0) return null;
      return { dec: n.toString(10), bin: n.toString(2), oct: n.toString(8), hex: n.toString(16).toUpperCase() };
    } catch { return null; }
  }, [value, from]);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Value</label><input value={value} onChange={e=>setValue(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"/></div>
        <div><label className="text-sm font-medium">From</label>
          <select value={from} onChange={e=>setFrom(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option value="dec">Decimal</option><option value="bin">Binary</option><option value="oct">Octal</option><option value="hex">Hex</option>
          </select>
        </div>
      </div>
      {r && <div className="grid sm:grid-cols-2 gap-3">{[["Decimal",r.dec],["Binary",r.bin],["Octal",r.oct],["Hex",r.hex]].map(([l,v])=>(
        <div key={l as string} className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{l}</p><p className="font-mono font-semibold break-all">{v}</p></div>
      ))}</div>}
    </div>
  );
}
