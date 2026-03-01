// components/notifications/NotificationsList.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import type { NotificationRow } from "@/lib/supabase";
// Note: mark-as-read uses /api/notifications/read (supabaseAdmin) to bypass RLS

interface Props {
  initial: NotificationRow[];
  userId: string;
}

function NotificationItem({ n }: { n: NotificationRow }) {
  const inner = (
    <>
      <p className="font-medium text-text text-sm">{n.title}</p>
      <p className="text-muted text-xs mt-0.5">{n.body}</p>
      <p className="text-muted/50 text-xs mt-1.5">{formatDate(n.created_at)}</p>
    </>
  );

  return (
    <div
      className="rounded-[--radius-card] p-4"
      style={{
        background: n.read ? "#18181F" : "rgba(200,240,0,0.04)",
        border: n.read
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(200,240,0,0.18)",
        borderLeft: n.read
          ? "1px solid rgba(255,255,255,0.07)"
          : "3px solid #C8F000",
      }}
    >
      {n.url ? (
        <Link href={n.url} className="block hover:opacity-80 transition-opacity">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}

export function NotificationsList({ initial, userId }: Props) {
  const [notifications, setNotifications] = useState<NotificationRow[]>(initial);

  useEffect(() => {
    const supabase = createClient();

    // Mark all existing unread as read via API (supabaseAdmin bypasses RLS)
    fetch("/api/notifications/read", { method: "POST" }).then(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    });

    // Realtime — prepend new notifications as they arrive
    const channel = supabase
      .channel("notifications-list")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const newNotif = payload.new as NotificationRow;
          // Prepend and mark read immediately (user is already on this page)
          setNotifications((prev) => [{ ...newNotif, read: true }, ...prev]);
          fetch("/api/notifications/read", { method: "POST" });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <span className="text-4xl">🔔</span>
        <p className="text-muted text-sm">No notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((n) => (
        <NotificationItem key={n.id} n={n} />
      ))}
    </div>
  );
}
