"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Loader2, Trash2, Upload, ImageIcon } from "lucide-react";
import { IGalleryImage } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "power", label: "Power & Electrical" },
  { value: "security", label: "Security Systems" },
  { value: "networking", label: "Networking" },
  { value: "assessment", label: "Assessments" },
  { value: "design", label: "System Design" },
  { value: "general", label: "General" },
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<IGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setImages(data.images || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview || !title.trim()) {
      setError("Please select an image and enter a title.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileBase64: preview, title: title.trim(), category }),
      });
      if (!res.ok) throw new Error("Upload failed");
      setPreview(null);
      setTitle("");
      setCategory("general");
      if (fileRef.current) fileRef.current.value = "";
      await fetchImages();
    } catch {
      setError("Upload failed. Check your Cloudinary configuration.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((i) => i._id !== id));
    setDeleting(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-white uppercase">
          Gallery
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {images.length} image{images.length !== 1 ? "s" : ""} in your portfolio
        </p>
      </div>

      {/* Upload form */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="font-display text-xl font-700 text-white uppercase mb-5">
          Upload New Image
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* File picker */}
          <div>
            <label
              htmlFor="file-upload"
              className={cn(
                "flex flex-col items-center justify-center gap-3 h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all",
                preview
                  ? "border-brand-green/50 bg-brand-green/5"
                  : "border-white/20 hover:border-brand-green/40 hover:bg-white/5"
              )}
            >
              {preview ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                </div>
              ) : (
                <>
                  <Upload size={28} className="text-gray-500" />
                  <span className="text-gray-500 text-xs text-center px-4">
                    Click to select image<br />(JPG, PNG, WebP — max 10MB)
                  </span>
                </>
              )}
            </label>
            <input
              id="file-upload"
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Metadata */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Image Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. CCTV Installation — Karen Residence"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm outline-none focus:border-brand-green bg-brand-darker"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading || !preview || !title.trim()}
              className="mt-auto flex items-center justify-center gap-2 bg-brand-green text-white py-3 rounded-xl font-semibold text-sm hover:bg-brand-green-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {uploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} /> Upload to Cloudinary
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Images grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-brand-green" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
          <p>No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-brand-darker/0 group-hover:bg-brand-darker/70 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={deleting === img._id}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2.5 bg-red-500/80 text-white rounded-lg hover:bg-red-600"
                  >
                    {deleting === img._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-white text-xs font-medium truncate">{img.title}</p>
                <p className="text-gray-500 text-xs capitalize">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
