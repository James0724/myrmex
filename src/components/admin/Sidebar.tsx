"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/appointments", icon: Calendar, label: "Appointments" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/gallery", icon: ImageIcon, label: "Gallery" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-60 min-h-screen bg-brand-darker border-r border-white/10 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin">
          <div className="relative w-36 h-10">
            <Image
              src="/logo.png"
              alt="Myrmex Admin"
              fill
              className="object-contain object-left brightness-0 invert"
            />
          </div>
        </Link>
        <p className="text-gray-600 text-xs mt-1">Admin Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive(href, exact)
                ? "bg-brand-green text-white"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            )}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ExternalLink size={17} />
          View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
