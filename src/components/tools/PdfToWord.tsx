"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Download, AlertCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { Loader } from "@/components/ui/Loader";
import { downloadBlob, formatBytes } from "@/lib/utils";


async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");

  // Load PDF.js worker locally instead of CDN
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());

  const pdf = await pdfjs.getDocument({ data }).promise;

  const parts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const line = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");

    parts.push(line.trim());
  }

  return parts.filter(Boolean).join("\n\n");
}



function textToWordHtml(text: string, title: string) {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const escaped = escapeHtml(text).replace(/\n/g, "<br/>");
  const safeTitle = escapeHtml(title);

  return `<!DOCTYPE html>
  <html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:w="urn:schemas-microsoft-com:office:word">
  <head>
  <meta charset="utf-8"/>
  <title>${safeTitle}</title>
  <style>
  body {
    font-family: Calibri, Arial, sans-serif;
    font-size: 12pt;
    line-height: 1.5;
  }
  h1 { font-size: 16pt; }
  </style>
  </head>
  <body>
  <h1>${safeTitle}</h1>
  <p>${escaped}</p>
  </body>
  </html>`;
}


export function PdfToWord() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>("");

  const onFile = useCallback((f: File | null) => {
    setFile(f);
    setError(null);
    setPreview("");
  }, []);

  const convert = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const text = await extractPdfText(file);
      if (!text.trim()) {
        setError("No extractable text found. Scanned image PDFs need OCR (not supported in-browser).");
        return;
      }
      setPreview(text.slice(0, 2000) + (text.length > 2000 ? "…" : ""));
      const base = file.name.replace(/\.pdf$/i, "") || "document";
      const html = textToWordHtml(text, base);
      const blob = new Blob(["\ufeff", html], { type: "application/msword" });
      downloadBlob(blob, `${base}.doc`);
      toast("Word document downloaded (.doc)");
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        Converts <strong>text-based PDFs</strong> to an editable Word (.doc) file. Scanned or image-only PDFs cannot be converted without OCR. Layout, tables and images are simplified to text.
      </div>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload PDF</h2>
        {!file ? (
          <label className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/50 p-10 text-center hover:border-indigo-400 transition">
            <input
              type="file"
              accept="application/pdf"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
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
            <button type="button" onClick={() => onFile(null)} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Remove">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      {file && (
        <button
          type="button"
          onClick={convert}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? <Loader size="sm" label="Converting" /> : <><Download className="h-4 w-4" /> Convert to Word</>}
        </button>
      )}

      {error && (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" /><p>{error}</p>
        </div>
      )}

      {preview && (
        <section className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2">Text preview</h3>
          <pre className="max-h-48 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">{preview}</pre>
        </section>
      )}
    </div>
  );
}
