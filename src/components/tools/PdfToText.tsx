"use client";

import { useState } from "react";
import { Upload, FileText, Copy, Download, AlertCircle, X, Check } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { Loader } from "@/components/ui/Loader";
import { downloadBlob, formatBytes, isPdfFile } from "@/lib/utils";
import { loadPdfjs, pdfErrorMessage } from "@/lib/pdf-worker";

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const parts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    let line = "";
    for (const item of content.items) {
      if ("str" in item) {
        line += item.str + (item.hasEOL ? "\n" : " ");
      }
    }
    parts.push(`--- Page ${i} ---\n${line.replace(/[ \t]+\n/g, "\n").trim()}`);
  }
  return parts.join("\n\n");
}

export function PdfToText() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onFile = (f: File | null) => {
    setText("");
    setError(null);
    if (f && !isPdfFile(f)) {
      setFile(null);
      setError("Please upload a PDF file.");
      return;
    }
    setFile(f);
  };

  const convert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const extracted = await extractPdfText(file);
      if (!extracted.replace(/--- Page \d+ ---/g, "").trim()) {
        setError("No extractable text found. This may be a scanned PDF.");
        setText("");
        return;
      }
      setText(extracted);
      toast("Text extracted");
    } catch (e) {
      console.error(e);
      setError(pdfErrorMessage(e, "Extraction failed"));
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Could not copy. Select the text and copy manually.", "error");
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload PDF</h2>
        {!file ? (
          <label className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/50 p-10 text-center hover:border-indigo-400">
            <input type="file" accept="application/pdf,.pdf" className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => { onFile(e.target.files?.[0] || null); e.target.value = ""; }} />
            <Upload className="h-8 w-8 text-indigo-600" />
            <span className="font-medium">Drop a PDF or click to browse</span>
          </label>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
            <button type="button" onClick={() => onFile(null)} className="p-1 text-muted-foreground" aria-label="Remove">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      {file && (
        <button type="button" onClick={convert} disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60">
          {loading ? <Loader size="sm" label="Extracting" /> : "Extract text"}
        </button>
      )}

      {error && (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" /><p>{error}</p>
        </div>
      )}

      {text && (
        <section className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button type="button" onClick={() => downloadBlob(new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }), (file?.name || "pdf").replace(/\.pdf$/i, "") + ".txt")}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
              <Download className="h-4 w-4" /> Download .txt
            </button>
          </div>
          <textarea readOnly value={text} rows={16}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-mono text-foreground" />
        </section>
      )}
    </div>
  );
}
