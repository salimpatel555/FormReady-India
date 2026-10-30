"use client";
import { useMemo, useState } from "react";
export function EmailMasker() {
  const [email, setEmail] = useState("student@example.com");
  const masked = useMemo(() => {
    const [u,d] = email.split("@");
    if(!u||!d) return "";
    const mu = u.length<=2 ? u[0]+"*" : u[0]+"***"+u[u.length-1];
    return mu+"@"+d;
  }, [email]);
  return (
    <div className="space-y-6">
      <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/>
      <div className="rounded-2xl border border-border bg-card p-6 text-center font-mono text-lg">{masked||"—"}</div>
    </div>
  );
}
