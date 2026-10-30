export interface GuideSection {
  heading: string;
  paragraphs: string[];
  steps?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  published: string;
  readMinutes: number;
  intro: string;
  sections: GuideSection[];
  tools: { href: string; label: string }[];
  faqs: { question: string; answer: string }[];
}

export const guides: Guide[] = [
  {
    slug: "reduce-photo-size-in-kb-for-online-forms",
    title: "How to Reduce Photo Size in KB for Online Application Forms",
    description:
      "A practical method to bring a phone photo under a 20 KB, 50 KB or 100 KB limit without making it look bad. Resize first, then adjust quality.",
    published: "2026-10-30",
    readMinutes: 5,
    intro:
      "Government and exam portals often reject a photo because the file is larger than the stated limit. A modern phone photo can be several megabytes, so the fix is to shrink it in the right order. This guide explains the method so you can apply it to any limit in any notification.",
    sections: [
      {
        heading: "Why phone photos are so large",
        paragraphs: [
          "A typical phone camera produces an image thousands of pixels wide. Application forms usually need only a few hundred pixels, so most of the file is detail the portal never uses. File size depends on two things: how many pixels the picture has, and how strongly it is compressed.",
        ],
      },
      {
        heading: "The order that gives the best result",
        paragraphs: ["Change pixel dimensions first, then fine-tune quality. Doing it the other way round forces heavy compression and produces blocky faces."],
        steps: [
          "Read the notification and note the required width, height (or cm size) and the maximum KB.",
          "Resize the photo to those pixel dimensions with the Government Form Photo Resizer.",
          "If the file is still too large, lower the JPG quality in small steps, for example from 90 to 80 to 70.",
          "If you are only slightly over the limit, use the Image Compressor with a target KB instead.",
          "Check the final dimensions and size with the Image Dimensions Checker before uploading.",
        ],
      },
      {
        heading: "What to avoid",
        paragraphs: [
          "Do not stretch a photo to fit the required size. Crop to the right proportion first so faces are not distorted. Avoid re-saving a JPG many times, since each save adds compression. Start again from the original photo if you need a different size.",
          "Also avoid filters and heavy editing. Many portals ask for an unedited, recent photograph, and compression artefacts on a filtered image look worse than on a plain one.",
        ],
      },
      {
        heading: "Lower limits need simpler photos",
        paragraphs: [
          "Plain backgrounds compress far better than busy ones. If you must hit a very small limit, use an even-lit photo against a plain wall. Detail such as patterned clothing and textured backgrounds costs more bytes.",
        ],
      },
    ],
    tools: [
      { href: "/tools/government-photo-resizer", label: "Government Form Photo Resizer" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-info", label: "Image Dimensions Checker" },
    ],
    faqs: [
      { question: "Should I change dimensions or quality first?", answer: "Change dimensions first. Matching the required pixel size usually removes most of the file size, and quality tweaks can finish the job." },
      { question: "Why does my photo look blurry after compressing?", answer: "Either the quality was set too low or a small image was enlarged. Start from the original and resize down, never up." },
    ],
  },
  {
    slug: "jpg-vs-png-for-application-forms",
    title: "JPG vs PNG for Online Application Forms: Which Should You Use?",
    description:
      "Understand the difference between JPG and PNG, why most portals ask for JPG, and when PNG is the better choice.",
    published: "2026-10-30",
    readMinutes: 4,
    intro:
      "Most recruitment portals ask for JPG or JPEG images, and a few ask for PNG. Knowing why helps you choose correctly and avoid upload errors.",
    sections: [
      {
        heading: "How JPG and PNG differ",
        paragraphs: [
          "JPG uses lossy compression. It discards detail the eye barely notices, which makes photographs much smaller. PNG uses lossless compression, so every pixel is preserved, but photographs end up much larger. PNG also supports transparent backgrounds, which JPG does not.",
        ],
      },
      {
        heading: "Which one should you pick?",
        paragraphs: ["Follow the instruction on the form first. If it lists accepted formats, use one of them. If it only gives a KB limit, JPG is almost always the safer choice."],
        steps: [
          "Photographs and scanned signatures with a KB limit: JPG.",
          "Logos, line art and screenshots with sharp text: PNG.",
          "Anything that needs a transparent background: PNG.",
          "When the portal says JPEG or JPG: both names mean the same format.",
        ],
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Renaming a file from .png to .jpg does not convert it. Some portals detect the real content and reject the upload. Use a converter so the file is actually re-encoded.",
          "Converting a JPG to PNG does not restore lost quality. It only changes the container and usually makes the file larger.",
        ],
      },
    ],
    tools: [
      { href: "/tools/image-to-jpg", label: "Image to JPG Converter" },
      { href: "/tools/image-to-png", label: "Image to PNG" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
    ],
    faqs: [
      { question: "Is JPEG the same as JPG?", answer: "Yes. JPG is simply the shortened three-letter file extension." },
      { question: "Why is my PNG so big?", answer: "PNG does not discard detail, so photographs take more space. Convert to JPG when a KB limit applies." },
    ],
  },
  {
    slug: "how-to-prepare-signature-for-online-form",
    title: "How to Prepare a Clean Signature Image for Online Forms",
    description:
      "Sign, scan, crop and resize your signature so it passes automatic checks on exam and job portals.",
    published: "2026-10-30",
    readMinutes: 4,
    intro:
      "A signature image is small, but it is often rejected for shadows, low contrast or the wrong dimensions. A few careful steps fix most problems.",
    sections: [
      {
        heading: "Capture a clear signature",
        paragraphs: ["Use plain white paper and a black or dark blue pen. Photograph it in daylight or a scanner app, holding the phone parallel to the page so the signature is not skewed. Avoid shadows from your hand or phone."],
      },
      {
        heading: "Step-by-step preparation",
        paragraphs: ["Work in this order to keep the file small and sharp."],
        steps: [
          "Crop tightly around the signature so there is little empty space.",
          "Use the White Background Maker if the paper looks grey or yellow.",
          "Resize to the width and height in the notification with the Signature Resizer.",
          "Save as JPG unless the form asks otherwise, then check the KB limit.",
          "Preview the image at full size to confirm the strokes are still clear.",
        ],
      },
      {
        heading: "Troubleshooting",
        paragraphs: [
          "If the signature looks faint, sign again with a darker pen rather than boosting contrast heavily. If the upload is rejected for dimensions, verify the exact pixel size using the Image Dimensions Checker. Some forms require the signature to be in the candidate's own handwriting, so do not use typed or stylised text.",
        ],
      },
    ],
    tools: [
      { href: "/tools/signature-resizer", label: "Signature Resizer" },
      { href: "/tools/white-background", label: "White Background Maker" },
      { href: "/tools/image-info", label: "Image Dimensions Checker" },
    ],
    faqs: [
      { question: "Can I use a typed signature?", answer: "Usually not. Most recruitment forms ask for your handwritten signature, so follow the notification." },
      { question: "What pen colour is best?", answer: "Black or dark blue gives strong contrast on white paper." },
    ],
  },
  {
    slug: "fix-photo-upload-errors-on-government-portals",
    title: "Photo Upload Errors on Government Portals: Causes and Fixes",
    description:
      "Why exam and job portals reject photos, from size and format to orientation, and how to fix each problem before the deadline.",
    published: "2026-10-30",
    readMinutes: 5,
    intro:
      "Upload errors are stressful, especially close to a deadline. Nearly all of them come from a short list of causes that you can fix in minutes.",
    sections: [
      {
        heading: "Problem 1: the file is too large",
        paragraphs: ["Resize to the required pixel dimensions first, then lower the quality until the file is under the limit. Our guide on reducing photo size in KB explains the order in detail."],
      },
      {
        heading: "Problem 2: the dimensions are wrong",
        paragraphs: ["Check the exact width and height in the notification and compare them with your file using an image dimensions checker. If the shape is different, crop before resizing so the face is not stretched."],
      },
      {
        heading: "Problem 3: wrong format",
        paragraphs: ["If the form accepts only JPG, convert PNG, WebP or HEIC pictures to JPG. A renamed file is not a real conversion."],
      },
      {
        heading: "Problem 4: the photo is sideways",
        paragraphs: ["Phones store orientation in hidden data that some portals ignore. Rotate the image and save it again so the correct orientation is part of the pixels."],
      },
      {
        heading: "A pre-upload checklist",
        paragraphs: ["Run through this list before every upload."],
        steps: [
          "Dimensions match the notification.",
          "File size is under the KB limit with a small safety margin.",
          "Format is exactly what the form asks for.",
          "Face is centred and the background is plain, if required.",
          "The file opens normally on your computer.",
        ],
      },
    ],
    tools: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-rotate", label: "Image Rotate" },
      { href: "/tools/image-to-jpg", label: "Image to JPG Converter" },
      { href: "/tools/image-info", label: "Image Dimensions Checker" },
    ],
    faqs: [
      { question: "The portal still rejects my file. What next?", answer: "Re-check the latest notification, try a different browser, and make sure the file name has no special characters." },
      { question: "Should I leave a margin under the KB limit?", answer: "Yes. Aim a few KB below the limit in case the portal measures size differently." },
    ],
  },
  {
    slug: "calculate-age-for-exam-eligibility",
    title: "How to Calculate Your Age for Exam Eligibility",
    description:
      "Learn how age is counted against the cut-off date in recruitment notifications, with a worked example and common mistakes.",
    published: "2026-10-30",
    readMinutes: 4,
    intro:
      "Age limits in government recruitment are measured on a specific date, not on the day you apply. Understanding this prevents wrong eligibility assumptions.",
    sections: [
      {
        heading: "The cut-off date matters",
        paragraphs: ["Every notification states an 'as on' date. Your age is calculated between your date of birth and that date. Applying earlier or later in the cycle does not change the result."],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Suppose the notification fixes the age limit as 18 to 27 years as on 1 January 2027, and you were born on 15 March 2000. From 15 March 2000 to 1 January 2027 you are 26 years, 9 months and 17 days old, so you are within the limit. The Age Calculator does this arithmetic for any pair of dates.",
        ],
      },
      {
        heading: "Relaxations",
        paragraphs: ["Many exams add extra years of relaxation for certain categories. The rules differ by exam and cycle, so read the relaxation table in the official notification. Add the relaxation to the upper limit rather than subtracting it from your age."],
      },
      {
        heading: "Common mistakes",
        paragraphs: ["Using today's date instead of the cut-off date, mixing up date formats such as DD/MM and MM/DD, and ignoring leap years are the usual causes of errors. A calculator removes the leap-year risk."],
      },
    ],
    tools: [
      { href: "/tools/age-calculator", label: "Age Calculator" },
      { href: "/tools/date-difference", label: "Date Difference Calculator" },
      { href: "/tools/countdown-days", label: "Days Until Date" },
    ],
    faqs: [
      { question: "Does my age on the application date matter?", answer: "Usually no. The cut-off date in the notification decides eligibility." },
      { question: "Where do I find relaxation rules?", answer: "In the official notification or advertisement for that specific exam." },
    ],
  },
  {
    slug: "merge-documents-into-one-pdf-for-applications",
    title: "How to Merge Certificates and Documents into One PDF",
    description:
      "Combine scanned certificates, ID pages and photos into a single, correctly ordered PDF for online applications.",
    published: "2026-10-30",
    readMinutes: 4,
    intro:
      "Some portals accept only one PDF upload. Combining your documents neatly makes review easier and avoids rejection for missing pages.",
    sections: [
      {
        heading: "Prepare each document",
        paragraphs: ["Scan or photograph each page in good light and keep text readable. If a page is a photo, convert it to PDF first. Check that every page is upright before merging."],
      },
      {
        heading: "Merge in the right order",
        paragraphs: ["Order pages the way the notification lists documents, so the reviewer finds each item quickly."],
        steps: [
          "Convert photos of documents to PDF with the Image to PDF tool.",
          "Open PDF Merge and add all files.",
          "Reorder them to match the document list in the notification.",
          "Download the merged PDF and open it to confirm every page is present.",
          "Check the file size against the portal limit, and compress source images if needed.",
        ],
      },
      {
        heading: "Keep the file size down",
        paragraphs: ["Large scans make large PDFs. Compress the source images before conversion rather than after, and avoid scanning at unnecessarily high resolution. Password-protected PDFs need to be unlocked before they can be merged."],
      },
    ],
    tools: [
      { href: "/tools/pdf-merge", label: "PDF Merge" },
      { href: "/tools/image-to-pdf", label: "Image to PDF" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
    ],
    faqs: [
      { question: "Can I reorder pages after merging?", answer: "Arrange the files in the right order before merging, then merge again if you need a different order." },
      { question: "Are my documents uploaded?", answer: "No. Merging happens in your browser." },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
