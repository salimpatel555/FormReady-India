"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
export function Base64Tool() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); toast("Encoded"); } catch { toast("Encode failed","error"); } };
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input)))); toast("Decoded"); } catch { toast("Invalid Base64","error"); } };
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={5} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-mono" placeholder="Input"/>
      <div className="flex gap-2">
        <button type="button" onClick={encode} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Encode</button>
        <button type="button" onClick={decode} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold">Decode</button>
      </div>
      <textarea readOnly value={output} rows={5} className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-mono" placeholder="Output"/>
    </div>
  );
}
