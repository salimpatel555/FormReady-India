"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.svg" alt="FormReady India" width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-bold text-foreground">
                FormReady India
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t("footer.popularTools")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/government-photo-resizer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Government Photo Resizer
                </Link>
              </li>
              <li>
                <Link href="/tools/signature-resizer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Signature Resizer
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/emi-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  EMI Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t("footer.examPrep")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/exams/ssc-photo-resizer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  SSC Photo Resizer
                </Link>
              </li>
              <li>
                <Link href="/exams/upsc-photo-resizer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  UPSC Photo Resizer
                </Link>
              </li>
              <li>
                <Link href="/exams/mpsc-photo-resizer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  MPSC Photo Resizer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t("common.about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t("common.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t("common.terms")}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t("common.disclaimer")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {t("common.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FormReady India. {t("footer.copyright")}
          </p>
          <p className="text-xs text-muted-foreground">{t("footer.verifyNote")}</p>
        </div>
      </div>
    </footer>
  );
}
