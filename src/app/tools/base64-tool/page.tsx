import { Base64Tool } from "@/components/tools/Base64Tool";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "base64-tool";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <Base64Tool />
    </ToolPageShell>
  );
}
