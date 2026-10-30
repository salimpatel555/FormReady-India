import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "FormReady India is not affiliated with any exam body or government department. Always verify requirements with the official notification.",
  alternates: { canonical: "https://formreadyindia.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
      <h1>Disclaimer</h1>
      <p>
        FormReady India is an independent informational and utility website. It
        is not affiliated with, endorsed by, or connected to the Staff Selection
        Commission (SSC), Union Public Service Commission (UPSC), any State Public
        Service Commission, Railway Recruitment Boards, banking recruitment
        agencies, or any other government body.
      </p>
      <p>
        All example dimensions and file-size suggestions provided on this site
        are illustrative only. Exact requirements are published in official
        notifications and may change without notice. Users are solely responsible
        for verifying current specifications before submitting applications.
      </p>
      <p>
        The tools are provided to assist with common image-preparation tasks.
        Results depend on the quality of the original file and the settings
        chosen by the user. We accept no responsibility for application rejection
        or any other consequences arising from the use of these tools.
      </p>
    </div>
  );
}
