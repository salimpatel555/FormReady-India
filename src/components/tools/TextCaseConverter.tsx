"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Copy, Check } from "lucide-react";

export function TextCaseConverter() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const transforms: { label: string; fn: (s: string) => string }[] = [
    { label: "UPPER CASE", fn: (s) => s.toUpperCase() },
    { label: "lower case", fn: (s) => s.toLowerCase() },
    { label: "Title Case", fn: (s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
    { label: "Sentence case", fn: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()) },
  ];

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast("Copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Type or paste text…"
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {transforms.map((t) => {
          const out = text ? t.fn(text) : "";
          return (
            <div key={t.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.label}</span>
                <button type="button" disabled={!out} onClick={() => copy(out)} className="p-1 text-muted-foreground hover:text-indigo-600 disabled:opacity-40" aria-label="Copy">
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-sm text-foreground break-words min-h-[2.5rem]">{out || "—"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
