import { Loader } from "@/components/ui/Loader";

/** Shown instantly while a page is loading after any click, so the site never feels frozen. */
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <Loader label="Loading" size="lg" />
    </div>
  );
}
