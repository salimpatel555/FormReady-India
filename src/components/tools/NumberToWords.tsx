"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { Copy, Check } from "lucide-react";

const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const MAX = 999999999;

function twoDigits(n: number): string {
  if (n < 20) return ones[n];
  return `${tens[Math.floor(n / 10)]}${n % 10 ? " " + ones[n % 10] : ""}`;
}

function threeDigits(n: number): string {
  if (n < 100) return twoDigits(n);
  return `${ones[Math.floor(n / 100)]} Hundred${n % 100 ? " " + twoDigits(n % 100) : ""}`;
}

/** Indian numbering: crore / lakh / thousand. Expects 0 <= num <= MAX. */
function toIndianWords(num: number): string {
  if (num === 0) return "Zero";
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const rest = num % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  return parts.join(" ");
}

export function NumberToWords() {
  const { toast } = useToast();
  const [value, setValue] = useState("125000");
  const [copied, setCopied] = useState(false);

  const { words, error } = useMemo(() => {
    const cleaned = value.replace(/[,\s]/g, "");
    if (!cleaned) return { words: "", error: "" };
    if (!/^\d+$/.test(cleaned)) {
      return { words: "", error: "Enter a whole number using digits only (no decimals or letters)." };
    }
    const n = Number(cleaned);
    if (n > MAX) {
      return { words: "", error: "Enter a number between 0 and 99,99,99,999." };
    }
    return { words: toIndianWords(n) + " Only", error: "" };
  }, [value]);

  const copy = async () => {
    if (!words) return;
    try {
      await navigator.clipboard.writeText(words);
      setCopied(true);
      toast("Copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast("Could not copy. Select the text and copy manually.", "error");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Converts numbers using the Indian system (Thousand / Lakh / Crore). Handy for forms and cheques.</p>
      <div>
        <label className="block text-sm font-medium mb-1">Number</label>
        <input type="text" inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" placeholder="e.g. 125000" />
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {words && (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <p className="flex-1 text-lg font-semibold text-foreground leading-relaxed">{words}</p>
          <button type="button" onClick={copy} className="rounded-lg border border-border p-2 hover:bg-muted" aria-label="Copy">
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      )}
    </div>
  );
}
