import { ListRandomizer } from "@/components/tools/ListRandomizer";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "list-randomizer";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <ListRandomizer />
    </ToolPageShell>
  );
}
