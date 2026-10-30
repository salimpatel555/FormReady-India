/**
 * Central place for details that Google AdSense reviewers look for.
 * Replace the values marked REPLACE with your real details before applying.
 */
export const siteConfig = {
  name: "FormReady India",
  url: "https://formreadyindia.com",
  // REPLACE: a real mailbox on your own domain (e.g. support@formreadyindia.com)
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@formreadyindia.com",
  // REPLACE: the person or company that runs the site
  ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || "FormReady India Team",
  // REPLACE: city / state shown on the About and Contact pages
  location: process.env.NEXT_PUBLIC_LOCATION || "India",
  lastReviewed: "October 2026",
  // AdSense publisher id like ca-pub-1234567890123456 (set in .env.local after approval)
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  // Google Search Console HTML-tag verification token (content value only)
  googleVerification: process.env.NEXT_PUBLIC_GSC_TOKEN || "",
};
