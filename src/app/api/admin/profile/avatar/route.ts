import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileBase64 } = await req.json();
    if (!fileBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    await connectDB();
    const userId = (session.user as { id?: string }).id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete old avatar from Cloudinary if it exists
    if (user.avatarPublicId) {
      await deleteImage(user.avatarPublicId).catch(() => null);
    }

    const { publicId, url } = await uploadImage(fileBase64, "myrmex/avatars");

    await User.findByIdAndUpdate(userId, {
      avatar: url,
      avatarPublicId: publicId,
    });

    return NextResponse.json({ success: true, avatar: url });
  } catch (error) {
    console.error("Avatar upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = (session.user as { id?: string }).id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.avatarPublicId) {
      await deleteImage(user.avatarPublicId).catch(() => null);
    }

    await User.findByIdAndUpdate(userId, { avatar: null, avatarPublicId: null });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Avatar delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
