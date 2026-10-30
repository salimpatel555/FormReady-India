import type { Metadata } from "next";
import {
  Inter,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Noto_Sans_Kannada,
  Noto_Sans_Gujarati,
  Noto_Sans_Bengali,
  Noto_Sans_Malayalam,
  Noto_Sans_Oriya,
  Noto_Sans_Gurmukhi,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/i18n/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { siteConfig } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoDevanagari = Noto_Sans_Devanagari({ preload: false, subsets: ["devanagari"], variable: "--font-devanagari", display: "swap", weight: ["400", "500", "600", "700"] });
const notoTamil = Noto_Sans_Tamil({ preload: false, subsets: ["tamil"], variable: "--font-tamil", display: "swap", weight: ["400", "500", "600", "700"] });
const notoTelugu = Noto_Sans_Telugu({ preload: false, subsets: ["telugu"], variable: "--font-telugu", display: "swap", weight: ["400", "500", "600", "700"] });
const notoKannada = Noto_Sans_Kannada({ preload: false, subsets: ["kannada"], variable: "--font-kannada", display: "swap", weight: ["400", "500", "600", "700"] });
const notoGujarati = Noto_Sans_Gujarati({ preload: false, subsets: ["gujarati"], variable: "--font-gujarati", display: "swap", weight: ["400", "500", "600", "700"] });
const notoBengali = Noto_Sans_Bengali({ preload: false, subsets: ["bengali"], variable: "--font-bengali", display: "swap", weight: ["400", "500", "600", "700"] });
const notoMalayalam = Noto_Sans_Malayalam({ preload: false, subsets: ["malayalam"], variable: "--font-malayalam", display: "swap", weight: ["400", "500", "600", "700"] });
const notoOriya = Noto_Sans_Oriya({ preload: false, subsets: ["oriya"], variable: "--font-oriya", display: "swap", weight: ["400", "500", "600", "700"] });
const notoGurmukhi = Noto_Sans_Gurmukhi({ preload: false, subsets: ["gurmukhi"], variable: "--font-gurmukhi", display: "swap", weight: ["400", "500", "600", "700"] });
const notoArabic = Noto_Naskh_Arabic({ preload: false, subsets: ["arabic"], variable: "--font-arabic", display: "swap", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    default: "FormReady India – Free Photo & Signature Tools for Government Exams",
    template: "%s | FormReady India",
  },
  description:
    "Free browser-based tools to resize photos, signatures and compress images for SSC, UPSC, banking, railway and other Indian government job applications. Privacy-first — no uploads to servers.",
  keywords: [
    "photo resizer for government forms",
    "SSC photo size",
    "UPSC signature resize",
    "image compressor for exams",
    "passport photo maker India",
    "government job application photo",
    "PDF merge online free",
    "EMI calculator India",
  ],
  authors: [{ name: "FormReady India" }],
  creator: "FormReady India",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://formreadyindia.com",
    siteName: "FormReady India",
    title: "FormReady India – Free Photo & Signature Tools for Government Exams",
    description:
      "Resize photos and signatures for Indian government exams. Process everything locally in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FormReady India – Free Photo & Signature Tools for Government Exams",
    description:
      "Resize photos and signatures for Indian government exams. Process everything locally in your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL("https://formreadyindia.com"),
  verification: siteConfig.googleVerification ? { google: siteConfig.googleVerification } : undefined,
  icons: {
    icon: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoDevanagari.variable} ${notoTamil.variable} ${notoTelugu.variable} ${notoKannada.variable} ${notoGujarati.variable} ${notoBengali.variable} ${notoMalayalam.variable} ${notoOriya.variable} ${notoGurmukhi.variable} ${notoArabic.variable}`}
    >
      <head>
        <AdSenseScript />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
