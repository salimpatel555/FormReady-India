import type { Metadata } from "next";
import Link from "next/link";
import { PassportPhotoMaker } from "@/components/tools/PassportPhotoMaker";
import { SeoContent } from "@/components/seo/SeoContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronRight } from "lucide-react";
import { toolSeo } from "@/data/seo";
import { buildToolMetadata, buildWebApplicationJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

const slug = "passport-photo-maker";
const seo = toolSeo[slug];
export const metadata: Metadata = buildToolMetadata(slug);

export default function Page() {
  const faqLd = buildFaqJsonLd(seo);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={buildWebApplicationJsonLd(seo)} />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }, { name: seo.h1, path: seo.path }])} />
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tools</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{seo.h1}</span>
      </nav>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{seo.h1}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{seo.intro}</p>
      </header>
      <PassportPhotoMaker />
      <SeoContent seo={seo} />
    </div>
  );
}
