import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About FormReady India – Privacy-First Exam Tools",
  description:
    "FormReady India offers free, browser-based photo, signature, PDF and calculator tools for Indian government exam and job applicants. Learn who we are and how the tools work.",
  alternates: { canonical: "https://formreadyindia.com/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">About FormReady India</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          FormReady India is a free toolkit for students and job seekers who need to prepare photographs,
          signatures and documents for Indian government exams and recruitment forms. A rejected upload because of
          a few extra KB or the wrong pixel size is a small problem that costs people time, and we built these tools
          to remove it.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">What you can do here</h2>
        <p>
          Resize photos and signatures, compress images to a KB limit, convert between JPG, PNG and PDF, merge
          documents, and use more than eighty small calculators and text utilities. Browse everything on the{" "}
          <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href="/tools">tools page</Link> or
          read our step-by-step{" "}
          <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href="/guides">guides</Link>.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">Privacy by design</h2>
        <p>
          Image and PDF tools run in your browser. Your files are not uploaded to our servers, which matters when
          the file is an ID-style photo or a signature. Read the{" "}
          <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href="/privacy-policy">privacy policy</Link>.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">How we keep content accurate</h2>
        <p>
          Exam requirements change between recruitment cycles, so we avoid hard-coding sizes as facts. Our guides
          explain the method and tell you to confirm the numbers in the latest official notification. Calculators
          show the formula they use so you can check the result yourself.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">Who runs the site</h2>
        <p>
          {siteConfig.name} is operated by {siteConfig.ownerName}, {siteConfig.location}. We are an independent
          project and are not affiliated with SSC, UPSC, MPSC or any government department. Reach us on the{" "}
          <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href="/contact">contact page</Link>.
        </p>
        <p>
          <strong className="text-foreground">Important:</strong> always cross-check the latest notification from the
          recruiting authority before submitting your application.
        </p>
      </div>
    </div>
  );
}
