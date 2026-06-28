import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import Appointment from "@/models/Appointment";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const [
      totalMessages,
      unreadMessages,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalProjects,
      totalBlogPosts,
      publishedBlogPosts,
    ] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ status: "unread" }),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "pending" }),
      Appointment.countDocuments({ status: "confirmed" }),
      Project.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ published: true }),
    ]);

    return NextResponse.json({
      totalMessages,
      unreadMessages,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalProjects,
      totalBlogPosts,
      publishedBlogPosts,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
