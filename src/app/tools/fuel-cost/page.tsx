import { FuelCost } from "@/components/tools/FuelCost";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "fuel-cost";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <FuelCost />
    </ToolPageShell>
  );
}
