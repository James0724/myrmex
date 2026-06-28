"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Loader2, Upload, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { IProject, ProjectCategory } from "@/types";

export interface ProjectFormPayload {
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  coverImageBase64: string | null;
  newImagesBase64: string[];
  removeImagePublicIds: string[];
}

const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "power-electricals", label: "Power & Electricals" },
  { value: "security", label: "Security" },
  { value: "networking", label: "Networking" },
];

interface ExistingImage {
  url: string;
  publicId: string;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProjectForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: IProject;
  submitLabel: string;
  onSubmit: (payload: ProjectFormPayload) => Promise<void>;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<ProjectCategory>(
    initial?.category ?? "power-electricals"
  );
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [coverPreview, setCoverPreview] = useState<string | null>(initial?.coverImage.url ?? null);
  const [coverBase64, setCoverBase64] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>(initial?.images ?? []);
  const [removedPublicIds, setRemovedPublicIds] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<{ preview: string; base64: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    setCoverBase64(base64);
    setCoverPreview(base64);
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const encoded = await Promise.all(files.map(readFileAsBase64));
    setNewImages((prev) => [...prev, ...encoded.map((base64) => ({ preview: base64, base64 }))]);
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  };

  const removeExistingImage = (publicId: string) => {
    setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
    setRemovedPublicIds((prev) => [...prev, publicId]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) {
      setError("Title and short description are required.");
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
        category,
        shortDescription: shortDescription.trim(),
        coverImageBase64: coverBase64,
        newImagesBase64: newImages.map((img) => img.base64),
        removeImagePublicIds: removedPublicIds,
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
            placeholder="e.g. CCTV Installation — Karen Residence"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            className="w-full px-4 py-3 rounded-xl bg-brand-darker border border-white/15 text-white text-sm outline-none focus:border-brand-green transition-all"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">
            Short Description *
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={3}
            placeholder="A brief summary of this project"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all resize-none"
          />
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

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <label className="block text-xs font-medium text-gray-400 mb-3">
          Gallery Images
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          {existingImages.map((img) => (
            <div key={img.publicId} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
              <Image src={img.url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeExistingImage(img.publicId)}
                className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {newImages.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-brand-green/40 group">
              <Image src={img.preview} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <label
            htmlFor="images-upload"
            className="aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-brand-green/40 hover:bg-white/5 cursor-pointer flex items-center justify-center transition-all"
          >
            <Plus size={20} className="text-gray-500" />
          </label>
        </div>
        <input
          id="images-upload"
          ref={imagesInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImagesChange}
        />
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
