"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { UserCircle, LogOut, ChevronDown, Settings } from "lucide-react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/appointments": "Appointments",
  "/admin/messages": "Messages",
  "/admin/projects": "Projects",
  "/admin/projects/new": "New Project",
  "/admin/blog": "Blog",
  "/admin/blog/new": "New Blog Post",
  "/admin/profile": "Profile Settings",
};

export default function Topbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const userName = session?.user?.name ?? "Admin";
  const userEmail = session?.user?.email ?? "";
  const userAvatar = session?.user?.image ?? null;
  const pageTitle = PAGE_TITLES[pathname] ?? "Admin";

  return (
    <header className="h-16 flex-shrink-0 bg-brand-darker border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Page title */}
      <h2 className="font-display text-base font-700 text-white uppercase tracking-wide">
        {pageTitle}
      </h2>

      {/* User dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all"
        >
          {/* Avatar */}
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
          <div className="hidden sm:block text-left">
            <p className="text-white text-xs font-medium leading-none">{userName}</p>
            <p className="text-gray-500 text-[10px] mt-0.5 leading-none">{userEmail}</p>
          </div>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-[#0F1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
            {/* User info header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt={userName}
                    width={36}
                    height={36}
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
                <p className="text-white text-sm font-medium truncate">{userName}</p>
                <p className="text-gray-500 text-xs truncate">{userEmail}</p>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-1.5 space-y-0.5">
              <Link
                href="/admin/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-all"
              >
                <Settings size={15} className="text-brand-green flex-shrink-0" />
                Profile Settings
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-300 hover:text-red-400 hover:bg-red-500/5 text-sm transition-all w-full text-left"
              >
                <LogOut size={15} className="flex-shrink-0" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
