import { UnitConverter } from "@/components/tools/UnitConverter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "unit-converter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <UnitConverter />
    </ToolPageShell>
  );
}
