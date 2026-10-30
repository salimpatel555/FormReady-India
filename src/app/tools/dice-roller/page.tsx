import { DiceRoller } from "@/components/tools/DiceRoller";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "dice-roller";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <DiceRoller />
    </ToolPageShell>
  );
}
