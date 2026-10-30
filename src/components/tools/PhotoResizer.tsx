"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadZone } from "./UploadZone";
import { resizeImage, getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob, cn } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Loader } from "@/components/ui/Loader";

interface PhotoResizerProps {
  title?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  showCropOption?: boolean;
}

export function PhotoResizer({
  title = "Government Form Photo Resizer",
  defaultWidth = 200,
  defaultHeight = 230,
  showCropOption = true,
}: PhotoResizerProps) {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [maintainAspect, setMaintainAspect] = useState(false);
  const [crop, setCrop] = useState(true);
  const [quality, setQuality] = useState(0.92);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultInfo, setResultInfo] = useState<{ width: number; height: number; size: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load original image info
  useEffect(() => {
    if (!file) {
      setInfo(null);
      return;
    }
    getImageInfo(file)
      .then(setInfo)
      .catch((err) => setError(err.message));
  }, [file]);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const processImage = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const result = await resizeImage(file, {
        width,
        height,
        maintainAspectRatio: maintainAspect,
        crop: crop && !maintainAspect,
        quality,
        format,
        backgroundColor: "#ffffff",
      });

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(result.blob);
      setPreviewUrl(url);
      setResultBlob(result.blob);
      setResultInfo({
        width: result.width,
        height: result.height,
        size: result.blob.size,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setLoading(false);
    }
  }, [file, width, height, maintainAspect, crop, quality, format, previewUrl]);

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const ext = format === "image/jpeg" ? "jpg" : "png";
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}_${width}x${height}.${ext}`);
    toast("Photo downloaded successfully");
  };

  const handleClear = () => {
    setFile(null);
    setInfo(null);
    setResultBlob(null);
    setResultInfo(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Upload */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Photo</h2>
        <UploadZone
          onFileSelect={setFile}
          currentFile={file}
          onClear={handleClear}
        />
        {info && (
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              Original: {info.width} × {info.height} px
            </span>
            <span>Size: {formatBytes(info.size)}</span>
            <span>Type: {info.type.split("/")[1]?.toUpperCase()}</span>
            <span>Aspect: {info.aspectRatio.toFixed(2)}</span>
          </div>
        )}
      </section>

      {/* Settings */}
      {file && (
        <section className="rounded-xl border border-border bg-muted/50 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">2. Set Dimensions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-foreground/90 mb-1">
                Width (px)
              </label>
              <input
                id="width"
                type="number"
                min={1}
                max={10000}
                value={width}
                onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-foreground/90 mb-1">
                Height (px)
              </label>
              <input
                id="height"
                type="number"
                min={1}
                max={10000}
                value={height}
                onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-foreground/90">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => {
                  setMaintainAspect(e.target.checked);
                  if (e.target.checked) setCrop(false);
                }}
                className="rounded border-border text-indigo-600 focus:ring-indigo-500"
              />
              Maintain aspect ratio
            </label>
            {showCropOption && (
              <label className="flex items-center gap-2 text-sm text-foreground/90">
                <input
                  type="checkbox"
                  checked={crop}
                  onChange={(e) => {
                    setCrop(e.target.checked);
                    if (e.target.checked) setMaintainAspect(false);
                  }}
                  disabled={maintainAspect}
                  className="rounded border-border text-indigo-600 focus:ring-indigo-500"
                />
                Center crop to exact size
              </label>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-foreground/90 mb-1">
                Output format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png")}
                className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="image/jpeg">JPEG (recommended for forms)</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
            {format === "image/jpeg" && (
              <div>
                <label htmlFor="quality" className="block text-sm font-medium text-foreground/90 mb-1">
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  id="quality"
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
            onClick={processImage}
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader size="sm" label="" className="!flex-row gap-2 scale-90" />
                Processing…
              </>
            ) : (
              "Generate Preview"
            )}
          </button>
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-sm text-red-800 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Preview & Download */}
      {previewUrl && resultInfo && (
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">3. Preview & Download</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Resized preview"
                className="max-w-[280px] rounded-lg border border-border shadow-sm"
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
                {info && (
                  <>
                    <dt className="text-muted-foreground">Original size</dt>
                    <dd className="font-medium">{formatBytes(info.size)}</dd>
                    <dt className="text-muted-foreground">Reduction</dt>
                    <dd className="font-medium">
                      {info.size > resultInfo.size
                        ? `${(((info.size - resultInfo.size) / info.size) * 100).toFixed(1)}%`
                        : "—"}
                    </dd>
                  </>
                )}
              </dl>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Download className="h-4 w-4" />
                Download Image
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
