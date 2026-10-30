"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Renders nothing until an AdSense client and slot id exist, so you never show empty boxes.
 * Place at most one or two per page, away from tool buttons, to avoid accidental clicks.
 */
export function AdSlot({ slot, className = "" }: { slot?: string; className?: string }) {
  const enabled = Boolean(siteConfig.adsenseClient && slot);
  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [enabled]);
  if (!enabled) return null;
  return (
    <div className={`my-8 text-center ${className}`} aria-label="Advertisement">
      <p className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
