import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project, { IProjectImage } from "@/models/Project";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Get project error:", error);
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
    const {
      title,
      category,
      shortDescription,
      coverImageBase64,
      newImagesBase64,
      removeImagePublicIds,
    } = body;

    if (category && !["power-electricals", "security", "networking"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    await connectDB();
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (title) project.title = title;
    if (category) project.category = category;
    if (shortDescription) project.shortDescription = shortDescription;

    if (coverImageBase64) {
      const uploadedCover = await uploadImage(coverImageBase64, "myrmex/projects");
      await deleteImage(project.coverImage.publicId);
      project.coverImage = { url: uploadedCover.url, publicId: uploadedCover.publicId };
    }

    if (Array.isArray(removeImagePublicIds) && removeImagePublicIds.length > 0) {
      await Promise.all(
        (removeImagePublicIds as string[]).map((publicId) => deleteImage(publicId))
      );
      project.images = project.images.filter(
        (img: IProjectImage) => !removeImagePublicIds.includes(img.publicId)
      );
    }

    if (Array.isArray(newImagesBase64) && newImagesBase64.length > 0) {
      const uploaded = await Promise.all(
        (newImagesBase64 as string[]).map((img) => uploadImage(img, "myrmex/projects"))
      );
      project.images.push(
        ...uploaded.map((img) => ({ url: img.url, publicId: img.publicId }))
      );
    }

    await project.save();

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Update project error:", error);
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
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await Promise.all([
      deleteImage(project.coverImage.publicId),
      ...project.images.map((img: IProjectImage) => deleteImage(img.publicId)),
    ]);
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
