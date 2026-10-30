"use client";

import { useState, useCallback, useEffect } from "react";
import { UploadZone } from "./UploadZone";
import { getImageInfo, type ImageInfo } from "@/lib/image-processing/resize";
import { formatBytes, downloadBlob } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Loader } from "@/components/ui/Loader";

export function ImageToPng() {
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

  const convert = useCallback(async () => {
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
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), "image/png");
      });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(blob));
      setResultBlob(blob);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
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
        <button type="button" onClick={convert} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {loading ? <Loader size="sm" label="Converting" /> : "Convert to PNG"}
        </button>
      )}
      {error && <div className="flex gap-2 text-sm text-red-700 dark:text-red-300"><AlertCircle className="h-5 w-5" />{error}</div>}
      {previewUrl && resultBlob && (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-3"><CheckCircle2 className="h-5 w-5" /> PNG ready · {formatBytes(resultBlob.size)}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="PNG" className="max-w-[280px] rounded-lg border border-border" />
          <button type="button" onClick={() => { downloadBlob(resultBlob, `${file!.name.replace(/\.[^.]+$/, "")}.png`); toast("PNG downloaded"); }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
            <Download className="h-4 w-4" /> Download PNG
          </button>
        </section>
      )}
    </div>
  );
}
