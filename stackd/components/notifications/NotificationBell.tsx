// components/notifications/NotificationBell.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export function NotificationBell() {
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    // Initial fetch
    supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("read", false)
      .then(({ count }) => setUnread(count ?? 0));

    // Realtime — listen for new notifications (RLS ensures only own rows)
    const channel = supabase
      .channel("notification-bell")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          if (!payload.new.read) setUnread((prev) => prev + 1);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "notifications" },
        () => {
          // Re-fetch count when notifications are marked read
          supabase
            .from("notifications")
            .select("id", { count: "exact", head: true })
            .eq("read", false)
            .then(({ count }) => setUnread(count ?? 0));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <button
      onClick={() => router.push("/notifications")}
      title="Notifications"
      aria-label="Notifications"
      className="relative flex items-center justify-center size-8 rounded-full hover:bg-white/5 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 text-muted"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
        />
      </svg>

      {unread > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-1 leading-none"
          style={{ background: "#f97316" }}
        >
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </button>
  );
}
