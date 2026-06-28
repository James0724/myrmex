import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { uploadImage } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Get projects error:", error);
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
    const { title, category, shortDescription, coverImageBase64, imagesBase64 } = body;

    if (!title || !category || !shortDescription || !coverImageBase64) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!["power-electricals", "security", "networking"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const uploadedCover = await uploadImage(coverImageBase64, "myrmex/projects");
    const uploadedImages = await Promise.all(
      ((imagesBase64 as string[]) || []).map((img) => uploadImage(img, "myrmex/projects"))
    );

    await connectDB();
    const project = await Project.create({
      title,
      category,
      shortDescription,
      coverImage: { url: uploadedCover.url, publicId: uploadedCover.publicId },
      images: uploadedImages.map((img) => ({ url: img.url, publicId: img.publicId })),
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
