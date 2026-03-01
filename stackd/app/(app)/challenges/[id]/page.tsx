// app/(app)/challenges/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { Topbar } from "@/components/layout/Topbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaderboard } from "@/components/challenge/Leaderboard";
import { LogButton } from "@/components/challenge/LogButton";
import { InviteButton } from "@/components/challenge/InviteButton";
import { TrashTalk } from "@/components/challenge/TrashTalk";
import { DeleteChallengeButton } from "@/components/challenge/DeleteChallengeButton";
import { LeaveChallengeButton } from "@/components/challenge/LeaveChallengeButton";
import { ChallengeTabs } from "@/components/challenge/ChallengeTabs";
import { formatDate, daysRemaining } from "@/lib/utils";
import type { ChallengeRow, MemberRow } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ChallengePage({ params }: Props) {
  const { id } = await params;
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();

  // Fetch challenge
  const { data: rawChallenge } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", id)
    .single();

  const challenge = rawChallenge as ChallengeRow | null;
  if (!challenge) notFound();

  // Check membership
  const { data: rawMembership } = await supabase
    .from("challenge_members")
    .select("*")
    .eq("challenge_id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  const membership = rawMembership as MemberRow | null;

  // Check if logged today
  const today = new Date().toISOString().split("T")[0];
  const { data: todayLog } = await supabase
    .from("logs")
    .select("id")
    .eq("challenge_id", id)
    .eq("user_id", user.id)
    .eq("date", today)
    .maybeSingle();

  const days = daysRemaining(challenge.end_date);
  const isMember = !!membership;
  const loggedToday = !!todayLog;
  const isCreator = challenge.creator_id === user.id;

  return (
    <div>
      <Topbar title={challenge.name} backHref="/challenges" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* Challenge header */}
        <Card>
          <div className="flex items-start gap-3">
            <span className="text-4xl">{challenge.emoji}</span>
            <div className="flex-1 min-w-0">
              <h2 className="font-heading text-xl font-bold text-text">{challenge.name}</h2>
              <p className="text-sm text-muted mt-0.5">{challenge.goal}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant={challenge.status === "active" ? "green" : "muted"}>
              {challenge.status}
            </Badge>
            <Badge variant="default">⏰ {days}d left</Badge>
            <Badge variant="default">📅 Ends {formatDate(challenge.end_date)}</Badge>
          </div>

          {/* Stakes */}
          {(challenge.reward || challenge.punishment) && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {challenge.reward && (
                <div className="bg-green/10 border border-green/20 rounded-[--radius-input] p-3">
                  <p className="text-xs text-muted mb-0.5">Winner gets</p>
                  <p className="text-sm font-medium text-green">🏆 {challenge.reward}</p>
                </div>
              )}
              {challenge.punishment && (
                <div className="bg-red/10 border border-red/20 rounded-[--radius-input] p-3">
                  <p className="text-xs text-muted mb-0.5">Quitters get</p>
                  <p className="text-sm font-medium text-red">💀 {challenge.punishment}</p>
                </div>
              )}
            </div>
          )}

          {/* Creator actions */}
          {isCreator && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <Link href={`/challenges/${id}/edit`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  ✏️ Edit
                </Button>
              </Link>
              <DeleteChallengeButton challengeId={id} />
            </div>
          )}
        </Card>

        <ChallengeTabs
          overview={
            <div className="space-y-5">
              {isMember && challenge.status === "active" && (
                <LogButton
                  challengeId={id}
                  userId={user.id}
                  loggedToday={loggedToday}
                />
              )}
              {isMember && <InviteButton challengeId={id} />}
              {isMember && !isCreator && <LeaveChallengeButton challengeId={id} />}
              <div>
                <h3 className="font-heading font-semibold text-text mb-3">Leaderboard</h3>
                <Leaderboard challengeId={id} currentUserId={user.id} />
              </div>
            </div>
          }
          chat={
            isMember
              ? <TrashTalk challengeId={id} currentUserId={user.id} />
              : <p className="text-sm text-muted text-center py-10">Join this challenge to chat.</p>
          }
        />

      </div>
    </div>
  );
}
