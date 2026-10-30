import { LeapYearChecker } from "@/components/tools/LeapYearChecker";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "leap-year";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <LeapYearChecker />
    </ToolPageShell>
  );
}
