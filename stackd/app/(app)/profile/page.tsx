// app/(app)/profile/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { Topbar } from "@/components/layout/Topbar";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { LogoutButton } from "@/components/profile/LogoutButton";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProBadge } from "@/components/subscription/ProBadge";
import { ManageSubscriptionButton } from "@/components/subscription/ManageSubscriptionButton";
import { formatDate } from "@/lib/utils";
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
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-xl font-bold text-text">
                {profile?.username ?? "…"}
              </h2>
              {profile?.is_pro && <ProBadge />}
            </div>
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

        {/* Subscription */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-text">Subscription</h3>
            {profile?.is_pro && <ProBadge />}
          </div>

          {profile?.is_pro ? (
            <div className="space-y-3">
              <p className="text-sm text-muted">
                Pro plan active
                {profile.stripe_period_end && (
                  <> · renews {formatDate(profile.stripe_period_end)}</>
                )}
              </p>
              <ManageSubscriptionButton />
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted">
                Free plan · 2 active challenges · 6 members per challenge
              </p>
              <Link href="/upgrade">
                <Button className="w-full">⚡ Upgrade to Pro</Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Edit form */}
        <Card>
          <h3 className="font-heading font-semibold text-text mb-4">Edit profile</h3>
          <ProfileForm
            userId={user.id}
            currentUsername={profile?.username ?? ""}
          />
        </Card>

        {/* Logout */}
        <LogoutButton />

      </div>
    </div>
  );
}
