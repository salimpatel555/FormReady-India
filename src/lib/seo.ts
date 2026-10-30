import type { Metadata } from "next";
import { siteName, siteUrl, toolSeo, type ToolSeo } from "@/data/seo";

export function buildToolMetadata(slug: string): Metadata {
  const seo = toolSeo[slug];
  if (!seo) {
    return { title: siteName };
  }
  const url = `${siteUrl}${seo.path}`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName,
      title: seo.title,
      description: seo.description,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: { index: true, follow: true },
  };
}

export function buildWebApplicationJsonLd(seo: ToolSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seo.h1,
    url: `${siteUrl}${seo.path}`,
    description: seo.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function buildFaqJsonLd(seo: ToolSeo) {
  if (!seo.faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
