// app/(app)/profile/page.tsx
export const dynamic = "force-dynamic";

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

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* ── Avatar Hero ───────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-[--radius-card] p-6 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(217,119,87,0.07) 0%, rgba(26,24,22,1) 60%)",
            border: "1px solid rgba(217,119,87,0.1)",
          }}
        >
          {/* bg glow */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(217,119,87,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative inline-block mb-3">
            <Avatar
              src={profile?.avatar_url}
              username={profile?.username}
              size="xl"
              className="ring-2 ring-lime/20 ring-offset-2 ring-offset-bg"
            />
            {profile?.is_pro && (
              <span className="absolute -bottom-1 -right-1">
                <ProBadge />
              </span>
            )}
          </div>

          <h2 className="font-heading text-xl font-bold text-text">
            {profile?.username ?? "…"}
          </h2>
          <p className="text-sm text-muted mt-0.5">{user.email}</p>

          {/* inline stats */}
          <div className="flex justify-center gap-6 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { label: "Days logged", value: totalLogged, icon: "✅" },
              { label: "Best streak", value: `${bestStreak}d`, icon: "🔥" },
              { label: "Active",      value: activeChallenges, icon: "⚡" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-lg font-bold text-text">{icon} {value}</p>
                <p className="text-[11px] text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Subscription ──────────────────────────────────────── */}
        <Card>
          <div className="flex items-center justify-between mb-3">
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

        {/* ── Edit profile ──────────────────────────────────────── */}
        <Card>
          <h3 className="font-heading font-semibold text-text mb-4">Edit profile</h3>
          <ProfileForm
            userId={user.id}
            currentUsername={profile?.username ?? ""}
          />
        </Card>

        {/* ── Logout ────────────────────────────────────────────── */}
        <LogoutButton />

      </div>
    </div>
  );
}
