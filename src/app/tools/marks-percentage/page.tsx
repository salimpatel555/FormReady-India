import { MarksPercentage } from "@/components/tools/MarksPercentage";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "marks-percentage";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <MarksPercentage />
    </ToolPageShell>
  );
}
