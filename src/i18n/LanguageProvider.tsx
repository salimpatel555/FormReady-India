"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type Locale, defaultLocale, locales } from "./config";

import en from "@/messages/en.json";


type Messages = typeof en;

/** Right-to-left scripts (Urdu, Sindhi, Kashmiri). */
const RTL_LOCALES: readonly string[] = ["ur", "sd", "ks"];

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function lookup(obj: Record<string, unknown>, path: string): string | undefined {
  let current: unknown = obj;
  for (const part of path.split(".")) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("formready-locale") as Locale | null;
      if (saved && (locales as readonly string[]).includes(saved)) {
        setLocaleState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem("formready-locale", next);
    } catch {
      // ignore
    }
  }, []);

  // Keep <html lang> and text direction in sync (also when restored from localStorage).
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  }, [locale]);

  // English ships with the page; other languages load on demand so the first load stays small.
  const [loaded, setLoaded] = useState<{ locale: string; data: Messages }>({ locale: "en", data: en });

  useEffect(() => {
    if (locale === "en") {
      setLoaded({ locale: "en", data: en });
      return;
    }
    let cancelled = false;
    import(`@/messages/${locale}.json`)
      .then((mod) => {
        if (!cancelled) setLoaded({ locale, data: mod.default as Messages });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ locale: "en", data: en });
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const messages = loaded.data;

  // Missing keys in a translation fall back to English instead of showing the raw key.
  const t = useCallback(
    (key: string) =>
      lookup(messages as unknown as Record<string, unknown>, key) ??
      lookup(en as unknown as Record<string, unknown>, key) ??
      key,
    [messages]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return ctx;
}
