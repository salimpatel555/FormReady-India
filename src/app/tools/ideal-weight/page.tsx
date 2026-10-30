import { IdealWeight } from "@/components/tools/IdealWeight";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "ideal-weight";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <IdealWeight />
    </ToolPageShell>
  );
}
