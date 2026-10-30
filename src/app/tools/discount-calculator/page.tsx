import { DiscountCalculator } from "@/components/tools/DiscountCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "discount-calculator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <DiscountCalculator />
    </ToolPageShell>
  );
}
