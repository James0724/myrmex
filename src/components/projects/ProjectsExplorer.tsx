"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { IProject, ProjectCategory } from "@/types";
import ProjectCard from "./ProjectCard";
import ProjectLightbox from "./ProjectLightbox";

const FILTERS: { key: "all" | ProjectCategory; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "power-electricals", label: "Power & Electricals" },
  { key: "security", label: "Security" },
  { key: "networking", label: "Networking" },
];

export default function ProjectsExplorer() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const [activeProject, setActiveProject] = useState<IProject | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium transition-all",
              activeFilter === f.key
                ? "bg-brand-green text-white"
                : "bg-gray-100 text-gray-500 hover:bg-brand-green/10 hover:text-brand-green"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-brand-green" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <FolderKanban size={40} className="mx-auto mb-3 opacity-30" />
          <p>No projects in this category yet.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {activeProject && (
          <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
