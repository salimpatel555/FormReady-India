import { FactorialCalculator } from "@/components/tools/FactorialCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "factorial-calculator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <FactorialCalculator />
    </ToolPageShell>
  );
}
