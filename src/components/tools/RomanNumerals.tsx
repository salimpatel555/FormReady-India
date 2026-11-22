"use client";
import { useMemo, useState } from "react";

const map: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
const ROMAN_RE = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

function toRoman(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return "";
  let s = "";
  for (const [v, sym] of map) { while (n >= v) { s += sym; n -= v; } }
  return s;
}

function fromRoman(input: string): number | null {
  const s = input.trim().toUpperCase();
  if (!s || !ROMAN_RE.test(s)) return null;
  let total = 0;
  let i = 0;
  for (const [v, sym] of map) {
    while (s.startsWith(sym, i)) { total += v; i += sym.length; }
  }
  return i === s.length ? total : null;
}

export function RomanNumerals() {
  const [mode, setMode] = useState<"toRoman" | "toNumber">("toRoman");
  const [n, setN] = useState("2024");
  const [r, setR] = useState("MMXXIV");

  const roman = useMemo(() => {
    if (!/^\d+$/.test(n.trim())) return "";
    return toRoman(parseInt(n, 10));
  }, [n]);
  const number = useMemo(() => fromRoman(r), [r]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {([["toRoman", "Number \u2192 Roman"], ["toNumber", "Roman \u2192 Number"]] as const).map(([id, label]) => (
          <button key={id} type="button" onClick={() => setMode(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${mode === id ? "bg-indigo-600 text-white" : "border border-border bg-card text-muted-foreground hover:bg-muted"}`}>
            {label}
          </button>
        ))}
      </div>

      {mode === "toRoman" ? (
        <>
          <div><label className="text-sm font-medium">Number (1–3999)</label><input type="number" min={1} max={3999} value={n} onChange={e=>setN(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">Roman</p><p className="text-4xl font-bold tracking-wide mt-2">{roman||"\u2014"}</p></div>
          {n.trim() && !roman && <p className="text-sm text-red-600" role="alert">Enter a whole number from 1 to 3999.</p>}
        </>
      ) : (
        <>
          <div><label className="text-sm font-medium">Roman numeral</label><input value={r} onChange={e=>setR(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono uppercase"/></div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-sm text-muted-foreground">Number</p><p className="text-4xl font-bold tracking-wide mt-2">{number ?? "\u2014"}</p></div>
          {r.trim() && number === null && <p className="text-sm text-red-600" role="alert">Not a valid Roman numeral (use I, V, X, L, C, D, M; max MMMCMXCIX).</p>}
        </>
      )}
    </div>
  );
}
