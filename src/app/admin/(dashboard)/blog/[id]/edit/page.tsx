"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import BlogForm, { BlogFormPayload } from "@/components/admin/BlogForm";
import { IBlog } from "@/types";

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data.post))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (payload: BlogFormPayload) => {
    const res = await fetch(`/api/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update blog post");
    router.push("/admin/blog");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (!post) {
    return <div className="p-8 text-gray-500">Post not found.</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-white uppercase">
          Edit Blog Post
        </h1>
        <p className="text-gray-500 text-sm mt-1">{post.title}</p>
      </div>
      <BlogForm initial={post} submitLabel="Save Changes" onSubmit={handleSubmit} />
    </div>
  );
}
