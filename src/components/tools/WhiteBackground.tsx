"use client";

import { useState, useCallback, useEffect } from "react";
import { UploadZone } from "./UploadZone";
import { getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Loader } from "@/components/ui/Loader";

export function WhiteBackground() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(240);

  useEffect(() => {
    if (!file) { setInfo(null); return; }
    getImageInfo(file).then(setInfo).catch((e) => setError(e.message));
  }, [file]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const process = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        const url = URL.createObjectURL(file);
        i.onload = () => { URL.revokeObjectURL(url); resolve(i); };
        i.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
        i.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      // Light near-white cleanup
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] >= threshold && d[i + 1] >= threshold && d[i + 2] >= threshold) {
          d[i] = 255; d[i + 1] = 255; d[i + 2] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), "image/jpeg", 0.92);
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(blob));
      setResultBlob(blob);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }, [file, threshold, previewUrl]);

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${base}_white_bg.jpg`);
    toast("Image with white background downloaded");
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Image</h2>
        <UploadZone onFileSelect={setFile} currentFile={file} onClear={() => { setFile(null); setResultBlob(null); if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }} />
        {info && <p className="mt-2 text-sm text-muted-foreground">{info.width} × {info.height} px · {formatBytes(info.size)}</p>}
      </section>
      {file && (
        <section className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">2. Background threshold</h2>
          <label className="block text-sm text-muted-foreground">Near-white cleanup: {threshold}</label>
          <input type="range" min={200} max={250} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="w-full" />
          <button type="button" onClick={process} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60">
            {loading ? <Loader size="sm" label="Processing" /> : "Apply white background"}
          </button>
        </section>
      )}
      {error && (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" /><p>{error}</p>
        </div>
      )}
      {previewUrl && resultBlob && (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-4">
            <CheckCircle2 className="h-5 w-5" /><span className="font-medium">Ready</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Preview" className="max-w-[280px] rounded-lg border border-border" />
          <p className="mt-2 text-sm text-muted-foreground">{formatBytes(resultBlob.size)}</p>
          <button type="button" onClick={handleDownload} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
            <Download className="h-4 w-4" /> Download
          </button>
        </section>
      )}
    </div>
  );
}
