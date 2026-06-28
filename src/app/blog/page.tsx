import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/home/CTABanner";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { IBlog } from "@/types";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and insights on electrical & solar, security systems, networking, and property maintenance from the Myrmex team.",
};

export const dynamic = "force-dynamic";

async function getPosts(): Promise<IBlog[]> {
  await connectDB();
  const posts = await Blog.find({ published: true })
    .sort({ publishedAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(posts));
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Insights"
          title="Our"
          highlight="Blog"
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=75"
        />

        <section className="py-20 lg:py-28 bg-white">
          <div className="container-main">
            <SectionHeading
              eyebrow="Latest Articles"
              title="Tips &"
              highlight="Guides"
              description="Practical advice on electrical, security, networking, and maintenance — straight from our technicians."
            />

            {posts.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Newspaper size={40} className="mx-auto mb-3 opacity-30" />
                <p>No articles published yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
