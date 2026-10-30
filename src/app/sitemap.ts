import type { MetadataRoute } from "next";
import { siteUrl, staticPages, toolSeo } from "@/data/seo";
import { tools } from "@/data/tools";
import { guides } from "@/data/guides";

const LAST_MOD = new Date("2026-10-30");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${siteUrl}${page.path === "/" ? "" : page.path}`,
    lastModified: LAST_MOD,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.priority,
  }));

  // Prefer catalogue hrefs so new tools are always included
  const toolPaths = new Set<string>([
    ...Object.values(toolSeo).map((t) => t.path),
    ...tools.map((t) => t.href),
  ]);

  const toolEntries: MetadataRoute.Sitemap = [...toolPaths].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: LAST_MOD,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const examEntries: MetadataRoute.Sitemap = [
    "/exams/ssc-photo-resizer",
    "/exams/upsc-photo-resizer",
    "/exams/mpsc-photo-resizer",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: LAST_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const guideEntries: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${siteUrl}/guides/${g.slug}`,
    lastModified: LAST_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...toolEntries, ...examEntries, ...guideEntries];
}
