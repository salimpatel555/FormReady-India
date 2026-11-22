"use client";
import { useMemo, useState } from "react";

const BASES = {
  dec: { prefix: "", re: /^[0-9]+$/, label: "0-9" },
  bin: { prefix: "0b", re: /^[01]+$/, label: "0 and 1" },
  oct: { prefix: "0o", re: /^[0-7]+$/, label: "0-7" },
  hex: { prefix: "0x", re: /^[0-9a-fA-F]+$/, label: "0-9 and A-F" },
} as const;

type Base = keyof typeof BASES;

export function BinaryConverter() {
  const [value, setValue] = useState("42");
  const [from, setFrom] = useState<Base>("dec");

  const out = useMemo(() => {
    const v = value.trim().replace(/[\s_,]/g, "");
    if (!v) return { r: null, error: null as string | null };
    const base = BASES[from];
    if (!base.re.test(v)) {
      return { r: null, error: `Invalid input. Allowed digits for this base: ${base.label}.` };
    }
    try {
      // BigInt keeps full precision for very large values and rejects malformed input.
      const n = BigInt(base.prefix + v);
      return {
        r: { dec: n.toString(10), bin: n.toString(2), oct: n.toString(8), hex: n.toString(16).toUpperCase() },
        error: null as string | null,
      };
    } catch {
      return { r: null, error: "Could not convert this value." };
    }
  }, [value, from]);

  const r = out.r;
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Value</label><input value={value} onChange={e=>setValue(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"/></div>
        <div><label className="text-sm font-medium">From</label>
          <select value={from} onChange={e=>setFrom(e.target.value as Base)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option value="dec">Decimal</option><option value="bin">Binary</option><option value="oct">Octal</option><option value="hex">Hex</option>
          </select>
        </div>
      </div>
      {out.error && <p className="text-sm text-red-600" role="alert">{out.error}</p>}
      {r && <div className="grid sm:grid-cols-2 gap-3">{[["Decimal",r.dec],["Binary",r.bin],["Octal",r.oct],["Hex",r.hex]].map(([l,v])=>(
        <div key={l as string} className="rounded-xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{l}</p><p className="font-mono font-semibold break-all">{v}</p></div>
      ))}</div>}
    </div>
  );
}
