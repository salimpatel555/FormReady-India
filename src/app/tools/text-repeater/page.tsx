import { TextRepeater } from "@/components/tools/TextRepeater";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "text-repeater";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TextRepeater />
    </ToolPageShell>
  );
}
