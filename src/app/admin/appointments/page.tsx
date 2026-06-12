"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Loader2, ChevronDown, Trash2 } from "lucide-react";
import { IAppointment } from "@/types";
import { formatDateTime, SERVICE_LABELS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400",
  confirmed: "bg-brand-green/20 text-brand-green-muted",
  completed: "bg-blue-500/20 text-blue-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const ALL_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data.appointments || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchAppointments();
    setUpdating(null);
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    setAppointments((prev) => prev.filter((a) => a._id !== id));
  };

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-700 text-white uppercase">
            Appointments
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {appointments.length} total consultation{appointments.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-brand-green" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/10 border border-white/15 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-brand-green"
          >
            <option value="all">All Status</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-brand-darker capitalize">{s}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-brand-green" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p>No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((appt) => (
            <div
              key={appt._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-white">{appt.name}</h3>
                    <span
                      className={cn(
                        "text-xs font-medium px-2.5 py-0.5 rounded-full capitalize",
                        STATUS_COLORS[appt.status]
                      )}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-1 gap-x-4 text-xs text-gray-400">
                    <span>📧 {appt.email}</span>
                    <span>📱 {appt.phone}</span>
                    <span>🔧 {SERVICE_LABELS[appt.service] ?? appt.service}</span>
                    <span>📅 {appt.preferredDate} — {appt.preferredTime}</span>
                  </div>
                  {appt.message && (
                    <p className="text-gray-500 text-xs mt-2 bg-white/5 px-3 py-2 rounded-lg">
                      {appt.message}
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-2">
                    Received: {formatDateTime(appt.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="relative">
                    <select
                      value={appt.status}
                      onChange={(e) => updateStatus(appt._id, e.target.value)}
                      disabled={updating === appt._id}
                      className="appearance-none bg-white/10 border border-white/15 text-white text-xs px-3 py-2 pr-7 rounded-lg outline-none focus:border-brand-green disabled:opacity-50 cursor-pointer"
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-brand-darker capitalize">{s}</option>
                      ))}
                    </select>
                    {updating === appt._id ? (
                      <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-brand-green" />
                    ) : (
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    )}
                  </div>
                  <button
                    onClick={() => deleteAppointment(appt._id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
