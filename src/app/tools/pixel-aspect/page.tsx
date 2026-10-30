import { PixelAspect } from "@/components/tools/PixelAspect";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "pixel-aspect";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PixelAspect />
    </ToolPageShell>
  );
}
