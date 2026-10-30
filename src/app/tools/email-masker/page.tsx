import { EmailMasker } from "@/components/tools/EmailMasker";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "email-masker";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <EmailMasker />
    </ToolPageShell>
  );
}
