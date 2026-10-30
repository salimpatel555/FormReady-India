"use client";
import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/Toast";
export function SlugGenerator() {
  const { toast } = useToast();
  const [title, setTitle] = useState("FormReady India Photo Resizer");
  const slug = useMemo(() => title.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""), [title]);
  return (
    <div className="space-y-4">
      <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"/>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4">
        <code className="flex-1 break-all font-mono text-indigo-600 dark:text-indigo-400">{slug||"—"}</code>
        <button type="button" onClick={()=>{navigator.clipboard.writeText(slug);toast("Copied");}} className="rounded-lg border border-border px-3 py-1 text-sm">Copy</button>
      </div>
    </div>
  );
}
