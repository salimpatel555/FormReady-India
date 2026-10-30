import { QuadraticSolver } from "@/components/tools/QuadraticSolver";
import { ToolPageShell } from "@/components/seo/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const slug = "quadratic-solver";

export const metadata = buildToolMetadata(slug);

export default function Page() {
  return (
    <ToolPageShell slug={slug}>
      <QuadraticSolver />
    </ToolPageShell>
  );
}
