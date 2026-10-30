import { UrlEncodeTool } from "@/components/tools/UrlEncodeTool";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "url-encode";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <UrlEncodeTool />
    </ToolPageShell>
  );
}
