"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Trash2, Pencil, Plus, Newspaper } from "lucide-react";
import { IBlog } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p._id !== id));
    setDeleting(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-700 text-white uppercase">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-brand-green text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-green-dark transition-all"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-brand-green" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <Newspaper size={40} className="mx-auto mb-3 opacity-30" />
          <p>No blog posts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3"
            >
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image src={post.coverImage.url} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white text-sm font-medium truncate">{post.title}</p>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                      post.published
                        ? "bg-brand-green/20 text-brand-green-muted"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1 truncate">{post.excerpt}</p>
                <p className="text-gray-600 text-[11px] mt-1">{formatDate(post.createdAt)}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Link
                  href={`/admin/blog/${post._id}/edit`}
                  className="p-2.5 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-all"
                >
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  disabled={deleting === post._id}
                  className="p-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                >
                  {deleting === post._id ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
