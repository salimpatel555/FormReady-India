"use client";

import { cn } from "@/lib/utils";

interface LoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullPage?: boolean;
}

export function Loader({
  label = "Processing…",
  size = "md",
  className,
  fullPage = false,
}: LoaderProps) {
  const ring =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-14 w-14" : "h-11 w-11";
  const text = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn("relative", ring)}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 opacity-30 blur-md animate-pulse" />
        <div
          className={cn("absolute inset-0 rounded-full animate-spin", ring)}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #6366f1 40%, #a855f7 70%, #ec4899 100%)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          }}
        />
        <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-card shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt=""
            className={cn(
              size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5",
              "animate-pulse"
            )}
          />
        </div>
      </div>
      {label && (
        <p className={cn("font-medium text-muted-foreground tracking-wide", text)}>
          <span className="inline-flex items-center gap-1.5">
            {label}
            <span className="inline-flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:0ms]" />
              <span className="h-1 w-1 rounded-full bg-violet-500 animate-bounce [animation-delay:150ms]" />
              <span className="h-1 w-1 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:300ms]" />
            </span>
          </span>
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/70 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
