import type { Metadata } from "next";
import { HomeContent } from "@/components/home/HomeContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteName, siteUrl } from "@/data/seo";

export const metadata: Metadata = {
  title: "FormReady India – Free Photo & Signature Tools for Government Exams",
  description:
    "Free browser-based tools to resize photos and signatures for SSC, UPSC, MPSC, banking and railway forms. Compress images, merge PDFs and calculate EMI. Private — files stay on your device.",
  keywords: [
    "SSC photo resizer",
    "UPSC photo size",
    "MPSC photo resizer",
    "government form photo resize",
    "signature resizer online",
    "image compressor for exams",
    "FormReady India",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: "FormReady India – Free Photo & Signature Tools for Government Exams",
    description:
      "Resize photos and signatures for Indian government exams. Process everything locally in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FormReady India – Free Photo & Signature Tools for Government Exams",
    description:
      "Resize photos and signatures for Indian government exams. Private, free, no signup.",
  },
  robots: { index: true, follow: true },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description:
    "Free browser-based tools to resize photos, signatures and documents for Indian government job applications and competitive exams.",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={orgLd} />
      <HomeContent />
    </>
  );
}
