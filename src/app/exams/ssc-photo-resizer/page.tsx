import type { Metadata } from "next";
import Link from "next/link";
import { PhotoResizer } from "@/components/tools/PhotoResizer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { siteUrl, siteName } from "@/data/seo";

export const metadata: Metadata = {
  title: "SSC Photo Resizer – Free Online Tool for SSC Applications",
  description:
    "Resize photos for SSC CGL, CHSL, MTS and other SSC forms. Set exact pixels and file size. Example presets only — always verify the latest official SSC notification. Browser-based and private.",
  keywords: [
    "SSC photo resizer",
    "SSC CGL photo size",
    "SSC CHSL photo dimensions",
    "SSC photo size in KB",
    "resize photo for SSC form",
  ],
  alternates: { canonical: `${siteUrl}/exams/ssc-photo-resizer` },
  openGraph: {
    title: "SSC Photo Resizer | FormReady India",
    description: "Prepare SSC application photos to required pixel and KB limits in your browser.",
    url: `${siteUrl}/exams/ssc-photo-resizer`,
    siteName,
  },
};

export default function SscPhotoResizerPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SSC Photo Resizer",
    url: `${siteUrl}/exams/ssc-photo-resizer`,
    applicationCategory: "UtilitiesApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: siteName, url: siteUrl },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={ld} />
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Exams</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">SSC Photo Resizer</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          SSC Photo Resizer
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Prepare photographs for SSC CGL, CHSL, MTS, GD and other Staff Selection Commission
          online applications. Adjust width, height and quality to match the size written in
          <strong className="text-foreground"> your current official notification</strong>.
        </p>
      </header>

      <div className="mb-8 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <p>
          <strong>Example defaults only.</strong> SSC photo and signature rules change by exam and year.
          Always confirm pixel size, file format and KB limit from the latest SSC advertisement before applying.
        </p>
      </div>

      <PhotoResizer defaultWidth={200} defaultHeight={230} title="SSC Photo Resizer" />

      <article className="mt-14 prose prose-slate dark:prose-invert max-w-none">
        <h2>About SSC application photos</h2>
        <p>
          Staff Selection Commission forms typically require a recent colour photograph within a
          stated pixel range and under a maximum file size. Candidates often need a separate
          signature file as well. Use this page to resize a clear photo, then verify the downloaded
          file dimensions and size before upload.
        </p>
        <h2>Related tools</h2>
        <ul>
          <li><Link href="/tools/signature-resizer">Signature Resizer</Link></li>
          <li><Link href="/tools/image-compressor">Image Compressor</Link></li>
          <li><Link href="/exams/upsc-photo-resizer">UPSC Photo Resizer</Link></li>
          <li><Link href="/exams/mpsc-photo-resizer">MPSC Photo Resizer</Link></li>
        </ul>
      </article>
    </div>
  );
}
