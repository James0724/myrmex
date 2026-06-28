"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { IProject, ProjectCategory } from "@/types";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "power-electricals": "Power & Electricals",
  security: "Security",
  networking: "Networking",
};

export default function ProjectCard({
  project,
  onClick,
}: {
  project: IProject;
  onClick: () => void;
}) {
  const imageCount = 1 + project.images.length;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={project.coverImage.url}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {imageCount > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
            <Images size={12} /> {imageCount}
          </div>
        )}
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide text-white bg-brand-green px-2.5 py-1 rounded-full">
          {CATEGORY_LABELS[project.category]}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-700 text-brand-darker uppercase leading-tight">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1.5 line-clamp-2">{project.shortDescription}</p>
      </div>
    </motion.button>
  );
}
