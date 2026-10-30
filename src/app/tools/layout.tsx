import type { Metadata } from "next";
import { siteUrl, siteName } from "@/data/seo";

export const metadata: Metadata = {
  title: "Free Online Tools for Government Exam Photos & Documents",
  description:
    "Browse free browser-based tools to resize photos and signatures, compress images, convert PDF files and calculate EMI for Indian government job applications.",
  alternates: { canonical: `${siteUrl}/tools` },
  openGraph: {
    title: `All Tools | ${siteName}`,
    description:
      "Photo resizer, signature tools, image compressor, PDF utilities and EMI calculator — private and free.",
    url: `${siteUrl}/tools`,
    siteName,
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
