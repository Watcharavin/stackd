// app/(app)/challenges/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, daysRemaining } from "@/lib/utils";
import type { Database } from "@/lib/supabase";

type Challenge = Database["public"]["Tables"]["challenges"]["Row"];
type Member = Database["public"]["Tables"]["challenge_members"]["Row"];

interface MemberWithChallenge extends Member {
  challenges: Challenge | null;
}

export default async function ChallengesPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();

  const { data: raw } = await supabase
    .from("challenge_members")
    .select("*, challenges(*)")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: false });

  const memberships = (raw ?? []) as unknown as MemberWithChallenge[];
  const active = memberships.filter((m) => m.challenges?.status === "active");
  const past = memberships.filter((m) => m.challenges?.status !== "active");

  return (
    <div>
      <Topbar title="Challenges" />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-text">Challenges</h2>
          <Link href="/challenges/new">
            <Button size="sm">+ New</Button>
          </Link>
        </div>

        {/* Active */}
        <section className="space-y-3">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest">
            Active ({active.length})
          </p>
          {active.length === 0 ? (
            <Card className="text-center py-10">
              <p className="text-3xl mb-2">🎯</p>
              <p className="text-sm text-muted">No active challenges</p>
              <Link href="/challenges/new" className="mt-3 inline-block">
                <Button size="sm">Create one</Button>
              </Link>
            </Card>
          ) : (
            active.map((m) => <ChallengeRow key={m.challenge_id} m={m} />)
          )}
        </section>

        {/* Past */}
        {past.length > 0 && (
          <section className="space-y-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">
              Past ({past.length})
            </p>
            {past.map((m) => <ChallengeRow key={m.challenge_id} m={m} />)}
          </section>
        )}

      </div>
    </div>
  );
}

function ChallengeRow({ m }: { m: MemberWithChallenge }) {
  const c = m.challenges!;
  const days = daysRemaining(c.end_date);

  return (
    <Link href={`/challenges/${c.id}`}>
      <Card className="hover:border-border-strong transition-colors cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-xl">{c.emoji}</span>
            <CardTitle className="text-base">{c.name}</CardTitle>
          </div>
          <Badge variant={m.status === "safe" ? "green" : m.status === "risk" ? "yellow" : "red"}>
            {m.status}
          </Badge>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            <span>🔥 {m.streak_days} streak</span>
            <span>✅ {m.logged_days} days</span>
            {c.status === "active"
              ? <span>⏰ {days}d left</span>
              : <span>Ended {formatDate(c.end_date)}</span>
            }
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
