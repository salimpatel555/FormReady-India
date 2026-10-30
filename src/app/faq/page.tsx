"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const faqs = [
  {
    q: "Are my photos uploaded to a server?",
    a: "No. All photo resizing, compression and PDF tools run entirely in your browser. Your files never leave your device.",
  },
  {
    q: "What photo size do I need for SSC / UPSC?",
    a: "Requirements change with each notification. Always check the latest official advertisement. Our tools let you set any width, height and file size in KB so you can match the current rules.",
  },
  {
    q: "Is FormReady India free?",
    a: "Yes. The tools are free to use. We may show non-intrusive ads in the future to support hosting costs.",
  },
  {
    q: "Which image formats are supported?",
    a: "Most tools accept JPG, PNG and WebP. Output can usually be JPG or PNG. Image to PDF and PDF tools work with common PDF files.",
  },
  {
    q: "Can I use this on my phone?",
    a: "Yes. The site is mobile-friendly. You can upload photos from your gallery and download the result.",
  },
  {
    q: "Why is the compressed file still large?",
    a: "Try a lower target size (KB), reduce max dimensions, or switch to WebP when the portal allows it. Very small targets may need more aggressive quality reduction.",
  },
  {
    q: "Do you store my language or theme preference?",
    a: "Preferences are saved only in your browser (localStorage). We do not collect them on a server.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-muted-foreground">
          Quick answers about privacy, exam photo sizes and how the tools work.
        </p>
      </header>

      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground hover:bg-muted/50"
              >
                {item.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
