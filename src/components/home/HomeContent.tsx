"use client";

import Link from "next/link";
import { tools, examPresets } from "@/data/tools";
import {
  Camera, PenTool, Minimize2, FileImage, Info, Calculator, LayoutGrid,
  FileText, Files, Contrast, Shield, Zap, Smartphone, ArrowRight,
  Sparkles, Lock, CheckCircle2, Star, Globe2,
} from "lucide-react";
import { useTranslation } from "@/i18n/LanguageProvider";

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

const popular = tools.filter((t) => t.popular);

export function HomeContent() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh relative border-b border-border">
        <div className="hero-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-300/50 bg-white/70 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur-md dark:border-indigo-700/50 dark:bg-indigo-950/50 dark:text-indigo-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              {t("home.badge")}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.15]">
              {t("home.title")}{" "}
              <span className="gradient-text">{t("home.titleHighlight")}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("home.subtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link
                href="/tools/government-photo-resizer"
                className="gradient-btn inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-semibold"
              >
                {t("home.ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/80 px-8 py-3.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:border-indigo-400 hover:shadow-md dark:hover:border-indigo-600"
              >
                {t("home.ctaSecondary")}
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
              {[
                { icon: Lock, label: t("home.privacyTitle") },
                { icon: Zap, label: t("home.fastTitle") },
                { icon: Smartphone, label: t("home.mobileTitle") },
                { icon: Globe2, label: "21 languages" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="stat-pill text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: Shield, title: t("home.privacyTitle"), desc: t("home.privacyDesc"), ring: "from-emerald-400 to-teal-500", bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
            { icon: Zap, title: t("home.fastTitle"), desc: t("home.fastDesc"), ring: "from-amber-400 to-orange-500", bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
            { icon: Smartphone, title: t("home.mobileTitle"), desc: t("home.mobileDesc"), ring: "from-indigo-400 to-violet-500", bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
          ].map((f) => (
            <div key={f.title} className="card-premium border border-border p-7 shadow-sm">
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${f.bg}`}>
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular tools */}
      <section className="relative border-y border-border py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                Featured
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {t("home.popularTools")}
              </h2>
              <p className="mt-2 text-muted-foreground">{t("home.popularSubtitle")}</p>
            </div>
            <Link
              href="/tools"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm transition hover:border-indigo-300 dark:text-indigo-400 dark:hover:border-indigo-700"
            >
              {t("home.viewAll")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="card-premium group border border-border p-6 shadow-sm"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-pink-500/10 p-3 text-indigo-600 dark:text-indigo-400">
                    {iconMap[tool.icon] || <Camera className="h-6 w-6" />}
                  </div>
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    Popular
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {tool.description}
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {t("common.openTool")}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exam helpers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {t("home.examHelpers")}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.examHelpersSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {examPresets.map((exam) => (
            <Link
              key={exam.id}
              href={exam.href}
              className="card-premium group border border-border p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {exam.id}
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {exam.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{exam.description}</p>
              <p className="mt-4 rounded-xl border border-amber-200/60 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/40 dark:text-amber-300">
                {exam.note}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/25 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-foreground">
            {t("home.howItWorks")}
          </h2>
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Connector line on desktop */}
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-0.5 bg-gradient-to-r from-indigo-500/20 via-violet-500/40 to-indigo-500/20 md:block" />
            {[
              { step: "01", title: t("home.step1Title"), desc: t("home.step1Desc") },
              { step: "02", title: t("home.step2Title"), desc: t("home.step2Desc") },
              { step: "03", title: t("home.step3Title"), desc: t("home.step3Desc") },
            ].map((s) => (
              <div key={s.step} className="relative text-center">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 opacity-20 blur-md" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-bold text-white shadow-lg shadow-indigo-500/30">
                    {s.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-16 text-center shadow-2xl shadow-indigo-500/25">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.12),transparent_55%)]" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {t("home.ctaBottomTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-indigo-100 sm:text-lg">
              {t("home.ctaBottomSubtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tools/government-photo-resizer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-700 shadow-xl transition hover:scale-[1.02] hover:bg-indigo-50"
              >
                {t("home.ctaBottomButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                <CheckCircle2 className="h-4.5 w-4.5" />
                Free · Private · No signup
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
