import { ImageToPng } from "@/components/tools/ImageToPng";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "image-to-png";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <ImageToPng />
    </ToolPageShell>
  );
}
