"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  LogOut,
  ExternalLink,
  UserCircle,
  FolderKanban,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/appointments", icon: Calendar, label: "Appointments" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { href: "/admin/blog", icon: Newspaper, label: "Blog" },
  { href: "/admin/profile", icon: UserCircle, label: "Profile" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const userName = session?.user?.name ?? "Admin";
  const userEmail = session?.user?.email ?? "";
  const userAvatar = session?.user?.image ?? null;

  return (
    <aside className="w-60 min-h-screen bg-brand-darker border-r border-white/10 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin">
          <div className="relative -ml-5 w-36 h-10 overflow-visible">
            <Image
              src="/logo.png"
              alt="Myrmex Admin"
              width={320}
              height={320}
              className="absolute  left-0 top-1/2 -translate-y-1/2 h-36 w-auto object-contain object-left brightness-0 invert"
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
                : "text-gray-400 hover:text-white hover:bg-white/10",
            )}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>

      {/* User info */}
      <div className="px-4 pb-2">
        <Link
          href="/admin/profile"
          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all group"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-brand-green/20 flex items-center justify-center">
                <span className="text-brand-green text-xs font-bold">
                  {getInitials(userName)}
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">
              {userName}
            </p>
            <p className="text-gray-600 text-[10px] truncate">{userEmail}</p>
          </div>
        </Link>
      </div>

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
