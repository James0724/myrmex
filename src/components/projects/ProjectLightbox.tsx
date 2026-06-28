"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IProject, ProjectCategory } from "@/types";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "power-electricals": "Power & Electricals",
  security: "Security",
  networking: "Networking",
};

export default function ProjectLightbox({
  project,
  initialIndex = 0,
  onClose,
}: {
  project: IProject;
  initialIndex?: number;
  onClose: () => void;
}) {
  const images = [project.coverImage, ...project.images];
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const active = images[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-white/10 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="text-white font-display font-700 uppercase text-base sm:text-lg truncate">
              {project.title}
            </h3>
            <span className="text-[10px] font-medium uppercase tracking-wide text-brand-green-muted bg-brand-green/15 px-2 py-0.5 rounded-full shrink-0">
              {CATEGORY_LABELS[project.category]}
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-0.5 truncate sm:max-w-xl">
            {project.shortDescription}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        >
          <X size={20} />
        </button>
      </div>

      {/* Body: thumbnail strip + main viewer */}
      <div className="flex-1 flex overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Thumbnail strip */}
        <div className="w-20 sm:w-28 shrink-0 border-r border-white/10 overflow-y-auto py-3 px-2 space-y-2">
          {images.map((img, i) => (
            <button
              key={img.publicId}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all",
                i === activeIndex
                  ? "border-brand-green ring-2 ring-brand-green/40"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={`${project.title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>

        {/* Main viewer */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.publicId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-5xl"
            >
              <Image
                src={active.url}
                alt={project.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 70vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 text-xs bg-black/40 px-3 py-1 rounded-full">
                {activeIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
