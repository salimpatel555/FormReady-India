"use client";
import { useMemo, useState } from "react";
export function NameInitials() {
  const [name, setName] = useState("Rahul Kumar Sharma");
  const initials = useMemo(() => name.trim().split(/\s+/).filter(Boolean).map(p=>p[0]?.toUpperCase()||"").join(""), [name]);
  return (
    <div className="space-y-6">
      <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/>
      <div className="rounded-2xl border border-border bg-card p-8 text-center"><p className="text-5xl font-bold tracking-widest text-indigo-600 dark:text-indigo-400">{initials||"—"}</p></div>
    </div>
  );
}
