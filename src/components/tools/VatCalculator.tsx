"use client";
import { useMemo, useState } from "react";
export function VatCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("20");
  const [mode, setMode] = useState<"add"|"extract">("add");
  const r = useMemo(() => {
    const a=parseFloat(amount), rateN=parseFloat(rate);
    if(isNaN(a)||isNaN(rateN)) return null;
    if(mode==="add"){ const vat=a*rateN/100; return { net:a, vat, gross:a+vat }; }
    const net=a/(1+rateN/100); return { net, vat:a-net, gross:a };
  }, [amount,rate,mode]);
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button type="button" onClick={()=>setMode("add")} className={`rounded-full px-3 py-1 text-sm ${mode==="add"?"bg-indigo-600 text-white":"border border-border"}`}>Add VAT</button>
        <button type="button" onClick={()=>setMode("extract")} className={`rounded-full px-3 py-1 text-sm ${mode==="extract"?"bg-indigo-600 text-white":"border border-border"}`}>Extract VAT</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium">Amount</label><input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
        <div><label className="text-sm font-medium">VAT %</label><input type="number" value={rate} onChange={e=>setRate(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>
      </div>
      {r && <div className="grid sm:grid-cols-3 gap-3">{[["Net",r.net],["VAT",r.vat],["Gross",r.gross]].map(([l,v])=>(
        <div key={l as string} className="rounded-xl border border-border bg-card p-4 text-center"><p className="text-xs text-muted-foreground">{l}</p><p className="text-xl font-bold">{Number(v).toFixed(2)}</p></div>
      ))}</div>}
    </div>
  );
}
