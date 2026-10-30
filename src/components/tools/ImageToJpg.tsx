"use client";

import { useState, useEffect, useCallback } from "react";
import { UploadZone } from "./UploadZone";
import { resizeImage, getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { Download, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function ImageToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [quality, setQuality] = useState(0.92);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
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

  const processImage = useCallback(async () => {
    if (!file || !info) return;
    setLoading(true);
    setError(null);
    try {
      const result = await resizeImage(file, {
        width: info.width,
        height: info.height,
        maintainAspectRatio: true,
        crop: false,
        quality,
        format: "image/jpeg",
        backgroundColor: bgColor,
      });

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(result.blob);
      setPreviewUrl(url);
      setResultBlob(result.blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  }, [file, info, quality, bgColor, previewUrl]);

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}.jpg`);
  };

  const handleClear = () => {
    setFile(null);
    setInfo(null);
    setResultBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  };

  const hasTransparency =
    info?.type === "image/png" || info?.type === "image/webp";

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Image</h2>
        <UploadZone
          onFileSelect={setFile}
          currentFile={file}
          onClear={handleClear}
          accept="image/png,image/webp,image/jpeg,image/jpg,image/gif,image/bmp"
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

      {file && info && (
        <section className="rounded-xl border border-border bg-muted/50 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">2. Conversion Settings</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="jpg-quality" className="block text-sm font-medium text-foreground/90 mb-1">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                id="jpg-quality"
                type="range"
                min={0.5}
                max={1}
                step={0.01}
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {hasTransparency && (
              <div>
                <label htmlFor="bg-color" className="block text-sm font-medium text-foreground/90 mb-1">
                  Background colour (for transparency)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border border-border"
                  />
                  <span className="text-sm text-muted-foreground">{bgColor}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG does not support transparency. Choose a background colour.
                </p>
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
                <Loader2 className="h-4 w-4 animate-spin" />
                Converting…
              </>
            ) : (
              "Convert to JPG"
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

      {previewUrl && resultBlob && info && (
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">3. Preview & Download</h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Converted JPG preview"
                className="max-w-[280px] rounded-lg border border-border shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Converted to JPG</span>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Original size</dt>
                <dd className="font-medium">{formatBytes(info.size)}</dd>
                <dt className="text-muted-foreground">JPG size</dt>
                <dd className="font-medium">{formatBytes(resultBlob.size)}</dd>
                <dt className="text-muted-foreground">Dimensions</dt>
                <dd className="font-medium">
                  {info.width} × {info.height} px
                </dd>
              </dl>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Download className="h-4 w-4" />
                Download JPG
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
