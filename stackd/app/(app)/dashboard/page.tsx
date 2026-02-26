// app/(app)/dashboard/page.tsx
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

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();

  // Get memberships + joined challenge data
  const { data: raw } = await supabase
    .from("challenge_members")
    .select("*, challenges(*)")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: false });

  const memberships = (raw ?? []) as unknown as MemberWithChallenge[];
  const active = memberships.filter((m) => m.challenges?.status === "active");

  return (
    <div>
      <Topbar title="Dashboard" />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text">Your challenges</h2>
            <p className="text-sm text-muted mt-0.5">
              {active.length === 0 ? "No active challenges yet" : `${active.length} active`}
            </p>
          </div>
          <Link href="/challenges/new">
            <Button size="sm">+ New</Button>
          </Link>
        </div>

        {/* Empty state */}
        {active.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-4xl mb-3">🎯</p>
            <p className="font-heading font-semibold text-text mb-1">No challenges yet</p>
            <p className="text-sm text-muted mb-4">
              Create one and invite your friends to compete.
            </p>
            <Link href="/challenges/new">
              <Button>Start a challenge</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {active.map((m) => {
              const c = m.challenges!;
              const days = daysRemaining(c.end_date);

              return (
                <Link href={`/challenges/${c.id}`} key={c.id}>
                  <Card className="hover:border-border-strong transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{c.emoji}</span>
                        <CardTitle>{c.name}</CardTitle>
                      </div>
                      <Badge
                        variant={
                          m.status === "safe" ? "green"
                          : m.status === "risk" ? "yellow"
                          : "red"
                        }
                      >
                        {m.status}
                      </Badge>
                    </CardHeader>
                    <CardBody>
                      <p className="text-sm text-muted">{c.goal}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted mt-1">
                        <span>🔥 {m.streak_days} day streak</span>
                        <span>✅ {m.logged_days} logged</span>
                        <span>⏰ {days}d left · ends {formatDate(c.end_date)}</span>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
