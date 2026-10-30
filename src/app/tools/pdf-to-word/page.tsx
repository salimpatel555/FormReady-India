import { PdfToWord } from "@/components/tools/PdfToWord";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "pdf-to-word";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PdfToWord />
    </ToolPageShell>
  );
}
