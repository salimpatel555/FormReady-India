import { GstCalculator } from "@/components/tools/GstCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "gst-calculator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <GstCalculator />
    </ToolPageShell>
  );
}
