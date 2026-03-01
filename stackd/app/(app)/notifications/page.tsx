// app/(app)/notifications/page.tsx
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";
import { Topbar } from "@/components/layout/Topbar";
import { PushToggle } from "@/components/notifications/PushToggle";
import { NotificationsList } from "@/components/notifications/NotificationsList";

export default async function NotificationsPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const { data: notifications } = await supabaseAdmin
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <Topbar title="Notifications" backHref="/dashboard" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <PushToggle />
        <NotificationsList initial={notifications ?? []} userId={user.id} />
      </div>
    </div>
  );
}
