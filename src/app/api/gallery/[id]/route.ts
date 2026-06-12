import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import GalleryImage from "@/models/GalleryImage";
import { deleteImage } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const image = await GalleryImage.findById(id);

    if (!image) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteImage(image.cloudinaryId);
    await GalleryImage.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete gallery image error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
