import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Calendar, MessageSquare, Image, TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/admin/stats`, {
      cache: "no-store",
      headers: { Cookie: "" },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const session = await auth();
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Messages",
      value: stats?.totalMessages ?? "—",
      badge: stats?.unreadMessages ? `${stats.unreadMessages} unread` : null,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Total Appointments",
      value: stats?.totalAppointments ?? "—",
      badge: stats?.pendingAppointments ? `${stats.pendingAppointments} pending` : null,
      icon: Calendar,
      href: "/admin/appointments",
      color: "bg-brand-green/10 text-brand-green",
    },
    {
      label: "Confirmed Bookings",
      value: stats?.confirmedAppointments ?? "—",
      badge: null,
      icon: TrendingUp,
      href: "/admin/appointments",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      label: "Gallery Images",
      value: stats?.totalGalleryImages ?? "—",
      badge: null,
      icon: Image,
      href: "/admin/gallery",
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-white uppercase">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, {session?.user?.name ?? "Admin"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {statCards.map(({ label, value, badge, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-green/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              {badge && (
                <span className="bg-brand-green/20 text-brand-green-muted text-xs font-medium px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <div className="font-display text-3xl font-800 text-white mb-1">
              {value}
            </div>
            <p className="text-gray-500 text-sm">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="font-display text-xl font-700 text-white uppercase mb-5">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { href: "/admin/messages", label: "View All Messages", icon: MessageSquare },
            { href: "/admin/appointments", label: "Manage Appointments", icon: Calendar },
            { href: "/admin/gallery", label: "Upload Gallery Image", icon: Image },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-brand-green/40 hover:bg-brand-green/5 transition-all group"
            >
              <Icon size={18} className="text-gray-400 group-hover:text-brand-green transition-colors" />
              <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                {label}
              </span>
              <ArrowRight size={14} className="ml-auto text-gray-600 group-hover:text-brand-green transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
