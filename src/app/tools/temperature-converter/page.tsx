import { TemperatureConverter } from "@/components/tools/TemperatureConverter";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "temperature-converter";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <TemperatureConverter />
    </ToolPageShell>
  );
}
