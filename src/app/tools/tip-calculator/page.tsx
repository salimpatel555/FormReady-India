import { TipCalculator } from "@/components/tools/TipCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "tip-calculator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TipCalculator />
    </ToolPageShell>
  );
}
