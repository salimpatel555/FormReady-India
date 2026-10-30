import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact FormReady India to report a bug, suggest a tool or ask about privacy. We reply to emails within a few working days.",
  alternates: { canonical: "https://formreadyindia.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h1>
      <p className="mt-4 text-muted-foreground">
        Found a bug, spotted outdated exam information, or want a new tool added? We read every message.
      </p>
      <div className="mt-8 space-y-3 rounded-xl border border-border bg-muted/50 p-6">
        <p className="text-sm text-muted-foreground">Email</p>
        <p className="font-medium text-foreground">
          <a className="text-indigo-600 hover:underline dark:text-indigo-400" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          Operated by {siteConfig.ownerName}, {siteConfig.location}. We usually reply within 2 to 3 working days.
        </p>
      </div>
      <h2 className="mt-10 text-xl font-semibold text-foreground">Before you write</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>We are not a government body or exam authority and cannot confirm your eligibility or application status.</li>
        <li>For a bug report, include the tool name, your browser and what you expected to happen.</li>
        <li>Never email us your Aadhaar, PAN or other ID numbers. We do not need them.</li>
      </ul>
    </div>
  );
}
