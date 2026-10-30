"use client";

import { useState, useCallback, useEffect } from "react";
import { UploadZone } from "./UploadZone";
import { getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { Download, FlipHorizontal2, FlipVertical2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Loader } from "@/components/ui/Loader";

export function ImageFlip() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) { setInfo(null); return; }
    getImageInfo(file).then(setInfo).catch((e) => setError(e.message));
  }, [file]);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const flip = useCallback(async (horizontal: boolean) => {
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
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      if (horizontal) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), "image/jpeg", 0.92);
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(blob));
      setResultBlob(blob);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Flip failed");
    } finally {
      setLoading(false);
    }
  }, [file, previewUrl]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-3">1. Upload Image</h2>
        <UploadZone onFileSelect={setFile} currentFile={file} onClear={() => { setFile(null); setResultBlob(null); if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }} />
        {info && <p className="mt-2 text-sm text-muted-foreground">{info.width} × {info.height} · {formatBytes(info.size)}</p>}
      </section>
      {file && (
        <div className="flex flex-wrap gap-3">
          <button type="button" disabled={loading} onClick={() => flip(true)} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            <FlipHorizontal2 className="h-4 w-4" /> Flip horizontal
          </button>
          <button type="button" disabled={loading} onClick={() => flip(false)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold disabled:opacity-60">
            <FlipVertical2 className="h-4 w-4" /> Flip vertical
          </button>
          {loading && <Loader size="sm" label="Flipping" />}
        </div>
      )}
      {error && <div className="flex gap-2 text-sm text-red-700 dark:text-red-300"><AlertCircle className="h-5 w-5" />{error}</div>}
      {previewUrl && resultBlob && (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-3"><CheckCircle2 className="h-5 w-5" /> Ready</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Flipped" className="max-w-[280px] rounded-lg border border-border" />
          <button type="button" onClick={() => { downloadBlob(resultBlob, `${file!.name.replace(/\.[^.]+$/, "")}_flip.jpg`); toast("Downloaded"); }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
            <Download className="h-4 w-4" /> Download
          </button>
        </section>
      )}
    </div>
  );
}
