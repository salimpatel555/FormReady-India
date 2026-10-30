/**
 * Client-side image resizing and compression utilities using Canvas API.
 * All processing happens in the browser. No images are uploaded to any server.
 */

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio?: boolean;
  crop?: boolean;
  quality?: number; // 0-1 for JPEG/WebP
  format?: "image/jpeg" | "image/png" | "image/webp";
  backgroundColor?: string; // for transparent to non-transparent
}

export interface ImageInfo {
  width: number;
  height: number;
  size: number;
  type: string;
  aspectRatio: number;
}

export async function getImageInfo(file: File): Promise<ImageInfo> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image. Please upload a valid image file."));
    };
    img.src = url;
  });
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
    quality = 0.92,
    format = "image/jpeg",
    backgroundColor = "#ffffff",
  } = options;

  if (targetWidth <= 0 || targetHeight <= 0) {
    throw new Error("Width and height must be positive numbers.");
  }
  if (targetWidth > 10000 || targetHeight > 10000) {
    throw new Error("Maximum dimension is 10000 pixels.");
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let srcX = 0;
      let srcY = 0;
      let srcWidth = img.naturalWidth;
      let srcHeight = img.naturalHeight;
      let destWidth = targetWidth;
      let destHeight = targetHeight;

      if (crop) {
        // Center crop to match target aspect ratio
        const targetRatio = targetWidth / targetHeight;
        const srcRatio = srcWidth / srcHeight;

        if (srcRatio > targetRatio) {
          // Source is wider
          srcWidth = srcHeight * targetRatio;
          srcX = (img.naturalWidth - srcWidth) / 2;
        } else {
          // Source is taller
          srcHeight = srcWidth / targetRatio;
          srcY = (img.naturalHeight - srcHeight) / 2;
        }
      } else if (maintainAspectRatio) {
        const ratio = Math.min(
          targetWidth / img.naturalWidth,
          targetHeight / img.naturalHeight
        );
        destWidth = Math.round(img.naturalWidth * ratio);
        destHeight = Math.round(img.naturalHeight * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = destWidth;
      canvas.height = destHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas not supported in this browser."));
        return;
      }

      // Fill background for formats that don't support transparency
      if (format === "image/jpeg" || backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, destWidth, destHeight);
      }

      ctx.drawImage(
        img,
        srcX,
        srcY,
        srcWidth,
        srcHeight,
        0,
        0,
        destWidth,
        destHeight
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create output image."));
            return;
          }
          resolve({ blob, width: destWidth, height: destHeight });
        },
        format,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image. File may be corrupted or unsupported."));
    };

    img.src = url;
  });
}

export async function compressImage(
  file: File,
  options: {
    maxSizeKB?: number;
    quality?: number;
    maxWidthOrHeight?: number;
    format?: "image/jpeg" | "image/png" | "image/webp";
  } = {}
): Promise<{ blob: Blob; quality: number }> {
  const {
    maxSizeKB,
    quality = 0.8,
    maxWidthOrHeight = 1920,
    format = "image/jpeg",
  } = options;

  // First resize if needed
  const info = await getImageInfo(file);
  let currentFile = file;
  let currentQuality = quality;

  if (info.width > maxWidthOrHeight || info.height > maxWidthOrHeight) {
    const ratio = Math.min(
      maxWidthOrHeight / info.width,
      maxWidthOrHeight / info.height
    );
    const result = await resizeImage(file, {
      width: Math.round(info.width * ratio),
      height: Math.round(info.height * ratio),
      maintainAspectRatio: true,
      quality: currentQuality,
      format,
    });
    currentFile = new File([result.blob], file.name, { type: format });
  }

  // Iterative quality reduction if maxSizeKB is set
  if (maxSizeKB) {
    let attempts = 0;
    const maxAttempts = 8;
    let blob: Blob = currentFile;

    while (attempts < maxAttempts) {
      const result = await resizeImage(
        currentFile instanceof File ? currentFile : file,
        {
          width: info.width > maxWidthOrHeight ? maxWidthOrHeight : info.width,
          height: info.height > maxWidthOrHeight ? maxWidthOrHeight : info.height,
          maintainAspectRatio: true,
          quality: currentQuality,
          format,
        }
      );
      blob = result.blob;

      if (blob.size / 1024 <= maxSizeKB || currentQuality <= 0.1) {
        return { blob, quality: currentQuality };
      }

      currentQuality = Math.max(0.1, currentQuality - 0.1);
      attempts++;
    }

    return { blob, quality: currentQuality };
  }

  // Simple quality compression
  const result = await resizeImage(currentFile, {
    width: info.width,
    height: info.height,
    maintainAspectRatio: true,
    quality: currentQuality,
    format,
  });

  return { blob: result.blob, quality: currentQuality };
}
