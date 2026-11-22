"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadZone } from "./UploadZone";
import { resizeImage, getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { Download, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function SignatureResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [width, setWidth] = useState(140);
  const [height, setHeight] = useState(60);
  const [quality, setQuality] = useState(0.92);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [cropToFill, setCropToFill] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultInfo, setResultInfo] = useState<{ width: number; height: number; size: number; ext: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const resetResult = () => {
    setResultBlob(null);
    setResultInfo(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleSelect = (f: File) => {
    resetResult();
    setInfo(null);
    setFile(f);
  };

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      // Default: fit the whole signature inside the exact size on a white background (nothing gets cut off).
      // Optional: center-crop to fill the exact size.
      const result = await resizeImage(file, {
        width,
        height,
        maintainAspectRatio: false,
        crop: cropToFill,
        contain: !cropToFill,
        quality,
        format,
        backgroundColor: "#ffffff",
      });

      const url = URL.createObjectURL(result.blob);
      setPreviewUrl(url);
      setResultBlob(result.blob);
      setResultInfo({
        width: result.width,
        height: result.height,
        size: result.blob.size,
        ext: format === "image/jpeg" ? "jpg" : "png",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setLoading(false);
    }
  }, [file, width, height, quality, format, cropToFill]);

  const handleDownload = () => {
    if (!resultBlob || !file || !resultInfo) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}_signature_${resultInfo.width}x${resultInfo.height}.${resultInfo.ext}`);
  };

  const handleClear = () => {
    setFile(null);
    setInfo(null);
    resetResult();
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Signature</h2>
        <UploadZone
          onFileSelect={handleSelect}
          currentFile={file}
          onClear={handleClear}
        />
        {info && (
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              Original: {info.width} × {info.height} px
            </span>
            <span>Size: {formatBytes(info.size)}</span>
          </div>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Tip: Use a clear signature on white paper scanned or photographed with good lighting.
        </p>
      </section>

      {file && (
        <section className="rounded-xl border border-border bg-muted/50 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">2. Set Signature Dimensions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sig-width" className="block text-sm font-medium text-foreground/90 mb-1">
                Width (px)
              </label>
              <input
                id="sig-width"
                type="number"
                min={1}
                max={2000}
                value={width}
                onChange={(e) => setWidth(Math.min(2000, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="sig-height" className="block text-sm font-medium text-foreground/90 mb-1">
                Height (px)
              </label>
              <input
                id="sig-height"
                type="number"
                min={1}
                max={1000}
                value={height}
                onChange={(e) => setHeight(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sig-format" className="block text-sm font-medium text-foreground/90 mb-1">
                Output format
              </label>
              <select
                id="sig-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png")}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
            {format === "image/jpeg" && (
              <div>
                <label htmlFor="sig-quality" className="block text-sm font-medium text-foreground/90 mb-1">
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  id="sig-quality"
                  type="range"
                  min={0.5}
                  max={1}
                  step={0.01}
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-foreground/90">
            <input
              type="checkbox"
              checked={cropToFill}
              onChange={(e) => setCropToFill(e.target.checked)}
              className="rounded border-border text-indigo-600 focus:ring-indigo-500"
            />
            Crop to fill the exact size (may cut off the edges of the signature)
          </label>

          <p className="mt-3 text-xs text-muted-foreground">
            A white background is applied. By default the whole signature is kept and centred inside the exact dimensions.
          </p>

          <button
            type="button"
            onClick={processImage}
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              "Generate Preview"
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

      {previewUrl && resultInfo && (
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">3. Preview & Download</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0 bg-card p-2 border border-border rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Resized signature preview"
                className="max-w-[280px]"
                style={{ backgroundColor: "#fff" }}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Ready to download</span>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Dimensions</dt>
                <dd className="font-medium">
                  {resultInfo.width} × {resultInfo.height} px
                </dd>
                <dt className="text-muted-foreground">File size</dt>
                <dd className="font-medium">{formatBytes(resultInfo.size)}</dd>
              </dl>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Download className="h-4 w-4" />
                Download Signature
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
