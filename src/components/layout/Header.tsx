"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useTheme } from "@/i18n/ThemeProvider";
import { locales, localeNames, type Locale } from "@/i18n/config";

function ThemeSwitch({
  theme,
  onToggle,
  size = "md",
}: {
  theme: "light" | "dark";
  onToggle: () => void;
  size?: "sm" | "md";
}) {
  const isDark = theme === "dark";
  const track = size === "sm" ? "h-6 w-11" : "h-7 w-12";
  const thumb = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const thumbOn = size === "sm" ? "translate-x-6" : "translate-x-6";
  const thumbOff = "translate-x-1";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        track,
        isDark ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      role="switch"
      aria-checked={isDark}
    >
      {/* Icons inside track */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={cn(iconSize, "text-amber-400 transition-opacity duration-300", isDark ? "opacity-40" : "opacity-100")} />
        <Moon className={cn(iconSize, "text-indigo-200 transition-opacity duration-300", isDark ? "opacity-100" : "opacity-40")} />
      </span>
      <span
        className={cn(
          "pointer-events-none inline-block transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out",
          thumb,
          isDark ? thumbOn : thumbOff
        )}
      />
    </button>
  );
}

export function Header() {
  const { t, locale, setLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { label: t("common.home"), href: "/" },
    { label: t("common.allTools"), href: "/tools" },
    {
      label: t("common.examPrep"),
      href: "#",
      children: [
        { label: "SSC Photo Resizer", href: "/exams/ssc-photo-resizer" },
        { label: "UPSC Photo Resizer", href: "/exams/upsc-photo-resizer" },
        { label: "MPSC Photo Resizer", href: "/exams/mpsc-photo-resizer" },
      ],
    },
    { label: "Guides", href: "/guides" },
    { label: t("common.about"), href: "/about" },
    { label: t("common.contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-sm shadow-black/5 dark:shadow-black/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt="FormReady India"
            width={36}
            height={36}
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            FormReady <span className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">India</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-muted">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block pt-1">
                  <div className="w-56 rounded-lg border border-border bg-card py-1 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-muted"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Desktop theme switch */}
          <div className="ml-2 flex items-center gap-2 px-2">
            <ThemeSwitch theme={theme} onToggle={toggleTheme} size="md" />
          </div>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-muted"
              aria-label={t("common.language")}
            >
              <Globe className="h-4 w-4" />
              {localeNames[locale]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 max-h-80 overflow-y-auto rounded-lg border border-border bg-card py-1 shadow-lg z-50">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLocale(l as Locale);
                      setLangOpen(false);
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm hover:bg-muted",
                      locale === l
                        ? "text-indigo-600 dark:text-indigo-400 font-medium"
                        : "text-foreground/80"
                    )}
                  >
                    {localeNames[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitch theme={theme} onToggle={toggleTheme} size="sm" />
          <button
            className="p-2 text-foreground/80"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-foreground/80"
                    onClick={() => setExamOpen(!examOpen)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition", examOpen && "rotate-180")}
                    />
                  </button>
                  {examOpen && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-muted-foreground"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-foreground/80"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Dark mode row in mobile menu */}
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground/80">
                <span className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-indigo-500" />
                  )}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </span>
                <ThemeSwitch theme={theme} onToggle={toggleTheme} size="sm" />
              </div>
            </div>

            <div className="border-t border-border pt-2 mt-1">
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase">
                {t("common.language")}
              </p>
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l as Locale);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "block w-full px-3 py-2 text-left text-sm",
                    locale === l
                      ? "text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-foreground/80"
                  )}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
