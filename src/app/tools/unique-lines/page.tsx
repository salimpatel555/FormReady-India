import { UniqueLines } from "@/components/tools/UniqueLines";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "unique-lines";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <UniqueLines />
    </ToolPageShell>
  );
}
