import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const post = await Blog.findById(id).lean();

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Get blog post error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, excerpt, content, coverImageBase64, published } = body;

    await connectDB();
    const post = await Blog.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (title) post.title = title;
    if (excerpt) post.excerpt = excerpt;
    if (content) post.content = content;

    if (coverImageBase64) {
      const uploadedCover = await uploadImage(coverImageBase64, "myrmex/blog");
      await deleteImage(post.coverImage.publicId);
      post.coverImage = { url: uploadedCover.url, publicId: uploadedCover.publicId };
    }

    if (typeof published === "boolean") {
      if (published && !post.published) {
        post.publishedAt = new Date();
      }
      post.published = published;
    }

    await post.save();

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const post = await Blog.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteImage(post.coverImage.publicId);
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
