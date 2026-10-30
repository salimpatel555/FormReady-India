import { PercentageCalculator } from "@/components/tools/PercentageCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "percentage-calculator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PercentageCalculator />
    </ToolPageShell>
  );
}
