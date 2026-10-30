import { WordFrequency } from "@/components/tools/WordFrequency";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "word-frequency";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <WordFrequency />
    </ToolPageShell>
  );
}
