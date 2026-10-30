import { PdfToText } from "@/components/tools/PdfToText";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "pdf-to-text";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PdfToText />
    </ToolPageShell>
  );
}
