import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { uploadImage } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Get gallery error:", error);
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
    const { fileBase64, title, category } = body;

    if (!fileBase64 || !title || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const uploaded = await uploadImage(fileBase64, "myrmex/gallery");

    await connectDB();
    const image = await GalleryImage.create({
      cloudinaryId: uploaded.publicId,
      url: uploaded.url,
      title,
      category,
      width: uploaded.width,
      height: uploaded.height,
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error("Upload gallery image error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
