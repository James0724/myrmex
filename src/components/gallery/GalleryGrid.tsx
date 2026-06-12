"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, ImageOff } from "lucide-react";
import { IGalleryImage } from "@/types";
import { cn } from "@/lib/utils";

const SERVICE_LABELS: Record<string, string> = {
  all: "All Projects",
  power: "Power & Electrical",
  security: "Security Systems",
  networking: "Networking",
  assessment: "Assessments",
  design: "System Design",
  general: "General",
};

export default function GalleryGrid() {
  const [images, setImages] = useState<IGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<IGalleryImage | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setImages(d.images || []))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", ...Array.from(new Set(images.map((i) => i.category)))];
  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((i) => i.category === activeCategory);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium transition-all",
              activeCategory === cat
                ? "bg-brand-green text-white"
                : "bg-gray-100 text-gray-500 hover:bg-brand-green/10 hover:text-brand-green"
            )}
          >
            {SERVICE_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={32} className="animate-spin text-brand-green" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <ImageOff size={48} className="mb-4 opacity-30" />
          <p className="text-sm">No images yet in this category.</p>
          <p className="text-xs mt-1">Check back soon — we&apos;re adding project photos.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img) => (
            <button
              key={img._id}
              onClick={() => setLightbox(img)}
              className="break-inside-avoid w-full group relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer block"
            >
              <div className="relative w-full" style={{ paddingBottom: "66.66%" }}>
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-darker/0 group-hover:bg-brand-darker/50 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-semibold text-sm">{img.title}</p>
                    <p className="text-xs text-white/70 capitalize">{img.category}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm"
            >
              Close ✕
            </button>
            <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image
                src={lightbox.url}
                alt={lightbox.title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <p className="text-white text-center mt-3 font-medium">{lightbox.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
