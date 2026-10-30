"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, Loader2, Download, AlertCircle } from "lucide-react";
import { downloadBlob, formatBytes, cn } from "@/lib/utils";

export function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "fit">("a4");

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const valid = Array.from(newFiles).filter((f) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)
    );
    if (valid.length === 0) {
      setError("Please select JPG, PNG or WebP images.");
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...valid].slice(0, 20)); // max 20 images
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const generatePdf = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      // Dynamic import to keep initial bundle smaller
      const { jsPDF } = await import("jspdf");

      let pdf: InstanceType<typeof jsPDF> | null = null;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = dataUrl;
        });

        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        if (pageSize === "fit") {
          // One page per image, sized to the image (in mm, assuming 96 DPI for simplicity)
          const mmW = (imgW * 25.4) / 96;
          const mmH = (imgH * 25.4) / 96;
          const orientation = mmW > mmH ? "l" : "p";
          if (!pdf) {
            pdf = new jsPDF({
              orientation,
              unit: "mm",
              format: [mmW, mmH],
            });
          } else {
            pdf.addPage([mmW, mmH], orientation);
          }
          pdf.addImage(dataUrl, "JPEG", 0, 0, mmW, mmH);
        } else {
          const format = pageSize === "a4" ? "a4" : "letter";
          if (!pdf) {
            pdf = new jsPDF({ orientation: "p", unit: "mm", format });
          } else {
            pdf.addPage(format, "p");
          }

          const pageW = pdf.internal.pageSize.getWidth();
          const pageH = pdf.internal.pageSize.getHeight();
          const margin = 10;
          const maxW = pageW - margin * 2;
          const maxH = pageH - margin * 2;

          const ratio = Math.min(maxW / imgW, maxH / imgH);
          const drawW = imgW * ratio;
          const drawH = imgH * ratio;
          const x = (pageW - drawW) / 2;
          const y = (pageH - drawH) / 2;

          pdf.addImage(dataUrl, "JPEG", x, y, drawW, drawH);
        }
      }

      if (!pdf) throw new Error("Failed to create PDF");

      const blob = pdf.output("blob");
      downloadBlob(blob, `images-${files.length}.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Add Images</h2>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 text-center hover:border-indigo-400 transition"
        >
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="pointer-events-none flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-indigo-600" />
            <p className="font-medium text-foreground">Drop images here or click to browse</p>
            <p className="text-sm text-muted-foreground">JPG, PNG, WebP · up to 20 images</p>
          </div>
        </div>

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="flex-1 truncate">{f.name}</span>
                <span className="text-muted-foreground">{formatBytes(f.size)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="p-1 text-muted-foreground hover:text-red-600"
                  aria-label="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {files.length > 0 && (
        <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">2. Page Settings</h2>
          <div>
            <label className="block text-sm font-medium text-foreground/90 mb-1">Page size</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as "a4" | "letter" | "fit")}
              className="w-full max-w-xs rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
            >
              <option value="a4">A4 (centred image)</option>
              <option value="letter">US Letter (centred image)</option>
              <option value="fit">Fit to image size</option>
            </select>
          </div>

          <button
            type="button"
            onClick={generatePdf}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating PDF…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF ({files.length} page{files.length > 1 ? "s" : ""})
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
