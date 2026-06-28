"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { IBlog } from "@/types";
import RichTextEditor from "@/components/admin/RichTextEditor";

export interface BlogFormPayload {
  title: string;
  excerpt: string;
  content: string;
  coverImageBase64: string | null;
  published: boolean;
}

function isContentEmpty(html: string): boolean {
  return !html.replace(/<[^>]*>/g, "").trim();
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function BlogForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: IBlog;
  submitLabel: string;
  onSubmit: (payload: BlogFormPayload) => Promise<void>;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [coverPreview, setCoverPreview] = useState<string | null>(initial?.coverImage.url ?? null);
  const [coverBase64, setCoverBase64] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    setCoverBase64(base64);
    setCoverPreview(base64);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || isContentEmpty(content)) {
      setError("Title, excerpt, and content are required.");
      return;
    }
    if (!coverPreview) {
      setError("Please select a cover image.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImageBase64: coverBase64,
        published,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 5 Signs Your Backup Generator Needs Servicing"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Excerpt *</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="A short summary shown in post listings"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Content *</label>
          <RichTextEditor value={content} onChange={setContent} placeholder="Write the full post..." />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <label className="block text-xs font-medium text-gray-400 mb-2">Cover Image *</label>
        <label
          htmlFor="cover-upload"
          className={cn(
            "flex flex-col items-center justify-center gap-3 h-44 rounded-xl border-2 border-dashed cursor-pointer transition-all",
            coverPreview
              ? "border-brand-green/50 bg-brand-green/5"
              : "border-white/20 hover:border-brand-green/40 hover:bg-white/5"
          )}
        >
          {coverPreview ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
            </div>
          ) : (
            <>
              <Upload size={28} className="text-gray-500" />
              <span className="text-gray-500 text-xs">Click to select cover image</span>
            </>
          )}
        </label>
        <input
          id="cover-upload"
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverChange}
        />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">Published</p>
          <p className="text-gray-500 text-xs mt-0.5">
            {published ? "Visible on the public site" : "Saved as a draft"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPublished((v) => !v)}
          className={cn(
            "relative w-12 h-7 rounded-full transition-all flex-shrink-0",
            published ? "bg-brand-green" : "bg-white/15"
          )}
        >
          <span
            className={cn(
              "absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform",
              published && "translate-x-5"
            )}
          />
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 bg-brand-green text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-green-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Saving...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
