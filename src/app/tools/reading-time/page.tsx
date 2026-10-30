import { ReadingTime } from "@/components/tools/ReadingTime";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "reading-time";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <ReadingTime />
    </ToolPageShell>
  );
}
