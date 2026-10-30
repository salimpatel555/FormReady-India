import { PanValidator } from "@/components/tools/PanValidator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "pan-validator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PanValidator />
    </ToolPageShell>
  );
}
