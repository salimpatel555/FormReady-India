import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How FormReady India handles your files, cookies, analytics and advertising. Image and PDF tools run in your browser and files are not uploaded.",
  alternates: { canonical: "https://formreadyindia.com/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: {siteConfig.lastReviewed}</p>
      <p>
        {siteConfig.name} (“we”, “us”) provides free online tools at {siteConfig.url}. This policy explains what
        information is handled when you use the site. By using the site you agree to this policy.
      </p>

      <h2>Your files stay on your device</h2>
      <p>
        The photo resizer, signature resizer, image compressor, PDF tools and similar utilities run in your web
        browser using JavaScript. The files you select are read on your device and are not sent to our servers.
        Temporary in-memory links are created while you work and are released afterwards.
      </p>

      <h2>Information we may collect</h2>
      <ul>
        <li>Standard server and hosting logs such as IP address, browser type, device type and pages visited, used for security and performance.</li>
        <li>Anonymous usage statistics (for example page views) if analytics is enabled.</li>
        <li>Your language and theme choices, stored in your browser’s local storage.</li>
        <li>Details you choose to send us by email, such as your name, address and message.</li>
      </ul>
      <p>We do not ask you to create an account and we do not sell personal information.</p>

      <h2>Cookies and local storage</h2>
      <p>
        We use local storage for preferences such as language and theme. Third-party services we use, including
        analytics and advertising partners, may set cookies as described below.
      </p>

      <h2>Advertising and Google AdSense</h2>
      <p>
        We may show ads served by Google AdSense or similar partners. Google, as a third-party vendor, uses cookies
        to serve ads based on your previous visits to this and other websites. Google’s use of advertising cookies
        enables it and its partners to serve ads to you based on your visit to our site and other sites on the
        internet.
      </p>
      <ul>
        <li>
          You can opt out of personalised advertising by visiting{" "}
          <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>.
        </li>
        <li>
          You can also opt out of some third-party vendors’ use of cookies for personalised advertising at{" "}
          <a href="https://www.aboutads.info" rel="noopener noreferrer" target="_blank">aboutads.info</a>.
        </li>
        <li>
          Learn how Google uses information from sites that use its services at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
            policies.google.com/technologies/partner-sites
          </a>.
        </li>
      </ul>
      <p>
        Where required by law (for example for visitors in the European Economic Area, the United Kingdom or
        Switzerland), we ask for your consent before personalised ads or non-essential cookies are used.
      </p>

      <h2>Third-party links</h2>
      <p>
        Our pages may link to official government and exam websites. We do not control those sites and are not
        responsible for their content or privacy practices.
      </p>

      <h2>Children</h2>
      <p>
        The site is intended for a general audience and is not directed at children under 13. We do not knowingly
        collect personal information from children.
      </p>

      <h2>Your choices</h2>
      <p>
        You can clear local storage and cookies in your browser at any time. To ask about data we may hold, email us
        at <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The date at the top shows when it was last revised.</p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </div>
  );
}
