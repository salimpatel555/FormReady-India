import { PercentageIncrease } from "@/components/tools/PercentageIncrease";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "percentage-increase";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PercentageIncrease />
    </ToolPageShell>
  );
}
