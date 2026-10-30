import { WhiteBackground } from "@/components/tools/WhiteBackground";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "white-background";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <WhiteBackground />
    </ToolPageShell>
  );
}
