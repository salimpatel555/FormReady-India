"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Copy, RefreshCw, Check } from "lucide-react";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMS = "0123456789";
const SYMBOLS = "!@#$%^&*-_=+";

export function PasswordGenerator() {
  const { toast } = useToast();
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useNums, setUseNums] = useState(true);
  const [useSyms, setUseSyms] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = LOWER;
    if (useUpper) chars += UPPER;
    if (useNums) chars += NUMS;
    if (useSyms) chars += SYMBOLS;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let out = "";
    for (let i = 0; i < length; i++) out += chars[arr[i] % chars.length];
    setPassword(out);
    setCopied(false);
  }, [length, useUpper, useNums, useSyms]);

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast("Password copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Length: {length}</label>
          <input type="range" min={6} max={32} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> Uppercase</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={useNums} onChange={(e) => setUseNums(e.target.checked)} /> Numbers</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={useSyms} onChange={(e) => setUseSyms(e.target.checked)} /> Symbols</label>
        </div>
        <button type="button" onClick={generate} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
          <RefreshCw className="h-4 w-4" /> Generate
        </button>
      </section>
      {password && (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <code className="flex-1 break-all text-lg font-mono font-semibold text-foreground">{password}</code>
          <button type="button" onClick={copy} className="rounded-lg border border-border p-2 hover:bg-muted" aria-label="Copy">
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      )}
    </div>
  );
}
