import { DateDifference } from "@/components/tools/DateDifference";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "date-difference";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <DateDifference />
    </ToolPageShell>
  );
}
