// app/(app)/dashboard/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { Topbar } from "@/components/layout/Topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuickLogButton } from "@/components/challenge/QuickLogButton";
import { daysRemaining } from "@/lib/utils";
import type { Database } from "@/lib/supabase";
import type { UserRow } from "@/lib/supabase";

type Challenge = Database["public"]["Tables"]["challenges"]["Row"];
type Member = Database["public"]["Tables"]["challenge_members"]["Row"];

interface MemberWithChallenge extends Member {
  challenges: Challenge | null;
}

function getGreeting() {
  const hour = (new Date().getUTCHours() + 7) % 24; // UTC+7 Thailand
  if (hour >= 5 && hour < 12) return "Good morning ☀️";
  if (hour >= 12 && hour < 17) return "Good afternoon ⛅";
  if (hour >= 17 && hour < 22) return "Good evening 🌙";
  return "Night owl mode 🦉";
}

function totalChallengeDays(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();

  const today = new Date().toISOString().split("T")[0];

  const [profileRes, membershipRes, todayLogsRes] = await Promise.all([
    supabase.from("users").select("username, is_pro").eq("id", user.id).single(),
    supabase
      .from("challenge_members")
      .select("*, challenges(*)")
      .eq("user_id", user.id)
      .order("joined_at", { ascending: false }),
    supabase
      .from("logs")
      .select("challenge_id")
      .eq("user_id", user.id)
      .eq("date", today),
  ]);

  const profile = profileRes.data as Pick<UserRow, "username" | "is_pro"> | null;
  const username = profile?.username ?? "friend";
  const isPro = profile?.is_pro ?? false;
  const memberships = (membershipRes.data ?? []) as unknown as MemberWithChallenge[];
  const active = memberships.filter((m) => m.challenges?.status === "active");
  const loggedTodaySet = new Set((todayLogsRes.data ?? []).map((l) => l.challenge_id));

  const totalLogged = active.reduce((acc, m) => acc + m.logged_days, 0);
  const bestStreak = active.length > 0 ? Math.max(...active.map((m) => m.streak_days)) : 0;

  return (
    <div>
      <Topbar />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* ── Hero / Greeting ─────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[--radius-card] border border-lime/15 bg-gradient-to-br from-lime/[0.08] via-transparent to-transparent p-5">
          {/* decorative */}
          <span className="pointer-events-none select-none absolute -right-3 -top-3 text-[7rem] opacity-[0.06] leading-none">
            ⚡
          </span>

          <p className="text-sm text-muted">{getGreeting()}</p>
          <h1 className="mt-0.5 font-heading text-2xl font-bold text-text">
            Hey, {username} 👋
          </h1>

          {active.length > 0 ? (
            <div className="mt-4 flex gap-5">
              <div>
                <p className="font-heading text-xl font-bold text-lime">{active.length}</p>
                <p className="text-xs text-muted">Active</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-heading text-xl font-bold text-text">{totalLogged}</p>
                <p className="text-xs text-muted">Days logged</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-heading text-xl font-bold text-yellow">
                  {bestStreak > 0 ? `🔥 ${bestStreak}` : "—"}
                </p>
                <p className="text-xs text-muted">Best streak</p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">
              Start a challenge to build your streak.
            </p>
          )}
        </div>

        {/* ── Challenge list ───────────────────────────────────── */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-text">
              {active.length === 0 ? "Your challenges" : `${active.length} active`}
            </h2>
            <Link href="/challenges/new">
              <Button size="sm">+ New</Button>
            </Link>
          </div>

          {active.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[--radius-card] border border-dashed border-border py-16 text-center">
              <p className="mb-3 text-5xl">🎯</p>
              <p className="font-heading font-semibold text-text">No active challenges</p>
              <p className="mt-1 mb-5 text-sm text-muted">
                Create your own or join a public one.
              </p>
              <div className="flex gap-2">
                <Link href="/challenges/new">
                  <Button>+ Create</Button>
                </Link>
                <Link href="/discover">
                  <Button variant="secondary">🧭 Discover</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {active.map((m) => {
                const c = m.challenges!;
                const days = daysRemaining(c.end_date);
                const total = totalChallengeDays(c.start_date, c.end_date);
                const progress = Math.min(100, Math.round((m.logged_days / total) * 100));
                const barColor =
                  m.status === "dead"
                    ? "bg-red"
                    : m.status === "risk"
                    ? "bg-yellow"
                    : "bg-lime";

                return (
                  <Link href={`/challenges/${c.id}`} key={c.id} className="block group">
                    <div className="cursor-pointer rounded-[--radius-card] border border-border bg-surface p-4 transition-all duration-200 hover:border-lime/30 hover:shadow-[0_0_0_1px_rgba(217,119,87,0.12)]">

                      {/* Top row */}
                      <div className="mb-3 flex items-start gap-3">
                        <span className="mt-0.5 text-3xl leading-none">{c.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-heading font-semibold text-text transition-colors duration-200 group-hover:text-lime">
                            {c.name}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted">{c.goal}</p>
                        </div>
                        <Badge
                          variant={
                            m.status === "safe"
                              ? "green"
                              : m.status === "risk"
                              ? "yellow"
                              : "red"
                          }
                        >
                          {m.status}
                        </Badge>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-3 space-y-1.5">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted">
                          <span>{m.logged_days} / {total} days</span>
                          <span>{progress}% · {days}d left</span>
                        </div>
                      </div>

                      {/* Bottom row: streak + quick log */}
                      <div className="flex items-center justify-between">
                        {m.streak_days > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">🔥</span>
                            <span className="text-xs font-medium text-text">
                              {m.streak_days}-day streak
                            </span>
                            {m.streak_days >= 7 && (
                              <span className="rounded-full border border-yellow/25 bg-yellow/10 px-2 py-0.5 text-[10px] font-medium text-yellow">
                                on fire
                              </span>
                            )}
                          </div>
                        ) : (
                          <div />
                        )}
                        <QuickLogButton
                          challengeId={c.id}
                          userId={user.id}
                          loggedToday={loggedTodaySet.has(c.id)}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Upgrade nudge (non-pro only) ─────────────────────── */}
        {!isPro && (
          <div
            className="rounded-[--radius-card] p-4 flex items-center gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(217,119,87,0.06) 0%, rgba(36,33,32,1) 60%)",
              border: "1px solid rgba(217,119,87,0.15)",
            }}
          >
            <span className="text-2xl shrink-0">⚡</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text">Go Pro</p>
              <p className="text-xs text-muted mt-0.5">
                {active.length >= 2
                  ? "You're at the free limit — unlock unlimited challenges"
                  : "Unlimited challenges · unlimited members · ฿149/mo"}
              </p>
            </div>
            <Link href="/upgrade" className="shrink-0">
              <Button size="sm">Upgrade</Button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
