import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides for Photo, Signature & Document Uploads",
  description:
    "Step-by-step guides for resizing photos, preparing signatures, fixing upload errors and calculating exam age eligibility for Indian applications.",
  alternates: { canonical: "https://formreadyindia.com/guides" },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Guides</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Practical, step-by-step help for preparing photos, signatures and documents for online applications.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug} className="rounded-2xl border border-border bg-card p-5 transition hover:shadow-md">
            <Link href={`/guides/${g.slug}`} className="block">
              <h2 className="text-lg font-semibold text-foreground">{g.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{g.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">{g.readMinutes} min read</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
