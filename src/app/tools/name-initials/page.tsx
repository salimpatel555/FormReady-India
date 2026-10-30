import { NameInitials } from "@/components/tools/NameInitials";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "name-initials";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <NameInitials />
    </ToolPageShell>
  );
}
