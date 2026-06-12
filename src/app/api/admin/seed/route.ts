import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || "admin@myrmex.co.ke";
    const password = process.env.ADMIN_PASSWORD || "Admin@2024!";
    const name = "Myrmex Admin";

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashed, name, role: "superadmin" });

    return NextResponse.json({ success: true, message: "Admin created" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
