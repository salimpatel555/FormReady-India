import { CompoundInterest } from "@/components/tools/CompoundInterest";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "compound-interest";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <CompoundInterest />
    </ToolPageShell>
  );
}
