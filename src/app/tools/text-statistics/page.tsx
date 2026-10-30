import { TextStatistics } from "@/components/tools/TextStatistics";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "text-statistics";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TextStatistics />
    </ToolPageShell>
  );
}
