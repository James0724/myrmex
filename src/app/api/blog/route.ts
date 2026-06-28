import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadImage } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

async function uniqueSlug(base: string): Promise<string> {
  let slug = slugify(base);
  let suffix = 1;
  while (await Blog.exists({ slug })) {
    slug = `${slugify(base)}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Get blog posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, excerpt, content, coverImageBase64, published } = body;

    if (!title || !excerpt || !content || !coverImageBase64) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const uploadedCover = await uploadImage(coverImageBase64, "myrmex/blog");

    await connectDB();
    const slug = await uniqueSlug(title);
    const isPublished = Boolean(published);

    const post = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: { url: uploadedCover.url, publicId: uploadedCover.publicId },
      published: isPublished,
      publishedAt: isPublished ? new Date() : null,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
