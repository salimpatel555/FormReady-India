import { RemoveExtraSpaces } from "@/components/tools/RemoveExtraSpaces";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "remove-extra-spaces";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <RemoveExtraSpaces />
    </ToolPageShell>
  );
}
