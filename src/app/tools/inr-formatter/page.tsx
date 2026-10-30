import { InrFormatter } from "@/components/tools/InrFormatter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "inr-formatter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <InrFormatter />
    </ToolPageShell>
  );
}
