/**
 * Loads pdfjs-dist with a locally bundled worker (no CDN), so files never leave the browser
 * and the worker version always matches the library version.
 */
export async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  return pdfjs;
}

export function pdfErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "name" in err) {
    const name = String((err as { name: unknown }).name);
    if (name === "PasswordException") {
      return "This PDF is password-protected. Remove the password first and try again.";
    }
    if (name === "InvalidPDFException") {
      return "This file is not a valid PDF or is corrupted.";
    }
  }
  return err instanceof Error && err.message ? err.message : fallback;
}
