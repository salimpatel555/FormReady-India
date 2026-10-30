import { DayOfWeek } from "@/components/tools/DayOfWeek";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "day-of-week";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <DayOfWeek />
    </ToolPageShell>
  );
}
