import { HoursConverter } from "@/components/tools/HoursConverter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "hours-converter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <HoursConverter />
    </ToolPageShell>
  );
}
