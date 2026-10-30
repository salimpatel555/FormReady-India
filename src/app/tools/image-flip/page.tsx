import { ImageFlip } from "@/components/tools/ImageFlip";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "image-flip";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <ImageFlip />
    </ToolPageShell>
  );
}
