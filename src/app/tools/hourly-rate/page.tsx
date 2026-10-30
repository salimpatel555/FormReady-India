import { HourlyRate } from "@/components/tools/HourlyRate";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "hourly-rate";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <HourlyRate />
    </ToolPageShell>
  );
}
