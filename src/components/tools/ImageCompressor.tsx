"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadZone } from "./UploadZone";
import { compressImage, getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { Loader } from "@/components/ui/Loader";
import { useToast } from "@/components/ui/Toast";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { Download, AlertCircle, CheckCircle2 } from "lucide-react";

export function ImageCompressor() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [targetKB, setTargetKB] = useState<number | "">("");
  const [quality, setQuality] = useState(0.8);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultQuality, setResultQuality] = useState<number | null>(null);
  const [resultExt, setResultExt] = useState<"jpg" | "webp">("jpg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

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
    setResultQuality(null);
    setPreviewUrl(null);
    setError(null);
    setWarning(null);
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
    setWarning(null);
    try {
      const result = await compressImage(file, {
        maxSizeKB: targetKB === "" ? undefined : Number(targetKB),
        quality,
        maxWidthOrHeight: maxDimension,
        format,
      });

      const url = URL.createObjectURL(result.blob);
      setPreviewUrl(url);
      setResultBlob(result.blob);
      setResultQuality(result.quality);
      // Safari can't encode WebP on canvas and silently returns PNG, so trust the real blob type.
      setResultExt(result.blob.type === "image/webp" ? "webp" : "jpg");

      if (format === "image/webp" && result.blob.type !== "image/webp") {
        setWarning("Your browser can't create WebP images, so a JPEG-compatible result was produced instead. Choose JPEG for best results.");
      } else if (targetKB !== "" && result.blob.size / 1024 > Number(targetKB)) {
        setWarning(
          `Could not reach the target size of ${targetKB} KB even after reducing quality and dimensions. Current size is ${formatBytes(result.blob.size)}. Try a higher target.`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compression failed");
    } finally {
      setLoading(false);
    }
  }, [file, targetKB, quality, maxDimension, format]);

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}_compressed.${resultExt}`);
    toast("Compressed image downloaded");
  };

  const handleClear = () => {
    setFile(null);
    setInfo(null);
    resetResult();
  };

  const reduction = info && resultBlob ? ((info.size - resultBlob.size) / info.size) * 100 : 0;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Image</h2>
        <UploadZone
          onFileSelect={handleSelect}
          currentFile={file}
          onClear={handleClear}
        />
        {info && (
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              {info.width} × {info.height} px
            </span>
            <span>{formatBytes(info.size)}</span>
            <span>{info.type.split("/")[1]?.toUpperCase()}</span>
          </div>
        )}
      </section>

      {file && (
        <section className="rounded-xl border border-border bg-muted/50 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">2. Compression Settings</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="target-kb" className="block text-sm font-medium text-foreground/90 mb-1">
                Target file size (KB) – optional
              </label>
              <input
                id="target-kb"
                type="number"
                min={5}
                max={5000}
                placeholder="e.g. 50"
                value={targetKB}
                onChange={(e) =>
                  setTargetKB(e.target.value === "" ? "" : Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Leave empty to use quality slider only. If needed, dimensions are reduced to hit the target.
              </p>
            </div>
            <div>
              <label htmlFor="max-dim" className="block text-sm font-medium text-foreground/90 mb-1">
                Max width or height (px)
              </label>
              <input
                id="max-dim"
                type="number"
                min={100}
                max={4000}
                value={maxDimension}
                onChange={(e) => setMaxDimension(Math.min(4000, Math.max(100, parseInt(e.target.value) || 100)))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="comp-format" className="block text-sm font-medium text-foreground/90 mb-1">
                Output format
              </label>
              <select
                id="comp-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/webp")}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP (smaller)</option>
              </select>
            </div>
            <div>
              <label htmlFor="comp-quality" className="block text-sm font-medium text-foreground/90 mb-1">
                Starting quality: {Math.round(quality * 100)}%
              </label>
              <input
                id="comp-quality"
                type="range"
                min={0.3}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={processImage}
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader size="sm" label="" className="scale-90" />
                Compressing…
              </>
            ) : (
              "Compress Image"
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

      {warning && (
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{warning}</p>
        </div>
      )}

      {previewUrl && resultBlob && info && (
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">3. Result</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Compressed preview"
                className="max-w-[280px] rounded-lg border border-border shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Compression complete</span>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Original size</dt>
                <dd className="font-medium">{formatBytes(info.size)}</dd>
                <dt className="text-muted-foreground">Compressed size</dt>
                <dd className="font-medium text-green-700 dark:text-green-400">
                  {formatBytes(resultBlob.size)}
                </dd>
                <dt className="text-muted-foreground">Reduction</dt>
                <dd className="font-medium">
                  {reduction > 0 ? `${reduction.toFixed(1)}%` : "— (output is not smaller than the original)"}
                </dd>
                {resultQuality !== null && (
                  <>
                    <dt className="text-muted-foreground">Final quality</dt>
                    <dd className="font-medium">{Math.round(resultQuality * 100)}%</dd>
                  </>
                )}
              </dl>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Download className="h-4 w-4" />
                Download Compressed Image
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
