"use client";

import { useRouter } from "next/navigation";
import ProjectForm, { ProjectFormPayload } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = async (payload: ProjectFormPayload) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: payload.title,
        category: payload.category,
        shortDescription: payload.shortDescription,
        coverImageBase64: payload.coverImageBase64,
        imagesBase64: payload.newImagesBase64,
      }),
    });
    if (!res.ok) throw new Error("Failed to create project");
    router.push("/admin/projects");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-white uppercase">
          New Project
        </h1>
        <p className="text-gray-500 text-sm mt-1">Add a new project to your portfolio</p>
      </div>
      <ProjectForm submitLabel="Create Project" onSubmit={handleSubmit} />
    </div>
  );
}
