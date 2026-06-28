"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import ProjectForm, { ProjectFormPayload } from "@/components/admin/ProjectForm";
import { IProject } from "@/types";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data.project))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (payload: ProjectFormPayload) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: payload.title,
        category: payload.category,
        shortDescription: payload.shortDescription,
        coverImageBase64: payload.coverImageBase64,
        newImagesBase64: payload.newImagesBase64,
        removeImagePublicIds: payload.removeImagePublicIds,
      }),
    });
    if (!res.ok) throw new Error("Failed to update project");
    router.push("/admin/projects");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (!project) {
    return <div className="p-8 text-gray-500">Project not found.</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-white uppercase">
          Edit Project
        </h1>
        <p className="text-gray-500 text-sm mt-1">{project.title}</p>
      </div>
      <ProjectForm initial={project} submitLabel="Save Changes" onSubmit={handleSubmit} />
    </div>
  );
}
