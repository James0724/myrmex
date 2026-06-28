"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Trash2, Pencil, Plus, FolderKanban, Images } from "lucide-react";
import { IProject, ProjectCategory } from "@/types";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "power-electricals": "Power & Electricals",
  security: "Security",
  networking: "Networking",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data.projects || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p._id !== id));
    setDeleting(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-700 text-white uppercase">
            Projects
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""} in your portfolio
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-brand-green text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-green-dark transition-all"
        >
          <Plus size={16} /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-brand-green" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <FolderKanban size={40} className="mx-auto mb-3 opacity-30" />
          <p>No projects yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-white/5 rounded-xl overflow-hidden border border-white/10"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={project.coverImage.url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {project.images.length > 0 && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-brand-darker/80 text-gray-300 text-xs px-2 py-1 rounded-lg">
                    <Images size={12} /> {project.images.length}
                  </div>
                )}
                <div className="absolute inset-0 bg-brand-darker/0 group-hover:bg-brand-darker/70 transition-all duration-300 flex items-center justify-center gap-2">
                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    disabled={deleting === project._id}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2.5 bg-red-500/80 text-white rounded-lg hover:bg-red-600"
                  >
                    {deleting === project._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium truncate">{project.title}</p>
                <span className="inline-block mt-1 text-[10px] font-medium uppercase tracking-wide text-brand-green-muted bg-brand-green/10 px-2 py-0.5 rounded-full">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">
                  {project.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
