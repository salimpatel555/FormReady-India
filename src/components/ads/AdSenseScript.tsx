import Script from "next/script";
import { siteConfig } from "@/data/site";

/** Loads AdSense only when NEXT_PUBLIC_ADSENSE_CLIENT is set (after you get your publisher id). */
export function AdSenseScript() {
  if (!siteConfig.adsenseClient) return null;
  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
      crossOrigin="anonymous"
    />
  );
}
