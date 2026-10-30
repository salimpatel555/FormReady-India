import { BreakEvenCalculator } from "@/components/tools/BreakEvenCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "break-even";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <BreakEvenCalculator />
    </ToolPageShell>
  );
}
