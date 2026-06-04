"use client";

import { useEffect, useState, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { LoadingSpinner, EmptyState, BellIcon, UserIcon } from "@/components/ui";

interface Notification {
  id: string;
  requestId: string;
  type: string;
  recipient: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const typeConfig: Record<
  string,
  { icon: ReactNode; label: string; color: string }
> = {
  CONFIRMATION: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: "Confirmation",
    color: "text-[#6ee7b7] bg-[rgba(16,185,129,0.1)]",
  },
  STATUS_UPDATE: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    ),
    label: "Status Update",
    color: "text-[#a5b4fc] bg-[rgba(99,102,241,0.1)]",
  },
  ASSIGNMENT: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    label: "Assignment",
    color: "text-[#fbbf24] bg-[rgba(245,158,11,0.1)]",
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data);
    } catch {
      console.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      console.error("Failed to mark as read");
    }
  };

  const markOneRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch {
      console.error("Failed to mark as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Navbar />
      <main className="flex-1 relative">
        <div className="orb w-[400px] h-[400px] bg-[#a78bfa] top-[-150px] left-[-100px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 fade-in">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">
                Notifications
              </h1>
              <p className="text-[var(--neutral-400)]">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="px-4 py-2 rounded-lg glass text-xs font-medium text-[var(--primary-300)] hover:bg-[rgba(99,102,241,0.1)] transition-all"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification List */}
          {loading ? (
            <LoadingSpinner />
          ) : notifications.length === 0 ? (
            <div className="glass rounded-xl">
              <EmptyState
                icon={<BellIcon className="w-12 h-12 stroke-[1.5]" />}
                title="No Notifications"
                description="You don't have any notifications yet. Submit a maintenance request to see automated updates here."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif, i) => {
                const config = typeConfig[notif.type] || typeConfig.CONFIRMATION;
                return (
                  <div
                    key={notif.id}
                    onClick={() => !notif.read && markOneRead(notif.id)}
                    className={`glass rounded-xl p-4 cursor-pointer card-hover fade-in ${
                      !notif.read
                        ? "border-l-2 border-l-[var(--primary-500)]"
                        : "opacity-70"
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${config.color}`}
                      >
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${config.color}`}
                          >
                            {config.label}
                          </span>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[var(--primary-400)]" />
                          )}
                        </div>
                        <p className="text-sm text-[var(--neutral-200)] leading-relaxed mb-1">
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-[var(--neutral-500)]">
                          <span className="flex items-center gap-1">
                            <UserIcon className="w-3.5 h-3.5" />
                            {notif.recipient}
                          </span>
                          <span>
                            {new Date(notif.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
