"use client";
import { useState } from "react";
export function DiceRoller() {
  const [count, setCount] = useState(2);
  const [rolls, setRolls] = useState<number[]>([]);
  const roll = () => {
    const buf = new Uint32Array(count); crypto.getRandomValues(buf);
    setRolls(Array.from(buf, x => (x % 6) + 1));
  };
  return (
    <div className="space-y-6">
      <div><label className="text-sm font-medium">Dice: {count}</label><input type="range" min={1} max={10} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-full"/></div>
      <button type="button" onClick={roll} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">Roll</button>
      {rolls.length>0 && <div className="flex flex-wrap gap-3">{rolls.map((r,i)=><span key={i} className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card text-2xl font-bold">{r}</span>)}
        <span className="flex items-center text-sm text-muted-foreground">Sum: {rolls.reduce((a,b)=>a+b,0)}</span>
      </div>}
    </div>
  );
}
