import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "password-generator";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PasswordGenerator />
    </ToolPageShell>
  );
}
