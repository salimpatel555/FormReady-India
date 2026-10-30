"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { UploadZone } from "./UploadZone";
import { getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { Download, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

// A4 at 300 DPI in pixels
const A4_WIDTH_PX = 2480;
const A4_HEIGHT_PX = 3508;
const MM_TO_PX = 300 / 25.4; // ~11.811

interface PhotoSize {
  label: string;
  widthMm: number;
  heightMm: number;
}

const PRESET_SIZES: PhotoSize[] = [
  { label: "35 × 45 mm (common passport / visa)", widthMm: 35, heightMm: 45 },
  { label: "51 × 51 mm (US passport style)", widthMm: 51, heightMm: 51 },
  { label: "40 × 50 mm", widthMm: 40, heightMm: 50 },
  { label: "33 × 48 mm", widthMm: 33, heightMm: 48 },
  { label: "Custom", widthMm: 35, heightMm: 45 },
];

export function PassportPhotoMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [widthMm, setWidthMm] = useState(35);
  const [heightMm, setHeightMm] = useState(45);
  const [marginMm, setMarginMm] = useState(10);
  const [gapMm, setGapMm] = useState(5);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sheetInfo, setSheetInfo] = useState<{ cols: number; rows: number; count: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!file) {
      setInfo(null);
      return;
    }
    getImageInfo(file)
      .then(setInfo)
      .catch((err) => setError(err.message));
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePresetChange = (index: number) => {
    setSelectedPreset(index);
    if (index < PRESET_SIZES.length - 1) {
      setWidthMm(PRESET_SIZES[index].widthMm);
      setHeightMm(PRESET_SIZES[index].heightMm);
    }
  };

  const generateSheet = useCallback(async () => {
    if (!file || !info) return;
    setLoading(true);
    setError(null);

    try {
      const photoW = Math.round(widthMm * MM_TO_PX);
      const photoH = Math.round(heightMm * MM_TO_PX);
      const margin = Math.round(marginMm * MM_TO_PX);
      const gap = Math.round(gapMm * MM_TO_PX);

      const usableW = A4_WIDTH_PX - 2 * margin;
      const usableH = A4_HEIGHT_PX - 2 * margin;

      const cols = Math.floor((usableW + gap) / (photoW + gap));
      const rows = Math.floor((usableH + gap) / (photoH + gap));

      if (cols < 1 || rows < 1) {
        throw new Error(
          "Photo size is too large for an A4 sheet with the current margins. Reduce photo size or margins."
        );
      }

      // Load source image
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        const url = URL.createObjectURL(file);
        i.onload = () => {
          URL.revokeObjectURL(url);
          resolve(i);
        };
        i.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };
        i.src = url;
      });

      // Create a single photo canvas (center-cropped to target aspect)
      const singleCanvas = document.createElement("canvas");
      singleCanvas.width = photoW;
      singleCanvas.height = photoH;
      const sCtx = singleCanvas.getContext("2d");
      if (!sCtx) throw new Error("Canvas not supported");

      // Center crop source to match target aspect
      const targetRatio = photoW / photoH;
      const srcRatio = img.naturalWidth / img.naturalHeight;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

      if (srcRatio > targetRatio) {
        sw = img.naturalHeight * targetRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / targetRatio;
        sy = (img.naturalHeight - sh) / 2;
      }

      sCtx.fillStyle = "#ffffff";
      sCtx.fillRect(0, 0, photoW, photoH);
      sCtx.drawImage(img, sx, sy, sw, sh, 0, 0, photoW, photoH);

      // Create A4 sheet
      const sheet = document.createElement("canvas");
      sheet.width = A4_WIDTH_PX;
      sheet.height = A4_HEIGHT_PX;
      const ctx = sheet.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, A4_WIDTH_PX, A4_HEIGHT_PX);

      // Place photos
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = margin + col * (photoW + gap);
          const y = margin + row * (photoH + gap);
          ctx.drawImage(singleCanvas, x, y);
        }
      }

      // Optional light crop marks / border for each photo
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = margin + col * (photoW + gap);
          const y = margin + row * (photoH + gap);
          ctx.strokeRect(x, y, photoW, photoH);
        }
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        sheet.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to create sheet"))),
          "image/jpeg",
          0.95
        );
      });

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setSheetInfo({ cols, rows, count: cols * rows });
      canvasRef.current = sheet;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate sheet");
    } finally {
      setLoading(false);
    }
  }, [file, info, widthMm, heightMm, marginMm, gapMm, previewUrl]);

  const handleDownload = () => {
    if (!previewUrl) return;
    // Re-fetch blob from the preview URL
    fetch(previewUrl)
      .then((r) => r.blob())
      .then((blob) => {
        downloadBlob(blob, `passport-photo-sheet-${widthMm}x${heightMm}mm.jpg`);
      });
  };

  const handleClear = () => {
    setFile(null);
    setInfo(null);
    setSheetInfo(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Photo</h2>
        <UploadZone
          onFileSelect={setFile}
          currentFile={file}
          onClear={handleClear}
        />
        {info && (
          <p className="mt-2 text-sm text-muted-foreground">
            Original: {info.width} × {info.height} px · {formatBytes(info.size)}
          </p>
        )}
      </section>

      {file && (
        <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">2. Photo Size & Layout</h2>

          <div>
            <label className="block text-sm font-medium text-foreground/90 mb-1">Preset size</label>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
            >
              {PRESET_SIZES.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="w-mm" className="block text-sm font-medium text-foreground/90 mb-1">
                Width (mm)
              </label>
              <input
                id="w-mm"
                type="number"
                min={20}
                max={100}
                value={widthMm}
                onChange={(e) => {
                  setWidthMm(Number(e.target.value));
                  setSelectedPreset(PRESET_SIZES.length - 1);
                }}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="h-mm" className="block text-sm font-medium text-foreground/90 mb-1">
                Height (mm)
              </label>
              <input
                id="h-mm"
                type="number"
                min={20}
                max={100}
                value={heightMm}
                onChange={(e) => {
                  setHeightMm(Number(e.target.value));
                  setSelectedPreset(PRESET_SIZES.length - 1);
                }}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="margin" className="block text-sm font-medium text-foreground/90 mb-1">
                Page margin (mm)
              </label>
              <input
                id="margin"
                type="number"
                min={5}
                max={30}
                value={marginMm}
                onChange={(e) => setMarginMm(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="gap" className="block text-sm font-medium text-foreground/90 mb-1">
                Gap between photos (mm)
              </label>
              <input
                id="gap"
                type="number"
                min={2}
                max={20}
                value={gapMm}
                onChange={(e) => setGapMm(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Output is a print-ready A4 JPEG at 300 DPI. Always test-print one sheet
            before bulk printing. Photo size requirements vary by country and document.
          </p>

          <button
            type="button"
            onClick={generateSheet}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating sheet…
              </>
            ) : (
              "Generate A4 Sheet"
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

      {previewUrl && sheetInfo && (
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">3. Preview & Download</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0 max-w-full overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="A4 passport photo sheet preview"
                className="max-w-[320px] rounded border border-border shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Sheet ready</span>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Photo size</dt>
                <dd className="font-medium">
                  {widthMm} × {heightMm} mm
                </dd>
                <dt className="text-muted-foreground">Layout</dt>
                <dd className="font-medium">
                  {sheetInfo.cols} × {sheetInfo.rows} ({sheetInfo.count} photos)
                </dd>
                <dt className="text-muted-foreground">Paper</dt>
                <dd className="font-medium">A4 · 300 DPI</dd>
              </dl>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Download className="h-4 w-4" />
                Download A4 Sheet (JPG)
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
