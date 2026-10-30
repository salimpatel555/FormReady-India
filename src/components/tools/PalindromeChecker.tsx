"use client";
import { useMemo, useState } from "react";
export function PalindromeChecker() {
  const [text, setText] = useState("level");
  const ok = useMemo(() => {
    const s = text.toLowerCase().replace(/[^a-z0-9]/g,"");
    if (!s) return null;
    return s === s.split("").reverse().join("");
  }, [text]);
  return (
    <div className="space-y-6">
      <input value={text} onChange={e=>setText(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Enter text or number"/>
      {ok !== null && <div className="rounded-2xl border border-border bg-card p-8 text-center text-2xl font-bold">{ok ? "Yes — palindrome" : "No — not a palindrome"}</div>}
    </div>
  );
}
