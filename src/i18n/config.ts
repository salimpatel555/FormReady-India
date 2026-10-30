export const locales = [
  "en", "hi", "mr", "ta", "te", "kn", "gu",
  "bn", "ml", "or", "pa", "ur", "as", "ne",
  "sa", "kok", "mai", "doi", "brx", "sd", "ks",
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
  ta: "தமிழ்",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  gu: "ગુજરાતી",
  bn: "বাংলা",
  ml: "മലയാളം",
  or: "ଓଡ଼ିଆ",
  pa: "ਪੰਜਾਬੀ",
  ur: "اردو",
  as: "অসমীয়া",
  ne: "नेपाली",
  sa: "संस्कृतम्",
  kok: "कोंकणी",
  mai: "मैथिली",
  doi: "डोगरी",
  brx: "बड़ो",
  sd: "سنڌي",
  ks: "کٲشُر",
};
