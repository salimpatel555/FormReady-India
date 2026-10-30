import { RandomNumber } from "@/components/tools/RandomNumber";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "random-number";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <RandomNumber />
    </ToolPageShell>
  );
}
