"use client";
import { useState } from "react";
export function CoinFlip() {
  const [side, setSide] = useState<string | null>(null);
  return (
    <div className="space-y-6 text-center">
      <button type="button" onClick={()=>setSide(Math.random()<0.5?"Heads":"Tails")} className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">Flip coin</button>
      {side && <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{side}</p>}
    </div>
  );
}
