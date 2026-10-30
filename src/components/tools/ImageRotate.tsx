"use client";

import { useState, useCallback, useEffect } from "react";
import { UploadZone } from "./UploadZone";
import { getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { Download, RotateCw, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Loader } from "@/components/ui/Loader";

export function ImageRotate() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [angle, setAngle] = useState(90);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) { setInfo(null); return; }
    getImageInfo(file).then(setInfo).catch((e) => setError(e.message));
  }, [file]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const rotate = useCallback(async (deg: number) => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        const url = URL.createObjectURL(file);
        i.onload = () => { URL.revokeObjectURL(url); resolve(i); };
        i.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load")); };
        i.src = url;
      });
      const rad = (deg * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const cw = Math.round(w * cos + h * sin);
      const ch = Math.round(w * sin + h * cos);
      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cw, ch);
      ctx.translate(cw / 2, ch / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -w / 2, -h / 2);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), "image/jpeg", 0.92);
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(blob));
      setResultBlob(blob);
      setAngle(deg);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Rotate failed");
    } finally {
      setLoading(false);
    }
  }, [file, previewUrl]);

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    downloadBlob(resultBlob, `${file.name.replace(/\.[^.]+$/, "")}_rotated.jpg`);
    toast("Rotated image downloaded");
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">1. Upload Image</h2>
        <UploadZone onFileSelect={setFile} currentFile={file} onClear={() => { setFile(null); setResultBlob(null); if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }} />
        {info && <p className="mt-2 text-sm text-muted-foreground">{info.width} × {info.height} px · {formatBytes(info.size)}</p>}
      </section>
      {file && (
        <section className="rounded-xl border border-border bg-muted/50 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">2. Rotate</h2>
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={loading} onClick={() => rotate(90)} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60">
              <RotateCw className="h-4 w-4" /> 90°
            </button>
            <button type="button" disabled={loading} onClick={() => rotate(180)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-60">
              180°
            </button>
            <button type="button" disabled={loading} onClick={() => rotate(270)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-60">
              <RotateCcw className="h-4 w-4" /> 270°
            </button>
          </div>
          {loading && <div className="mt-4"><Loader label="Rotating…" /></div>}
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
            <CheckCircle2 className="h-5 w-5" /><span className="font-medium">Rotated {angle}°</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Rotated" className="max-w-[280px] rounded-lg border border-border" />
          <button type="button" onClick={handleDownload} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
            <Download className="h-4 w-4" /> Download
          </button>
        </section>
      )}
    </div>
  );
}
