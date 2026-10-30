"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadZone } from "./UploadZone";
import { getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { Download, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function ImageGrayscale() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [quality, setQuality] = useState(0.92);

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

  const convert = useCallback(async () => {
    if (!file || !info) return;
    setLoading(true);
    setError(null);

    try {
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

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Convert to grayscale using luminosity method
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }

      ctx.putImageData(imageData, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to create image"))),
          format,
          format === "image/jpeg" ? quality : undefined
        );
      });

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setResultBlob(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  }, [file, info, format, quality, previewUrl]);

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const ext = format === "image/jpeg" ? "jpg" : "png";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}_grayscale.${ext}`);
  };

  const handleClear = () => {
    setFile(null);
    setInfo(null);
    setResultBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Image</h2>
        <UploadZone onFileSelect={setFile} currentFile={file} onClear={handleClear} />
        {info && (
          <p className="mt-2 text-sm text-muted-foreground">
            {info.width} × {info.height} px · {formatBytes(info.size)}
          </p>
        )}
      </section>

      {file && (
        <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">2. Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/90 mb-1">Output format</label>
              <select
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
                <label className="block text-sm font-medium text-foreground/90 mb-1">
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
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
          <button
            type="button"
            onClick={convert}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Converting…
              </>
            ) : (
              "Convert to Grayscale"
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

      {previewUrl && resultBlob && (
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">3. Result</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Grayscale preview"
                className="max-w-[280px] rounded-lg border border-border shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Converted to grayscale</span>
              </div>
              <p className="text-sm text-muted-foreground">Size: {formatBytes(resultBlob.size)}</p>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
