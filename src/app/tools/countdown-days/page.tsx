import { CountdownDays } from "@/components/tools/CountdownDays";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "countdown-days";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <CountdownDays />
    </ToolPageShell>
  );
}
