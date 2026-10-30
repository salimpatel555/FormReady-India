import { NumberToWords } from "@/components/tools/NumberToWords";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "number-to-words";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <NumberToWords />
    </ToolPageShell>
  );
}
