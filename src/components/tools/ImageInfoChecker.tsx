"use client";

import { useState, useEffect } from "react";
import { UploadZone } from "./UploadZone";
import { getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes } from "@/lib/utils";
import { AlertCircle, Copy, Check } from "lucide-react";

export function ImageInfoChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!file) {
      setInfo(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    getImageInfo(file)
      .then(setInfo)
      .catch((err) => setError(err.message));

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleClear = () => {
    setFile(null);
    setInfo(null);
    setError(null);
    setCopied(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const copyDetails = async () => {
    if (!info || !file) return;
    const text = [
      `File: ${file.name}`,
      `Dimensions: ${info.width} × ${info.height} px`,
      `Aspect Ratio: ${info.aspectRatio.toFixed(3)}`,
      `File Size: ${formatBytes(info.size)} (${info.size} bytes)`,
      `Format: ${info.type}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback ignored
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Upload Image</h2>
        <UploadZone
          onFileSelect={setFile}
          currentFile={file}
          onClear={handleClear}
        />
      </section>

      {error && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-4 text-sm text-red-800 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {info && file && (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col sm:flex-row gap-8">
            {previewUrl && (
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Uploaded image preview"
                  className="max-w-[240px] max-h-[240px] rounded-lg border border-border object-contain bg-muted/50"
                />
              </div>
            )}

            <div className="flex-1 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Image Details</h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">File name</dt>
                  <dd className="font-medium text-foreground break-all">{file.name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Format</dt>
                  <dd className="font-medium text-foreground">
                    {info.type.split("/")[1]?.toUpperCase() || info.type}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Width</dt>
                  <dd className="font-medium text-foreground">{info.width} px</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Height</dt>
                  <dd className="font-medium text-foreground">{info.height} px</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Aspect ratio</dt>
                  <dd className="font-medium text-foreground">
                    {info.aspectRatio.toFixed(3)} ({info.width}:{info.height})
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">File size</dt>
                  <dd className="font-medium text-foreground">
                    {formatBytes(info.size)}{" "}
                    <span className="text-muted-foreground font-normal">
                      ({info.size.toLocaleString()} bytes)
                    </span>
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={copyDetails}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/90 hover:bg-muted/50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy details
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
