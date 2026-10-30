import { AreaConverter } from "@/components/tools/AreaConverter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "area-converter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <AreaConverter />
    </ToolPageShell>
  );
}
