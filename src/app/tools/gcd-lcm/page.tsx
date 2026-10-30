import { GcdLcm } from "@/components/tools/GcdLcm";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "gcd-lcm";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <GcdLcm />
    </ToolPageShell>
  );
}
