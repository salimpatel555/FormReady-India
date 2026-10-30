import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Photo Size, Privacy & Form Uploads",
  description: "Answers about photo sizes for SSC and UPSC, browser privacy, supported formats and how FormReady India tools work.",
  alternates: { canonical: "https://formreadyindia.com/faq" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
