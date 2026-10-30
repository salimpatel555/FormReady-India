"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { Loader } from "@/components/ui/Loader";
import { downloadBlob } from "@/lib/utils";

export function TextToPdf() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [pageSize, setPageSize] = useState<"a4" | "letter">("a4");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text.trim()) {
      toast("Please enter some text", "error");
      return;
    }
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: pageSize,
      });
      const margin = 16;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const maxWidth = pageWidth - margin * 2;
      let y = margin;

      if (title.trim()) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        const titleLines = doc.splitTextToSize(title.trim(), maxWidth);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 7 + 4;
        doc.setFont("helvetica", "normal");
      }

      doc.setFontSize(11);
      const paragraphs = text.replace(/\r\n/g, "\n").split("\n");
      for (const para of paragraphs) {
        const lines = doc.splitTextToSize(para.length ? para : " ", maxWidth);
        for (const line of lines) {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += 6;
        }
        y += 2;
      }

      const blob = doc.output("blob");
      const name = (title.trim() || "document").replace(/[^\w\-]+/g, "_").slice(0, 40);
      downloadBlob(blob, `${name}.pdf`);
      toast("PDF downloaded successfully");
    } catch (e) {
      console.error(e);
      toast("Failed to create PDF", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Title (optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document title"
          className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Text content</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          placeholder="Paste or type the text you want in the PDF…"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <p className="mt-1 text-xs text-muted-foreground">{text.length.toLocaleString("en-IN")} characters</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Page size</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as "a4" | "letter")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={loading || !text.trim()}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? <Loader size="sm" label="" /> : <FileText className="h-4 w-4" />}
          {loading ? "Creating…" : "Download PDF"}
        </button>
      </div>
    </div>
  );
}
