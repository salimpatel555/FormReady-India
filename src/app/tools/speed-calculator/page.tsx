import { SpeedCalculator } from "@/components/tools/SpeedCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "speed-calculator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <SpeedCalculator />
    </ToolPageShell>
  );
}
