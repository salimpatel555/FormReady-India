import { WordCounter } from "@/components/tools/WordCounter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "word-counter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <WordCounter />
    </ToolPageShell>
  );
}
