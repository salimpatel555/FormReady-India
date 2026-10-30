"use client";

import { useMemo, useState } from "react";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const readingMin = words / 200;
    return { words, chars, charsNoSpace, sentences, paragraphs, readingMin };
  }, [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Paste or type your essay, application answer or notes…"
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          ["Words", stats.words],
          ["Characters", stats.chars],
          ["No spaces", stats.charsNoSpace],
          ["Sentences", stats.sentences],
          ["Paragraphs", stats.paragraphs],
          ["Read time", `${stats.readingMin < 1 ? "< 1" : stats.readingMin.toFixed(1)} min`],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
