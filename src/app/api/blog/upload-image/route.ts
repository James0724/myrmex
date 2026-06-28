import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

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

    const { url } = await uploadImage(fileBase64, "myrmex/blog/content");
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Blog content image upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
