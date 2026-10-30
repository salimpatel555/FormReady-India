import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms of use for FormReady India free online tools.",
  alternates: { canonical: "https://formreadyindia.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
      <h1>Terms and Conditions</h1>
      <p>Last updated: October 2025</p>
      <p>
        By using FormReady India you agree to these terms. The tools are provided
        free of charge on an “as is” basis.
      </p>
      <h2>Acceptable use</h2>
      <p>
        You may use the tools for personal, non-commercial preparation of
        documents for examination and job applications. You must not use the
        service to process illegal content or to attempt to disrupt the website.
      </p>
      <h2>No warranty</h2>
      <p>
        We do not guarantee that any resized or compressed image will be accepted
        by a particular recruitment portal. Official requirements can change and
        portals may apply additional validation. Always verify dimensions and
        file-size limits with the official notification.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, FormReady India and its operators
        shall not be liable for any indirect, incidental or consequential damages
        arising from the use of the tools, including rejection of an application.
      </p>
    </div>
  );
}
