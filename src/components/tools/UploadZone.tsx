"use client";

import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  currentFile?: File | null;
  onClear?: () => void;
  disabled?: boolean;
}

export function UploadZone({
  onFileSelect,
  accept = "image/jpeg,image/jpg,image/png,image/webp",
  maxSizeMB = 10,
  currentFile,
  onClear,
  disabled,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      setError(null);
      const validTypes = accept.split(",").map((t) => t.trim());
      if (!validTypes.includes(file.type) && !file.type.startsWith("image/")) {
        setError("Unsupported file type. Please upload JPG, PNG or WebP.");
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File is too large. Maximum size is ${maxSizeMB} MB.`);
        return;
      }
      onFileSelect(file);
    },
    [accept, maxSizeMB, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) validateAndSelect(file);
    },
    [disabled, validateAndSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSelect(file);
    e.target.value = "";
  };

  if (currentFile) {
    return (
      <div className="relative rounded-xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 bg-accent/50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium text-foreground">{currentFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(currentFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="rounded-full p-2 text-muted-foreground hover:bg-card hover:text-foreground/90"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-xl border-2 border-dashed p-8 sm:p-12 text-center transition-colors",
          isDragging
            ? "border-indigo-500 bg-accent"
            : "border-border bg-muted/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-accent/30",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Upload image"
        />
        <div className="flex flex-col items-center gap-3 pointer-events-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <Upload className="h-7 w-7" />
          </div>
          <div>
            <p className="text-base font-medium text-foreground">
              Drag & drop your image here
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              or click to browse • JPG, PNG, WebP • Max {maxSizeMB} MB
            </p>
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
