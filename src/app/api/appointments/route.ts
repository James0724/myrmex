import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  service: z.enum(["power", "security", "networking", "assessment", "design", "general"]),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  message: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await connectDB();
    const appointment = await Appointment.create(data);

    return NextResponse.json(
      { success: true, id: appointment._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Appointment route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const appointments = await Appointment.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
