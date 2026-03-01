// app/(app)/profile/[username]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getUser } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";
import { Topbar } from "@/components/layout/Topbar";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProBadge } from "@/components/subscription/ProBadge";
import { formatDate, daysRemaining } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const currentUser = await getUser();
  if (!currentUser) redirect("/login");

  // Redirect to own profile if viewing self
  const { data: selfCheck } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("id", currentUser.id)
    .eq("username", username)
    .maybeSingle();

  if (selfCheck) redirect("/profile");

  // Fetch target user
  const { data: profile } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (!profile) notFound();

  // Fetch stats
  const { data: stats } = await supabaseAdmin
    .from("challenge_members")
    .select("logged_days, streak_days, status")
    .eq("user_id", profile.id);

  const totalLogged = stats?.reduce((s, m) => s + m.logged_days, 0) ?? 0;
  const bestStreak = stats?.reduce((s, m) => Math.max(s, m.streak_days), 0) ?? 0;
  const activeChallenges = stats?.filter((m) => m.status !== "dead").length ?? 0;

  // Fetch public active challenges they're in
  const { data: memberships } = await supabaseAdmin
    .from("challenge_members")
    .select("challenges!inner(id, name, emoji, goal, end_date, privacy, status)")
    .eq("user_id", profile.id)
    .eq("challenges.privacy", "public")
    .eq("challenges.status", "active");

  const publicChallenges = (memberships ?? []).map(
    (m) => (m as typeof m & { challenges: { id: string; name: string; emoji: string; goal: string; end_date: string; privacy: string; status: string } }).challenges
  );

  return (
    <div>
      <Topbar title={`@${profile.username}`} backHref="/challenges" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Avatar Hero */}
        <div
          className="relative overflow-hidden rounded-[--radius-card] p-6 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(217,119,87,0.07) 0%, rgba(26,24,22,1) 60%)",
            border: "1px solid rgba(217,119,87,0.1)",
          }}
        >
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(217,119,87,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative inline-block mb-3">
            <Avatar
              src={profile.avatar_url}
              username={profile.username}
              size="xl"
              className="ring-2 ring-lime/20 ring-offset-2 ring-offset-bg"
            />
            {profile.is_pro && (
              <span className="absolute -bottom-1 -right-1">
                <ProBadge />
              </span>
            )}
          </div>

          <h2 className="font-heading text-xl font-bold text-text">{profile.username}</h2>
          <p className="text-xs text-muted mt-0.5">Joined {formatDate(profile.created_at)}</p>

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

        {/* Public Challenges */}
        {publicChallenges.length > 0 && (
          <Card>
            <h3 className="font-heading font-semibold text-text mb-3">Active Challenges</h3>
            <div className="space-y-2">
              {publicChallenges.map((c) => (
                <Link
                  key={c.id}
                  href={`/challenges/${c.id}`}
                  className="flex items-center gap-3 p-3 rounded-[--radius-btn] hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl shrink-0">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{c.name}</p>
                    <p className="text-xs text-muted truncate">{c.goal}</p>
                  </div>
                  <Badge variant="default" className="shrink-0">
                    {daysRemaining(c.end_date)}d left
                  </Badge>
                </Link>
              ))}
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
