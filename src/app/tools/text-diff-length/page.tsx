import { TextDiffLength } from "@/components/tools/TextDiffLength";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "text-diff-length";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TextDiffLength />
    </ToolPageShell>
  );
}
