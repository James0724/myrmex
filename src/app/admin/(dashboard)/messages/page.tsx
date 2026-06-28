"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Loader2, ChevronDown, Trash2, Mail } from "lucide-react";
import { IMessage } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  unread: "bg-amber-500/20 text-amber-400",
  read: "bg-gray-500/20 text-gray-400",
  replied: "bg-brand-green/20 text-brand-green-muted",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchMessages();
    setUpdating(null);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
    const msg = messages.find((m) => m._id === id);
    if (msg?.status === "unread") updateStatus(id, "read");
  };

  const filtered = filter === "all" ? messages : messages.filter((m) => m.status === filter);
  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-700 text-white uppercase">
              Messages
            </h1>
            {unreadCount > 0 && (
              <span className="bg-brand-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {messages.length} total message{messages.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-brand-green" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/10 border border-white/15 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-brand-green"
          >
            <option value="all">All Status</option>
            <option value="unread" className="bg-brand-darker">Unread</option>
            <option value="read" className="bg-brand-darker">Read</option>
            <option value="replied" className="bg-brand-darker">Replied</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-brand-green" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p>No messages found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <div
              key={msg._id}
              className={cn(
                "bg-white/5 border rounded-2xl transition-all",
                msg.status === "unread"
                  ? "border-brand-green/30"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              {/* Header row */}
              <button
                onClick={() => toggleExpanded(msg._id)}
                className="w-full p-5 text-left"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      {msg.status === "unread" && (
                        <span className="w-2 h-2 rounded-full bg-brand-green flex-shrink-0" />
                      )}
                      <span className="font-semibold text-white text-sm">{msg.name}</span>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          STATUS_COLORS[msg.status]
                        )}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">
                      {msg.email}{msg.phone ? ` · ${msg.phone}` : ""}
                    </p>
                    <p className="text-gray-300 text-sm font-medium mt-1 truncate">
                      {msg.subject}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-gray-600 text-xs hidden sm:block">
                      {formatDateTime(msg.createdAt)}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "text-gray-500 transition-transform",
                        expanded === msg._id && "rotate-180"
                      )}
                    />
                  </div>
                </div>
              </button>

              {/* Expanded */}
              {expanded === msg._id && (
                <div className="px-5 pb-5 border-t border-white/10 pt-4">
                  <p className="text-gray-300 text-sm leading-relaxed mb-5 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      onClick={() => updateStatus(msg._id, "replied")}
                      className="inline-flex items-center gap-2 bg-brand-green text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-green-dark transition-colors"
                    >
                      <Mail size={13} /> Reply via Email
                    </a>
                    <div className="relative">
                      <select
                        value={msg.status}
                        onChange={(e) => updateStatus(msg._id, e.target.value)}
                        disabled={updating === msg._id}
                        className="appearance-none bg-white/10 border border-white/15 text-white text-xs px-3 py-2 pr-7 rounded-lg outline-none focus:border-brand-green disabled:opacity-50"
                      >
                        {["unread", "read", "replied"].map((s) => (
                          <option key={s} value={s} className="bg-brand-darker capitalize">{s}</option>
                        ))}
                      </select>
                      {updating === msg._id ? (
                        <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-brand-green" />
                      ) : (
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      )}
                    </div>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
