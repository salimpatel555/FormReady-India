import { MarginMarkup } from "@/components/tools/MarginMarkup";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "margin-markup";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <MarginMarkup />
    </ToolPageShell>
  );
}
