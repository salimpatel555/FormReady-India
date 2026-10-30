"use client";

import { useState, useCallback, useEffect } from "react";
import { Upload, X, FileText, Loader2, Download, AlertCircle, Image as ImageIcon } from "lucide-react";
import { downloadBlob, formatBytes, cn } from "@/lib/utils";

interface PageImage {
  pageNum: number;
  dataUrl: string;
  width: number;
  height: number;
}

export function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(2); // 2 = ~144-150 DPI equivalent for screen, higher = better quality
  const [format, setFormat] = useState<"image/png" | "image/jpeg">("image/png");
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      pages.forEach((p) => {
        if (p.dataUrl.startsWith("blob:")) URL.revokeObjectURL(p.dataUrl);
      });
    };
  }, [pages]);

  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    if (f.size > 30 * 1024 * 1024) {
      setError("PDF is too large. Maximum 30 MB.");
      return;
    }
    setError(null);
    setFile(f);
    setPages([]);
    setSelectedPages(new Set());
    setProgress(0);
  }, []);

  const convertPdf = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setPages([]);
    setProgress(0);

    try {
      // Dynamic import – keeps initial bundle smaller
      const pdfjs = await import("pdfjs-dist");

      // Use the worker from the same version (CDN for reliability in browser)
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      if (numPages > 50) {
        throw new Error("This PDF has more than 50 pages. Please use a smaller document.");
      }

      const results: PageImage[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported");

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        const dataUrl = canvas.toDataURL(format, format === "image/jpeg" ? 0.92 : undefined);

        results.push({
          pageNum: i,
          dataUrl,
          width: Math.round(viewport.width),
          height: Math.round(viewport.height),
        });

        setProgress(Math.round((i / numPages) * 100));
      }

      setPages(results);
      setSelectedPages(new Set(results.map((r) => r.pageNum)));
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to convert PDF. The file may be corrupted or password-protected."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePage = (pageNum: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) next.delete(pageNum);
      else next.add(pageNum);
      return next;
    });
  };

  const downloadPage = (page: PageImage) => {
    const ext = format === "image/png" ? "png" : "jpg";
    fetch(page.dataUrl)
      .then((r) => r.blob())
      .then((blob) => {
        downloadBlob(blob, `page-${page.pageNum}.${ext}`);
      });
  };

  const downloadSelected = async () => {
    const selected = pages.filter((p) => selectedPages.has(p.pageNum));
    if (selected.length === 0) return;

    const ext = format === "image/png" ? "png" : "jpg";

    // Download one by one with a small delay to avoid browser blocking
    for (const page of selected) {
      const blob = await fetch(page.dataUrl).then((r) => r.blob());
      downloadBlob(blob, `page-${page.pageNum}.${ext}`);
      await new Promise((r) => setTimeout(r, 300));
    }
  };

  const handleClear = () => {
    setFile(null);
    setPages([]);
    setSelectedPages(new Set());
    setError(null);
    setProgress(0);
  };

  return (
    <div className="space-y-8">
      {/* Upload */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload PDF</h2>
        {!file ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            className="relative rounded-xl border-2 border-dashed border-border bg-muted/50 p-10 text-center hover:border-indigo-400 transition"
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="pointer-events-none flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-indigo-600" />
              <p className="font-medium text-foreground">Drop a PDF here or click to browse</p>
              <p className="text-sm text-muted-foreground">Max 30 MB · up to 50 pages</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <FileText className="h-8 w-8 text-indigo-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-muted-foreground hover:text-red-600"
              aria-label="Remove"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </section>

      {/* Settings */}
      {file && pages.length === 0 && !loading && (
        <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">2. Conversion Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/90 mb-1">
                Quality / Resolution
              </label>
              <select
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              >
                <option value={1}>Standard (faster)</option>
                <option value={1.5}>Good</option>
                <option value={2}>High (recommended)</option>
                <option value={2.5}>Very High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/90 mb-1">
                Output format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as "image/png" | "image/jpeg")}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              >
                <option value="image/png">PNG (lossless)</option>
                <option value="image/jpeg">JPEG (smaller)</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={convertPdf}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Convert to Images
          </button>
        </section>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-indigo-600" />
          <p className="mt-3 font-medium text-foreground">Converting pages…</p>
          <div className="mx-auto mt-4 h-2 w-64 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-sm text-red-800 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Results */}
      {pages.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              3. Results ({pages.length} page{pages.length > 1 ? "s" : ""})
            </h2>
            <button
              type="button"
              onClick={downloadSelected}
              disabled={selectedPages.size === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Download selected ({selectedPages.size})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <div
                key={page.pageNum}
                className={cn(
                  "rounded-xl border bg-card overflow-hidden transition",
                  selectedPages.has(page.pageNum)
                    ? "border-indigo-400 ring-2 ring-indigo-100"
                    : "border-border"
                )}
              >
                <div className="relative aspect-[3/4] bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.dataUrl}
                    alt={`Page ${page.pageNum}`}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPages.has(page.pageNum)}
                      onChange={() => togglePage(page.pageNum)}
                      className="rounded border-border text-indigo-600 focus:ring-indigo-500"
                    />
                    Page {page.pageNum}
                  </label>
                  <button
                    type="button"
                    onClick={() => downloadPage(page)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
                  </button>
                </div>
                <p className="px-3 pb-3 text-xs text-muted-foreground">
                  {page.width} × {page.height} px
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
