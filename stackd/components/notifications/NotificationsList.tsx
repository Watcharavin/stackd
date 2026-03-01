// components/notifications/NotificationsList.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import type { NotificationRow } from "@/lib/supabase";

interface Props {
  initial: NotificationRow[];
  userId: string;
}

function NotificationItem({
  n,
  onRead,
}: {
  n: NotificationRow;
  onRead: (id: string) => void;
}) {
  function handleClick() {
    if (!n.read) onRead(n.id);
  }

  const inner = (
    <>
      <p className="font-medium text-text text-sm">{n.title}</p>
      <p className="text-muted text-xs mt-0.5">{n.body}</p>
      <p className="text-muted/50 text-xs mt-1.5">{formatDate(n.created_at)}</p>
    </>
  );

  return (
    <div
      onClick={handleClick}
      className="rounded-[--radius-card] p-4 cursor-pointer transition-colors hover:opacity-90"
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
        <Link href={n.url} className="block">
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

    // Realtime — prepend new notifications as they arrive
    const channel = supabase
      .channel("notifications-list")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          setNotifications((prev) => [payload.new as NotificationRow, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  async function handleRead(id: string) {
    // Update visual immediately
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // Persist to DB
    fetch("/api/notifications/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

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
        <NotificationItem key={n.id} n={n} onRead={handleRead} />
      ))}
    </div>
  );
}
