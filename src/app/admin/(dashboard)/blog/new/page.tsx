"use client";

import { useRouter } from "next/navigation";
import BlogForm, { BlogFormPayload } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  const router = useRouter();

  const handleSubmit = async (payload: BlogFormPayload) => {
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create blog post");
    router.push("/admin/blog");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-white uppercase">
          New Blog Post
        </h1>
        <p className="text-gray-500 text-sm mt-1">Write a new post for your site</p>
      </div>
      <BlogForm submitLabel="Create Post" onSubmit={handleSubmit} />
    </div>
  );
}
