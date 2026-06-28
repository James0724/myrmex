import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/home/CTABanner";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { IBlog } from "@/types";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<IBlog | null> {
  await connectDB();
  const post = await Blog.findOne({ slug, published: true }).lean();
  return post ? JSON.parse(JSON.stringify(post)) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const contentHtml = sanitizeHtml(post.content, {
    allowedTags: [
      "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "strike",
      "h1", "h2", "h3", "ul", "ol", "li", "blockquote", "a", "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "class"],
      img: ["src", "alt", "class", "style", "width", "height"],
      "*": ["style", "class"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$|^center$|^right$|^justify$/],
      },
      img: {
        width: [/^\d+(?:px|%)?$/],
        height: [/^\d+(?:px|%)?$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return (
    <>
      <Navbar />
      <main>
        <section className="relative w-full h-[50vh] min-h-[380px] flex items-end overflow-hidden bg-brand-darker">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            priority
            className="object-cover brightness-[0.4]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/40" />

          <div className="relative z-10 container-main pb-12 max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest mb-5 hover:gap-3 transition-all"
            >
              <ArrowLeft size={13} /> Back to Blog
            </Link>
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-3">
              {formatDate(post.publishedAt ?? post.createdAt)}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-700 text-white uppercase leading-tight">
              {post.title}
            </h1>
          </div>
        </section>

        <article className="py-16 lg:py-20 bg-white">
          <div className="container-main max-w-3xl">
            <p className="text-lg text-brand-darker font-medium leading-relaxed border-l-2 border-brand-orange pl-5 mb-10">
              {post.excerpt}
            </p>
            <div
              className="blog-content text-gray-600 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </article>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
