import { HtmlStripper } from "@/components/tools/HtmlStripper";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "html-stripper";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <HtmlStripper />
    </ToolPageShell>
  );
}
