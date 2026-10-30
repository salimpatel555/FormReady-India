import { ImageRotate } from "@/components/tools/ImageRotate";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "image-rotate";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <ImageRotate />
    </ToolPageShell>
  );
}
