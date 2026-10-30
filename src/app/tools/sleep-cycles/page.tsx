import { SleepCycles } from "@/components/tools/SleepCycles";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "sleep-cycles";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <SleepCycles />
    </ToolPageShell>
  );
}
