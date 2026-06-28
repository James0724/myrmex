"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IBlog } from "@/types";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ post }: { post: IBlog }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <p className="text-brand-green text-[10px] font-bold uppercase tracking-widest mb-2">
            {formatDate(post.publishedAt ?? post.createdAt)}
          </p>
          <h3 className="font-display text-lg font-700 text-brand-darker uppercase leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1.5 line-clamp-2">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-brand-green text-xs font-bold uppercase tracking-widest mt-4 group-hover:gap-2.5 transition-all">
            Read more <ArrowUpRight size={13} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
