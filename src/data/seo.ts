import { extraToolSeo } from "./seo-extra";

export interface ToolSeo {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

export const siteUrl = "https://formreadyindia.com";
export const siteName = "FormReady India";

const baseToolSeo: Record<string, ToolSeo> = {
  "government-photo-resizer": {
    path: "/tools/government-photo-resizer",
    title: "Government Form Photo Resizer – SSC, UPSC, Banking | Free",
    description:
      "Free online photo resizer for Indian government forms. Set exact width, height and KB size for SSC, UPSC, IBPS, railway and police applications. 100% private, browser-based.",
    keywords: [
      "government form photo resizer",
      "SSC photo size",
      "UPSC photo resize online",
      "IBPS photo dimensions",
      "railway recruitment photo size",
      "photo resizer for government jobs India",
    ],
    h1: "Government Form Photo Resizer",
    intro:
      "Resize application photos to the exact pixel size and file size many Indian government job portals require. Work stays in your browser so your photo is not uploaded to our servers.",
    sections: [
      {
        heading: "Why applicants need a precise photo size",
        body: "SSC, UPSC, banking, railway and state PSC forms often specify both dimensions (for example 3.5 × 4.5 cm scanned to a fixed pixel size) and a maximum file size in KB. Uploading a phone photo as-is usually fails validation. This tool lets you set width, height and output quality so you can match the notification you are applying under.",
      },
      {
        heading: "How to use this photo resizer",
        body: "Upload a clear, recent photograph with a plain background when the form asks for it. Enter the width and height in pixels from the official advertisement, choose JPG for most portals, adjust quality if you must stay under a KB limit, then download and upload to the application site. Always double-check the latest official notification—sizes can change between cycles.",
      },
      {
        heading: "Privacy and processing",
        body: "Resizing runs on your device using the browser canvas. FormReady India does not store your image on a server for this tool. That makes it suitable when you prefer not to send ID-style photos to third-party websites.",
      },
    ],
    faqs: [
      {
        question: "What size photo do I need for SSC?",
        answer:
          "SSC notifications usually specify pixel dimensions and a maximum file size. Values differ by year and exam. Enter the numbers from your current advertisement into this tool rather than relying on a fixed preset.",
      },
      {
        question: "Should I use JPG or PNG?",
        answer:
          "Most government portals accept JPG. Use JPG unless the form specifically asks for PNG. JPG also makes it easier to meet strict KB limits.",
      },
    ],
  },
  "signature-resizer": {
    path: "/tools/signature-resizer",
    title: "Signature Resizer for Government Forms – Free Online",
    description:
      "Resize signature images for SSC, UPSC, bank and railway forms. Set exact pixels, add a white background, and download a form-ready signature. Private and free.",
    keywords: [
      "signature resizer online",
      "SSC signature size",
      "UPSC signature resize",
      "signature image for government form",
      "resize signature to KB",
    ],
    h1: "Signature Resizer",
    intro:
      "Prepare a clear signature scan or photo for online application forms. Crop, resize to required pixels, and keep the file small enough for portal limits.",
    sections: [
      {
        heading: "Tips for a clear signature image",
        body: "Sign with a black or blue pen on white paper, photograph or scan in good light, and avoid shadows. A white background helps automated form systems read the signature cleanly.",
      },
      {
        heading: "Matching portal requirements",
        body: "Many forms ask for a signature within a fixed box size and under a KB cap. Set width and height to the values in your notification, export as JPG when allowed, and lower quality slightly if the file is still too large.",
      },
    ],
    faqs: [
      {
        question: "Can I use a photo of my signature taken on a phone?",
        answer:
          "Yes, if the signature is sharp and the background is plain. Crop tightly around the signature before resizing to the required dimensions.",
      },
    ],
  },
  "image-compressor": {
    path: "/tools/image-compressor",
    title: "Image Compressor for Exam Forms – Reduce Size in KB",
    description:
      "Compress photos and signatures to meet KB limits for Indian exam and job portals. Target file size, keep usable quality, process offline in your browser.",
    keywords: [
      "image compressor KB",
      "compress photo for SSC",
      "reduce image size for government form",
      "photo under 50KB 100KB",
      "online image compressor India",
    ],
    h1: "Image Compressor",
    intro:
      "Shrink image files to a target size in kilobytes without opening desktop software. Useful when a portal rejects uploads above 20 KB, 50 KB or 100 KB.",
    sections: [
      {
        heading: "Balancing quality and file size",
        body: "Lower target sizes force stronger compression. Start with the KB limit from the form, preview the result, and only reduce further if the portal still rejects the file. Prefer resizing dimensions first when the photo is very large.",
      },
      {
        heading: "Browser-side compression",
        body: "Compression runs locally. Your file is not uploaded to FormReady India servers, which helps when working with personal application photos.",
      },
    ],
    faqs: [
      {
        question: "Why is my image still larger than the target?",
        answer:
          "Very detailed photos may not reach extremely low targets. Reduce max dimensions, try a lower quality setting, or use JPG instead of PNG.",
      },
    ],
  },
  "image-to-jpg": {
    path: "/tools/image-to-jpg",
    title: "Convert Image to JPG Online – Free & Private",
    description:
      "Convert PNG, WebP and other images to JPG for government and exam form uploads. Adjust quality and download instantly in your browser.",
    keywords: ["convert PNG to JPG", "image to JPG online", "WebP to JPG", "JPG converter for forms"],
    h1: "Image to JPG Converter",
    intro: "Many application portals only accept JPG. Convert PNG or WebP screenshots and exports to JPG with optional quality control.",
    sections: [
      {
        heading: "When to convert to JPG",
        body: "Use JPG when the form lists JPEG/JPG as the only allowed type, or when you need a smaller file than PNG for the same dimensions.",
      },
    ],
    faqs: [
      {
        question: "Will conversion reduce quality?",
        answer:
          "JPG is lossy. High quality settings keep most detail; lower settings shrink file size further for strict KB limits.",
      },
    ],
  },
  "image-info": {
    path: "/tools/image-info",
    title: "Image Dimensions Checker – Width, Height & File Size",
    description:
      "Check image width, height, file size and format before uploading to exam or job portals. Free online image info tool.",
    keywords: ["image dimensions checker", "check photo size pixels", "image width height online"],
    h1: "Image Dimensions Checker",
    intro: "Verify pixel size and file weight before you submit an application photo or signature.",
    sections: [
      {
        heading: "Avoid form validation errors",
        body: "Portals often reject files that are a few pixels off or slightly over the KB limit. Check dimensions here, then use our resizer or compressor if needed.",
      },
    ],
    faqs: [],
  },
  "image-grayscale": {
    path: "/tools/image-grayscale",
    title: "Convert Image to Grayscale / Black & White Online",
    description:
      "Convert colour photos or signatures to grayscale for forms that require black-and-white images. Free browser-based tool.",
    keywords: ["image to grayscale", "black and white photo converter", "grayscale for forms"],
    h1: "Image to Grayscale Converter",
    intro: "Some older forms or scanners prefer black-and-white images. Convert any colour image to grayscale in one step.",
    sections: [
      {
        heading: "When grayscale is required",
        body: "Follow the application instructions. If the form asks for a black-and-white photograph or signature scan, convert here, then resize or compress as needed.",
      },
    ],
    faqs: [],
  },
  "passport-photo-maker": {
    path: "/tools/passport-photo-maker",
    title: "Passport Photo Sheet Maker – Print Multiple Photos on A4",
    description:
      "Create a print-ready A4 sheet with multiple passport or application-size photos. Free online passport photo layout tool for India.",
    keywords: [
      "passport photo sheet maker",
      "multiple passport photos on A4",
      "print passport photos online India",
    ],
    h1: "Passport Photo Sheet Maker",
    intro: "Layout several identical photos on one page for printing at a studio or home printer.",
    sections: [
      {
        heading: "Printing tips",
        body: "Use high-quality photo paper when possible. Confirm the individual photo size matches your form or passport rules before printing a full sheet.",
      },
    ],
    faqs: [],
  },
  "image-to-pdf": {
    path: "/tools/image-to-pdf",
    title: "Image to PDF Converter – Combine Photos into One PDF",
    description:
      "Convert one or more images to a single PDF online. Choose page size and download instantly. Private, browser-based tool.",
    keywords: ["image to PDF", "JPG to PDF online", "combine images to PDF"],
    h1: "Image to PDF",
    intro: "Turn photos or scans into a PDF for uploads that require PDF attachments.",
    sections: [
      {
        heading: "Common uses",
        body: "Merge certificate photos, ID scans or multi-page document photos into one PDF before submitting an online form.",
      },
    ],
    faqs: [],
  },
  "pdf-to-image": {
    path: "/tools/pdf-to-image",
    title: "PDF to Image Converter – PNG or JPG Online",
    description:
      "Convert PDF pages to high-quality PNG or JPG images in your browser. Free PDF to image tool with no server upload.",
    keywords: ["PDF to image", "PDF to JPG", "PDF to PNG online"],
    h1: "PDF to Image",
    intro: "Export each PDF page as an image when a portal asks for JPG/PNG instead of PDF.",
    sections: [
      {
        heading: "Privacy note",
        body: "Rendering runs in the browser with PDF.js. Avoid using highly sensitive documents on shared devices.",
      },
    ],
    faqs: [],
  },
  "pdf-merge": {
    path: "/tools/pdf-merge",
    title: "Merge PDF Files Online – Combine Multiple PDFs Free",
    description:
      "Merge multiple PDF files into one document. Reorder files and download the combined PDF. Browser-based and private.",
    keywords: ["merge PDF online", "combine PDF files", "PDF joiner free"],
    h1: "PDF Merge",
    intro: "Join application annexures, certificates and forms into a single PDF in the order you choose.",
    sections: [
      {
        heading: "File limits",
        body: "For smooth performance in the browser, merge a moderate number of files. Password-protected PDFs may not merge until unlocked.",
      },
    ],
    faqs: [],
  },
  "emi-calculator": {
    path: "/tools/emi-calculator",
    title: "EMI Calculator India – Loan Monthly Payment Estimator",
    description:
      "Calculate EMI, total interest and total payment for personal, home or education loans. Free online EMI calculator for India.",
    keywords: ["EMI calculator India", "loan EMI calculator", "monthly EMI formula"],
    h1: "EMI Calculator",
    intro: "Estimate monthly instalments before you apply for a loan. Results are indicative and not a bank offer.",
    sections: [
      {
        heading: "How EMI is calculated",
        body: "EMI is derived from principal, annual interest rate and tenure. This calculator uses the standard reducing-balance formula commonly used for retail loans in India.",
      },
    ],
    faqs: [
      {
        question: "Is this calculator linked to a bank?",
        answer:
          "No. It is an independent estimator for planning only. Final EMI depends on the lender’s terms.",
      },
    ],
  },
};

export const toolSeo: Record<string, ToolSeo> = { ...baseToolSeo, ...extraToolSeo };

export const staticPages = [
  { path: "/", title: "FormReady India – Free Photo & Signature Tools for Government Exams", priority: 1 },
  { path: "/tools", title: "All Tools", priority: 0.9 },
  { path: "/about", title: "About", priority: 0.5 },
  { path: "/contact", title: "Contact", priority: 0.5 },
  { path: "/faq", title: "FAQ", priority: 0.7 },
  { path: "/guides", title: "Guides", priority: 0.8 },
  { path: "/privacy-policy", title: "Privacy Policy", priority: 0.3 },
  { path: "/terms", title: "Terms", priority: 0.3 },
  { path: "/disclaimer", title: "Disclaimer", priority: 0.3 },
];
