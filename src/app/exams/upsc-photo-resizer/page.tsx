import type { Metadata } from "next";
import Link from "next/link";
import { PhotoResizer } from "@/components/tools/PhotoResizer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { siteUrl, siteName } from "@/data/seo";

export const metadata: Metadata = {
  title: "UPSC Photo Resizer – Civil Services Application Photo Tool",
  description:
    "Resize photos for UPSC Civil Services and other UPSC online applications. Example dimensions only — verify the official UPSC notification. Free and private.",
  keywords: [
    "UPSC photo resizer",
    "UPSC photo size",
    "UPSC CSE photograph dimensions",
    "resize photo for UPSC form",
  ],
  alternates: { canonical: `${siteUrl}/exams/upsc-photo-resizer` },
  openGraph: {
    title: "UPSC Photo Resizer | FormReady India",
    description: "Prepare UPSC application photos in your browser. Always match the official notice.",
    url: `${siteUrl}/exams/upsc-photo-resizer`,
    siteName,
  },
};

export default function UpscPhotoResizerPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UPSC Photo Resizer",
    url: `${siteUrl}/exams/upsc-photo-resizer`,
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
        <span className="text-foreground">UPSC Photo Resizer</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          UPSC Photo Resizer
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Help prepare photographs for UPSC Civil Services and related online applications.
          Enter the exact width, height and quality needed for the cycle you are applying to.
        </p>
      </header>

      <div className="mb-8 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <p>
          <strong>Not official UPSC guidance.</strong> Photo specifications are published in each
          examination notice. Confirm every requirement on the official UPSC website before submission.
        </p>
      </div>

      <PhotoResizer defaultWidth={200} defaultHeight={230} title="UPSC Photo Resizer" />

      <article className="mt-14 prose prose-slate dark:prose-invert max-w-none">
        <h2>UPSC photo preparation tips</h2>
        <p>
          Use a recent, clear photograph with adequate lighting and a plain background when required.
          After resizing, open the downloaded file and confirm pixel size and file size in KB match
          the notice. Pair with our signature resizer if a separate signature file is required.
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
