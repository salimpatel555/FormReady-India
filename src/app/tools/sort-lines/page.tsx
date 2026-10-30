import { SortLines } from "@/components/tools/SortLines";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "sort-lines";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <SortLines />
    </ToolPageShell>
  );
}
