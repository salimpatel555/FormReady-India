import { RomanNumerals } from "@/components/tools/RomanNumerals";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "roman-numerals";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <RomanNumerals />
    </ToolPageShell>
  );
}
