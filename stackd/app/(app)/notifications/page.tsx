// app/(app)/notifications/page.tsx
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";
import { Topbar } from "@/components/layout/Topbar";
import { PushToggle } from "@/components/notifications/PushToggle";
import { formatDate } from "@/lib/utils";

export default async function NotificationsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  // Fetch all notifications ordered newest first
  const { data: notifications } = await supabaseAdmin
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Mark all unread as read (fire-and-forget — don't block render)
  supabaseAdmin
    .from("notifications")
    .update({ read: true })
    .eq("user_id", user.id)
    .eq("read", false)
    .then(() => {});

  return (
    <div>
      <Topbar title="Notifications" backHref="/dashboard" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <PushToggle />

        {!notifications || notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <span className="text-4xl">🔔</span>
            <p className="text-muted text-sm">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => {
              const inner = (
                <>
                  <p className="font-medium text-text text-sm">{n.title}</p>
                  <p className="text-muted text-xs mt-0.5">{n.body}</p>
                  <p className="text-muted/50 text-xs mt-1.5">{formatDate(n.created_at)}</p>
                </>
              );

              return (
                <div
                  key={n.id}
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
            })}
          </div>
        )}
      </div>
    </div>
  );
}
