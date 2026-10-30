import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SeoContent } from "@/components/seo/SeoContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { toolSeo } from "@/data/seo";
import { tools } from "@/data/tools";
import { siteConfig } from "@/data/site";
import { buildWebApplicationJsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export function ToolPageShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const seo = toolSeo[slug];
  const self = tools.find((t) => t.href === `/tools/${slug}`);
  const related = tools
    .filter((t) => t.href !== `/tools/${slug}` && self && t.category === self.category)
    .sort((a, b) => Number(!!b.popular) - Number(!!a.popular))
    .slice(0, 5)
    .map((t) => ({ href: t.href, label: t.name }));

  const faqLd = buildFaqJsonLd(seo);
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: seo.h1, path: seo.path },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={buildWebApplicationJsonLd(seo)} />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd data={breadcrumbLd} />

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

      {children}

      <SeoContent seo={seo} related={related} />
      <p className="mt-6 text-xs text-muted-foreground">Last reviewed: {siteConfig.lastReviewed}</p>
    </div>
  );
}
