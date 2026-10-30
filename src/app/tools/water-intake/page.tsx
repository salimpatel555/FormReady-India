import { WaterIntake } from "@/components/tools/WaterIntake";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "water-intake";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <WaterIntake />
    </ToolPageShell>
  );
}
