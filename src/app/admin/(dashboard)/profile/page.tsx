"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Camera,
  Loader2,
  Save,
  Lock,
  CheckCircle,
  XCircle,
  Trash2,
  User,
  Mail,
  Shield,
  CalendarDays,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";

// ── Toast ─────────────────────────────────────────────────────────────────────

type Toast = { type: "success" | "error"; message: string };

function ToastBanner({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  return (
    <div
      className={cn(
        "fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium pointer-events-none",
        toast.type === "success" ? "bg-brand-green text-white" : "bg-red-500 text-white"
      )}
    >
      {toast.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
      {toast.message}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "AD";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── InfoRow ───────────────────────────────────────────────────────────────────

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-0.5">
      <span className="text-gray-600 flex-shrink-0">{icon}</span>
      <span className="text-gray-500 text-xs w-14 flex-shrink-0">{label}</span>
      <span className="text-gray-300 text-xs truncate">{value}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const [name, setName] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [pwError, setPwError] = useState("");

  const [toast, setToast] = useState<Toast | null>(null);
  const showToast = (type: Toast["type"], message: string) => setToast({ type, message });

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const res = await fetch("/api/admin/profile");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      if (data.user) {
        setProfile(data.user);
        setName(data.user.name ?? "");
      } else {
        throw new Error("No user data");
      }
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  // ── Avatar upload ──────────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      setUploadingAvatar(true);
      try {
        const res = await fetch("/api/admin/profile/avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileBase64: base64 }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        setProfile((prev) => prev ? { ...prev, avatar: data.avatar } : prev);
        try { await update({ image: data.avatar }); } catch { /* non-critical */ }
        showToast("success", "Avatar updated successfully");
      } catch (err: unknown) {
        showToast("error", err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploadingAvatar(false);
        if (fileRef.current) fileRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    if (!confirm("Remove your profile picture?")) return;
    setRemovingAvatar(true);
    try {
      const res = await fetch("/api/admin/profile/avatar", { method: "DELETE" });
      if (!res.ok) throw new Error("Remove failed");
      setProfile((prev) => prev ? { ...prev, avatar: undefined } : prev);
      try { await update({ image: null }); } catch { /* non-critical */ }
      showToast("success", "Avatar removed");
    } catch {
      showToast("error", "Failed to remove avatar");
    } finally {
      setRemovingAvatar(false);
    }
  };

  // ── Name save ──────────────────────────────────────────────────────────────

  const handleSaveName = async () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed === profile?.name) return;
    setSavingName(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setProfile((prev) => prev ? { ...prev, name: data.name } : prev);
      try { await update({ name: data.name }); } catch { /* non-critical */ }
      showToast("success", "Name updated successfully");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Failed to save name");
    } finally {
      setSavingName(false);
    }
  };

  // ── Password save ──────────────────────────────────────────────────────────

  const handleSavePassword = async () => {
    setPwError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwError("All password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Password update failed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("success", "Password updated successfully");
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : "Password update failed");
    } finally {
      setSavingPassword(false);
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────

  const displayName = profile?.name || session?.user?.name || "Admin";
  const avatarSrc = profile?.avatar || null;
  const nameDirty = name.trim() !== "" && name.trim() !== profile?.name;

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={28} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-8">
        <AlertCircle size={36} className="text-red-400" />
        <p className="text-white font-medium">Failed to load profile</p>
        <p className="text-gray-500 text-sm">There was an error fetching your account data.</p>
        <button
          onClick={loadProfile}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm hover:bg-white/15 transition-all"
        >
          <RefreshCw size={14} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {toast && <ToastBanner toast={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-700 text-white uppercase">
          Profile Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account information and security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[272px_1fr] gap-6">

        {/* ── Left column ── */}
        <div className="space-y-5">

          {/* Avatar card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
            {/* Avatar circle */}
            <div className="relative group mb-5">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/10 ring-offset-4 ring-offset-[#0F1117] relative">
                {avatarSrc ? (
                  <Image src={avatarSrc} alt={displayName} fill className="object-cover" sizes="112px" />
                ) : (
                  <div className="w-full h-full bg-brand-green/20 flex items-center justify-center">
                    <span className="text-brand-green text-3xl font-bold font-display">
                      {getInitials(displayName)}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <button
                  type="button"
                  onClick={() => !uploadingAvatar && fileRef.current?.click()}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full cursor-pointer"
                >
                  {uploadingAvatar
                    ? <Loader2 size={22} className="animate-spin text-white" />
                    : <Camera size={22} className="text-white" />
                  }
                </button>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Upload progress ring */}
              {uploadingAvatar && (
                <div className="absolute inset-0 rounded-full border-2 border-brand-green animate-pulse" />
              )}
            </div>

            {/* Name + role */}
            <p className="text-white font-semibold text-lg leading-tight mb-2">
              {displayName}
            </p>
            <span className={cn(
              "text-xs font-medium px-3 py-1 rounded-full",
              profile?.role === "superadmin"
                ? "bg-amber-500/20 text-amber-400"
                : "bg-brand-green/20 text-brand-green"
            )}>
              {profile?.role === "superadmin" ? "Super Admin" : "Admin"}
            </span>

            {profile?.createdAt && (
              <p className="text-gray-600 text-xs mt-2">
                Member since {formatDate(profile.createdAt)}
              </p>
            )}

            {/* Avatar action buttons */}
            <div className="flex flex-col gap-2 w-full mt-5">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploadingAvatar}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green text-white text-sm font-medium hover:bg-brand-green/90 disabled:opacity-50 transition-all"
              >
                {uploadingAvatar
                  ? <><Loader2 size={14} className="animate-spin" /> Uploading…</>
                  : <><Camera size={14} /> Change Avatar</>
                }
              </button>

              {profile?.avatar && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={removingAvatar || uploadingAvatar}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 disabled:opacity-50 transition-all"
                >
                  {removingAvatar
                    ? <><Loader2 size={14} className="animate-spin" /> Removing…</>
                    : <><Trash2 size={14} /> Remove Avatar</>
                  }
                </button>
              )}
            </div>
          </div>

          {/* Quick info card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3.5">
            <InfoRow icon={<Mail size={14} />} label="Email" value={profile?.email ?? "—"} />
            <div className="h-px bg-white/5" />
            <InfoRow
              icon={<Shield size={14} />}
              label="Role"
              value={profile?.role === "superadmin" ? "Super Admin" : "Admin"}
            />
            <div className="h-px bg-white/5" />
            <InfoRow
              icon={<CalendarDays size={14} />}
              label="Joined"
              value={profile?.createdAt ? formatDate(profile.createdAt) : "—"}
            />
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">

          {/* Account details card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-brand-green" />
              </div>
              <div>
                <h2 className="font-display text-lg font-700 text-white uppercase leading-none">
                  Account Details
                </h2>
                <p className="text-gray-600 text-xs mt-0.5">Update your display name</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Name field */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Full Name
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                    placeholder="Your full name"
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    disabled={savingName || !nameDirty}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-green text-white text-sm font-medium hover:bg-brand-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  >
                    {savingName
                      ? <Loader2 size={14} className="animate-spin" />
                      : <Save size={14} />
                    }
                    <span className="hidden sm:inline">
                      {savingName ? "Saving…" : "Save"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Email Address
                  <span className="ml-1.5 text-gray-600 font-normal">(read-only)</span>
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-gray-400 text-sm cursor-not-allowed">
                  <Mail size={14} className="text-gray-600 shrink-0" />
                  <span className="truncate">{profile?.email ?? "—"}</span>
                </div>
              </div>

              {/* Role (read-only) */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Role
                  <span className="ml-1.5 text-gray-600 font-normal">(read-only)</span>
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 cursor-not-allowed">
                  <Shield size={14} className="text-gray-600 shrink-0" />
                  <span className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full",
                    profile?.role === "superadmin"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-brand-green/20 text-brand-green"
                  )}>
                    {profile?.role === "superadmin" ? "Super Admin" : "Admin"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Change password card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Lock size={16} className="text-amber-400" />
              </div>
              <div>
                <h2 className="font-display text-lg font-700 text-white uppercase leading-none">
                  Change Password
                </h2>
                <p className="text-gray-600 text-xs mt-0.5">Minimum 8 characters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  onKeyDown={(e) => e.key === "Enter" && handleSavePassword()}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-600 text-sm outline-none focus:border-brand-green transition-all"
                />
              </div>
            </div>

            {pwError && (
              <p className="mt-3 text-red-400 text-xs flex items-center gap-1.5">
                <XCircle size={13} className="shrink-0" /> {pwError}
              </p>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleSavePassword}
                disabled={savingPassword}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {savingPassword
                  ? <><Loader2 size={14} className="animate-spin" /> Updating…</>
                  : <><Lock size={14} /> Update Password</>
                }
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
