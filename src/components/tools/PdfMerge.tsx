"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, Loader2, Download, AlertCircle, GripVertical } from "lucide-react";
import { downloadBlob, formatBytes } from "@/lib/utils";

export function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const valid = Array.from(newFiles).filter((f) => f.type === "application/pdf");
    if (valid.length === 0) {
      setError("Please select PDF files only.");
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...valid].slice(0, 20));
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (from: number, to: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }

      const pdfBytes = await merged.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      downloadBlob(blob, `merged-${files.length}-files.pdf`);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to merge PDFs. One or more files may be password-protected or corrupted."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Add PDF Files</h2>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
          }}
          className="relative rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 text-center hover:border-indigo-400 transition"
        >
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="pointer-events-none flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-indigo-600" />
            <p className="font-medium text-foreground">Drop PDF files here or click to browse</p>
            <p className="text-sm text-muted-foreground">Up to 20 files · order matters</p>
          </div>
        </div>

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                <span className="text-muted-foreground font-mono text-xs w-5">{i + 1}</span>
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="flex-1 truncate">{f.name}</span>
                <span className="text-muted-foreground">{formatBytes(f.size)}</span>
                <div className="flex gap-1">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => moveFile(i, i - 1)}
                      className="p-1 text-muted-foreground hover:text-indigo-600"
                      title="Move up"
                    >
                      ↑
                    </button>
                  )}
                  {i < files.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveFile(i, i + 1)}
                      className="p-1 text-muted-foreground hover:text-indigo-600"
                      title="Move down"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="p-1 text-muted-foreground hover:text-red-600"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {files.length >= 2 && (
        <section className="rounded-xl border border-border bg-muted/50 p-6">
          <button
            type="button"
            onClick={mergePdfs}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Merging…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Merge {files.length} PDFs & Download
              </>
            )}
          </button>
        </section>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-sm text-red-800 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
