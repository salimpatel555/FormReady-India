import { TextReverse } from "@/components/tools/TextReverse";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "text-reverse";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TextReverse />
    </ToolPageShell>
  );
}
