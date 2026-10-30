import { TextToPdf } from "@/components/tools/TextToPdf";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "text-to-pdf";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TextToPdf />
    </ToolPageShell>
  );
}
