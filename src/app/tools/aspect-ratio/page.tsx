import { AspectRatioCalculator } from "@/components/tools/AspectRatioCalculator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "aspect-ratio";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <AspectRatioCalculator />
    </ToolPageShell>
  );
}
