import { PalindromeChecker } from "@/components/tools/PalindromeChecker";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "palindrome-checker";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <PalindromeChecker />
    </ToolPageShell>
  );
}
