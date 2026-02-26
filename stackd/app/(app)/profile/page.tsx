// app/(app)/profile/page.tsx
import { redirect } from "next/navigation";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { Topbar } from "@/components/layout/Topbar";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { UserRow } from "@/lib/supabase";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();

  const { data: raw } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const profile = raw as UserRow | null;

  // Aggregate stats
  const { data: stats } = await supabase
    .from("challenge_members")
    .select("logged_days, streak_days, status")
    .eq("user_id", user.id);

  const totalLogged = stats?.reduce((s, m) => s + m.logged_days, 0) ?? 0;
  const bestStreak = stats?.reduce((s, m) => Math.max(s, m.streak_days), 0) ?? 0;
  const activeChallenges = stats?.filter((m) => m.status !== "dead").length ?? 0;

  return (
    <div>
      <Topbar title="Profile" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* Avatar + name */}
        <Card className="flex items-center gap-4">
          <Avatar
            src={profile?.avatar_url}
            username={profile?.username}
            size="xl"
          />
          <div>
            <h2 className="font-heading text-xl font-bold text-text">
              {profile?.username ?? "…"}
            </h2>
            <p className="text-sm text-muted">{user.email}</p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Days logged", value: totalLogged, icon: "✅" },
            { label: "Best streak", value: `${bestStreak}d`, icon: "🔥" },
            { label: "Active", value: activeChallenges, icon: "⚡" },
          ].map(({ label, value, icon }) => (
            <Card key={label} className="text-center py-4 px-2">
              <p className="text-2xl mb-1">{icon}</p>
              <p className="font-heading text-xl font-bold text-text">{value}</p>
              <p className="text-xs text-muted mt-0.5">{label}</p>
            </Card>
          ))}
        </div>

        {/* Edit form */}
        <Card>
          <h3 className="font-heading font-semibold text-text mb-4">Edit profile</h3>
          <ProfileForm
            userId={user.id}
            currentUsername={profile?.username ?? ""}
          />
        </Card>

      </div>
    </div>
  );
}
