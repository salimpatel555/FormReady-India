import { TextCaseConverter } from "@/components/tools/TextCaseConverter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "text-case-converter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TextCaseConverter />
    </ToolPageShell>
  );
}
