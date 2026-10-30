export interface ToolSeoShape {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

/** Compact builder so every tool gets unique, structured SEO content. */
export function x(
  slug: string,
  h1: string,
  title: string,
  description: string,
  keywords: string[],
  intro: string,
  how: string,
  use: string,
  faqs: [string, string][],
): ToolSeoShape {
  return {
    path: `/tools/${slug}`,
    title,
    description,
    keywords,
    h1,
    intro,
    sections: [
      { heading: `How to use the ${h1}`, body: how },
      { heading: "When this tool is useful", body: use },
    ],
    faqs: faqs.map(([question, answer]) => ({ question, answer })),
  };
}
