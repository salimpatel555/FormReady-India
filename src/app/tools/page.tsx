"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";
import {
  Camera,
  PenTool,
  Minimize2,
  FileImage,
  Info,
  Calculator,
  LayoutGrid,
  FileText,
  Files,
  Contrast,
  ArrowRight,
  Search,
  X,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  camera: <Camera className="h-6 w-6" />,
  "pen-tool": <PenTool className="h-6 w-6" />,
  "minimize-2": <Minimize2 className="h-6 w-6" />,
  "file-image": <FileImage className="h-6 w-6" />,
  info: <Info className="h-6 w-6" />,
  calculator: <Calculator className="h-6 w-6" />,
  "layout-grid": <LayoutGrid className="h-6 w-6" />,
  "file-text": <FileText className="h-6 w-6" />,
  files: <Files className="h-6 w-6" />,
  contrast: <Contrast className="h-6 w-6" />,
};

const categories = [
  { id: "all", label: "All" },
  { id: "image", label: "Image" },
  { id: "document", label: "Document" },
  { id: "calculator", label: "Calculator" },
] as const;

export default function ToolsPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchCat = category === "all" || tool.category === category;
      const matchQ =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("tools.title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("tools.subtitle")}
        </p>
      </header>

      {/* Search + filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition",
                category === c.id
                  ? "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500"
                  : "border border-border bg-card text-muted-foreground hover:border-indigo-300 hover:text-foreground dark:hover:border-indigo-700"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <p className="text-muted-foreground">No tools match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="card-premium group relative border border-border p-6 shadow-sm"
            >
              {tool.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Popular
                </span>
              )}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/10 text-indigo-600 group-hover:from-indigo-500/25 group-hover:to-violet-500/20 dark:text-indigo-400">
                {iconMap[tool.icon] || <Camera className="h-6 w-6" />}
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {tool.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {tool.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {t("common.openTool")}
                <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
