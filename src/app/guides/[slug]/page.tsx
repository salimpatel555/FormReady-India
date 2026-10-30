import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { guides, getGuide } from "@/data/guides";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteName, siteUrl } from "@/data/seo";
import { AdSlot } from "@/components/ads/AdSlot";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const url = `${siteUrl}/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: g.title, description: g.description, siteName, publishedTime: g.published },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const url = `${siteUrl}/guides/${g.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    datePublished: g.published,
    dateModified: g.published,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: siteName },
    publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` } },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
      { "@type": "ListItem", position: 3, name: g.title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={crumbLd} />
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{g.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {g.readMinutes} min read · Updated {new Date(g.published).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{g.intro}</p>

      {g.sections.map((s, i) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground">{s.heading}</h2>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 30)} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
          ))}
          {s.steps && (
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground">
              {s.steps.map((st) => (
                <li key={st}>{st}</li>
              ))}
            </ol>
          )}
          {i === 1 && <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE} />}
        </section>
      ))}

      <section className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
        <h2 className="text-lg font-semibold text-foreground">Tools mentioned in this guide</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-indigo-600 dark:text-indigo-400">
          {g.tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="hover:underline">{t.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
        <dl className="mt-4 space-y-4">
          {g.faqs.map((f) => (
            <div key={f.question} className="rounded-xl border border-border bg-card p-4">
              <dt className="font-medium text-foreground">{f.question}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        Disclaimer: requirements change between recruitment cycles. Always confirm sizes, formats and dates in the latest official notification.
      </p>
    </article>
  );
}
