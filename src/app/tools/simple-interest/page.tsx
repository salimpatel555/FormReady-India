import { SimpleInterest } from "@/components/tools/SimpleInterest";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "simple-interest";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <SimpleInterest />
    </ToolPageShell>
  );
}
