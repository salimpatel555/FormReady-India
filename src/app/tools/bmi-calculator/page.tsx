import { BmiCalculator } from "@/components/tools/BmiCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "bmi-calculator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <BmiCalculator />
    </ToolPageShell>
  );
}
