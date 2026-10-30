import { RuleOfThree } from "@/components/tools/RuleOfThree";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "rule-of-three";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <RuleOfThree />
    </ToolPageShell>
  );
}
