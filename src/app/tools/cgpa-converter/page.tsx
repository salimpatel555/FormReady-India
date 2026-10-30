import { CgpaConverter } from "@/components/tools/CgpaConverter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "cgpa-converter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <CgpaConverter />
    </ToolPageShell>
  );
}
