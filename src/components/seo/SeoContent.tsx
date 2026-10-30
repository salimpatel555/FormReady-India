import Link from "next/link";
import type { ToolSeo } from "@/data/seo";

export function SeoContent({ seo, related }: { seo: ToolSeo; related?: { href: string; label: string }[] }) {
  return (
    <article className="mt-16 border-t border-border pt-12 prose prose-slate dark:prose-invert max-w-none">
      <h2 className="text-xl font-bold tracking-tight text-foreground not-prose">
        About this tool
      </h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">{seo.intro}</p>

      {seo.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h3 className="text-lg font-semibold text-foreground not-prose">{section.heading}</h3>
          <p className="mt-2 text-muted-foreground leading-relaxed">{section.body}</p>
        </section>
      ))}

      {seo.faqs.length > 0 && (
        <section className="mt-10">
          <h3 className="text-lg font-semibold text-foreground not-prose">Frequently asked questions</h3>
          <dl className="mt-4 space-y-4">
            {seo.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border bg-card p-4">
                <dt className="font-medium text-foreground">{faq.question}</dt>
                <dd className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related && related.length > 0 && (
        <section className="mt-10">
          <h3 className="text-lg font-semibold text-foreground not-prose">Related tools</h3>
          <ul className="mt-3 list-disc pl-5 text-indigo-600 dark:text-indigo-400">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="hover:underline">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-xs text-muted-foreground">
        Disclaimer: Official exam photo and document requirements change. Always verify sizes and formats
        against the latest notification from the recruiting body before submitting an application.
      </p>
    </article>
  );
}
