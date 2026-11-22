/**
 * Client-side image resizing and compression utilities using Canvas API.
 * All processing happens in the browser. No images are uploaded to any server.
 */

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio?: boolean;
  /** Center-crop the source so it fills the exact target size. */
  crop?: boolean;
  /** Fit the whole image inside the exact target size, padding with backgroundColor (no cropping, no stretching). */
  contain?: boolean;
  quality?: number; // 0-1 for JPEG/WebP
  format?: "image/jpeg" | "image/png" | "image/webp";
  /** Fill colour. JPEG always gets a background (white by default); PNG/WebP stay transparent unless set. */
  backgroundColor?: string;
}

export interface ImageInfo {
  width: number;
  height: number;
  size: number;
  type: string;
  aspectRatio: number;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image. Please upload a valid, supported image file (JPG, PNG or WebP)."));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, format: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to create output image."))),
      format,
      quality
    );
  });
}

export async function getImageInfo(file: File): Promise<ImageInfo> {
  const img = await loadImage(file);
  return {
    width: img.naturalWidth,
    height: img.naturalHeight,
    size: file.size,
    type: file.type,
    aspectRatio: img.naturalWidth / img.naturalHeight,
  };
}

async function render(
  img: HTMLImageElement,
  o: {
    width: number;
    height: number;
    maintainAspectRatio: boolean;
    crop: boolean;
    contain: boolean;
    format: string;
    quality: number;
    backgroundColor?: string;
  }
): Promise<{ blob: Blob; width: number; height: number }> {
  let srcX = 0;
  let srcY = 0;
  let srcWidth = img.naturalWidth;
  let srcHeight = img.naturalHeight;
  let canvasW = o.width;
  let canvasH = o.height;
  let destX = 0;
  let destY = 0;
  let destW = o.width;
  let destH = o.height;

  if (o.crop) {
    const targetRatio = o.width / o.height;
    const srcRatio = srcWidth / srcHeight;
    if (srcRatio > targetRatio) {
      srcWidth = srcHeight * targetRatio;
      srcX = (img.naturalWidth - srcWidth) / 2;
    } else {
      srcHeight = srcWidth / targetRatio;
      srcY = (img.naturalHeight - srcHeight) / 2;
    }
  } else if (o.contain) {
    const ratio = Math.min(o.width / srcWidth, o.height / srcHeight);
    destW = Math.max(1, Math.round(srcWidth * ratio));
    destH = Math.max(1, Math.round(srcHeight * ratio));
    destX = Math.floor((o.width - destW) / 2);
    destY = Math.floor((o.height - destH) / 2);
  } else if (o.maintainAspectRatio) {
    const ratio = Math.min(o.width / srcWidth, o.height / srcHeight);
    destW = Math.max(1, Math.round(srcWidth * ratio));
    destH = Math.max(1, Math.round(srcHeight * ratio));
    canvasW = destW;
    canvasH = destH;
  }

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported in this browser.");

  // JPEG has no alpha channel, so it always needs a background. Other formats stay transparent unless asked.
  const bg = o.backgroundColor ?? (o.format === "image/jpeg" ? "#ffffff" : undefined);
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, destX, destY, destW, destH);

  const blob = await canvasToBlob(canvas, o.format, o.quality);
  return { blob, width: canvasW, height: canvasH };
}

export async function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<{ blob: Blob; width: number; height: number }> {
  const {
    width: targetWidth,
    height: targetHeight,
    maintainAspectRatio = true,
    crop = false,
    contain = false,
    quality = 0.92,
    format = "image/jpeg",
    backgroundColor,
  } = options;

  if (!(targetWidth > 0) || !(targetHeight > 0)) {
    throw new Error("Width and height must be positive numbers.");
  }
  if (targetWidth > 10000 || targetHeight > 10000) {
    throw new Error("Maximum dimension is 10000 pixels.");
  }

  const img = await loadImage(file);
  return render(img, {
    width: targetWidth,
    height: targetHeight,
    maintainAspectRatio,
    crop,
    contain,
    format,
    quality,
    backgroundColor,
  });
}

/**
 * Compress an image. With maxSizeKB set, lowers quality first (down to 30%) and then
 * progressively shrinks the dimensions until the target size is met.
 */
export async function compressImage(
  file: File,
  options: {
    maxSizeKB?: number;
    quality?: number;
    maxWidthOrHeight?: number;
    format?: "image/jpeg" | "image/png" | "image/webp";
  } = {}
): Promise<{ blob: Blob; quality: number }> {
  const { maxSizeKB, quality = 0.8, maxWidthOrHeight = 1920, format = "image/jpeg" } = options;

  const img = await loadImage(file);
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  const baseRatio = Math.min(1, maxWidthOrHeight / nw, maxWidthOrHeight / nh);

  const encode = (scale: number, q: number) =>
    render(img, {
      width: Math.max(1, Math.round(nw * baseRatio * scale)),
      height: Math.max(1, Math.round(nh * baseRatio * scale)),
      maintainAspectRatio: true,
      crop: false,
      contain: false,
      format,
      quality: q,
    });

  if (!maxSizeKB) {
    const result = await encode(1, quality);
    return { blob: result.blob, quality };
  }

  const targetBytes = maxSizeKB * 1024;
  const MIN_QUALITY = 0.3;
  let best: { blob: Blob; quality: number } | null = null;
  let scale = 1;

  for (let step = 0; step < 8; step++) {
    let q = quality;
    for (;;) {
      const result = await encode(scale, q);
      best = { blob: result.blob, quality: q };
      if (result.blob.size <= targetBytes) return best;
      if (q <= MIN_QUALITY + 1e-9) break;
      q = Math.max(MIN_QUALITY, Math.round((q - 0.1) * 100) / 100);
    }
    scale *= 0.85;
    if (Math.min(nw, nh) * baseRatio * scale < 100) break;
  }

  return best as { blob: Blob; quality: number };
}
