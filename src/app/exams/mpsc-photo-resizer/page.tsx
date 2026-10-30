import type { Metadata } from "next";
import Link from "next/link";
import { PhotoResizer } from "@/components/tools/PhotoResizer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { siteUrl, siteName } from "@/data/seo";

export const metadata: Metadata = {
  title: "MPSC Photo Resizer – Maharashtra PSC Application Photos",
  description:
    "Resize photos for MPSC and Maharashtra government job applications. Example sizes only — verify the official MPSC notification. Free, private, browser-based.",
  keywords: [
    "MPSC photo resizer",
    "MPSC photo size",
    "Maharashtra PSC photograph",
    "resize photo for MPSC form",
  ],
  alternates: { canonical: `${siteUrl}/exams/mpsc-photo-resizer` },
  openGraph: {
    title: "MPSC Photo Resizer | FormReady India",
    description: "Prepare MPSC application photos locally in your browser.",
    url: `${siteUrl}/exams/mpsc-photo-resizer`,
    siteName,
  },
};

export default function MpscPhotoResizerPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MPSC Photo Resizer",
    url: `${siteUrl}/exams/mpsc-photo-resizer`,
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
        <span className="text-foreground">MPSC Photo Resizer</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          MPSC Photo Resizer
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Prepare photographs for Maharashtra Public Service Commission and related state
          recruitment forms. Set dimensions from the official advertisement for your post.
        </p>
      </header>

      <div className="mb-8 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <p>
          <strong>Example defaults only.</strong> MPSC and department-level notices may differ.
          Always follow the photo and signature rules in the notification you are applying under.
        </p>
      </div>

      <PhotoResizer defaultWidth={200} defaultHeight={230} title="MPSC Photo Resizer" />

      <article className="mt-14 prose prose-slate dark:prose-invert max-w-none">
        <h2>MPSC applicants</h2>
        <p>
          Keep a high-quality original photo, resize a copy for the form, and store both safely.
          Use Marathi language UI from the header if preferred while preparing documents.
        </p>
        <h2>Related tools</h2>
        <ul>
          <li><Link href="/tools/signature-resizer">Signature Resizer</Link></li>
          <li><Link href="/exams/ssc-photo-resizer">SSC Photo Resizer</Link></li>
          <li><Link href="/tools/image-compressor">Image Compressor</Link></li>
        </ul>
      </article>
    </div>
  );
}
