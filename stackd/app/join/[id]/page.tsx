// app/join/[id]/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JoinButton } from "@/components/challenge/JoinButton";
import { formatDate, daysRemaining } from "@/lib/utils";
import type { ChallengeRow } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JoinPage({ params }: Props) {
  const { id } = await params;
  const user = await getUser();

  // Use admin client to bypass RLS — invite links must be publicly readable
  const { data: raw } = await supabaseAdmin
    .from("challenges")
    .select("*")
    .eq("id", id)
    .single();

  const challenge = raw as ChallengeRow | null;
  if (!challenge) {
    return (
      <div className="min-h-dvh bg-bg flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-3">🤔</p>
          <h1 className="font-heading text-xl font-bold text-text mb-2">Challenge not found</h1>
          <p className="text-muted text-sm">This invite link may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  // Check if already a member (use user-session client so RLS scopes to current user)
  const supabase = user ? await createServerSupabase() : null;
  let isMember = false;
  if (user && supabase) {
    const { data: membership } = await supabase
      .from("challenge_members")
      .select("user_id")
      .eq("challenge_id", id)
      .eq("user_id", user.id)
      .maybeSingle();
    isMember = !!membership;
  }

  // If already member → go straight to challenge
  if (isMember) redirect(`/challenges/${id}`);

  const days = daysRemaining(challenge.end_date);

  return (
    <div className="min-h-dvh bg-bg flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8 font-heading font-bold text-2xl text-text tracking-tight">
        Stack<span className="text-lime">d</span>
      </Link>

      <div className="w-full max-w-sm space-y-4">
        <p className="text-center text-sm text-muted">You&apos;ve been invited to join</p>

        {/* Challenge card */}
        <Card glow>
          <div className="flex items-start gap-3 mb-4">
            <span className="text-4xl">{challenge.emoji}</span>
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-xl font-bold text-text">{challenge.name}</h1>
              <p className="text-sm text-muted mt-0.5">{challenge.goal}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={challenge.status === "active" ? "green" : "muted"}>
              {challenge.status}
            </Badge>
            <Badge variant="default">⏰ {days}d left</Badge>
            <Badge variant="default">📅 Ends {formatDate(challenge.end_date)}</Badge>
          </div>

          {(challenge.reward || challenge.punishment) && (
            <div className="grid grid-cols-2 gap-2">
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
        </Card>

        {/* CTA */}
        {challenge.status !== "active" ? (
          <div className="text-center py-4">
            <p className="text-muted text-sm">This challenge has already ended.</p>
          </div>
        ) : user ? (
          <JoinButton challengeId={id} />
        ) : (
          <div className="space-y-2">
            <Link href={`/signup?next=/join/${id}`} className="block">
              <button className="w-full h-12 bg-lime text-bg font-heading font-bold rounded-[--radius-card] hover:brightness-110 transition-all">
                Sign up to join
              </button>
            </Link>
            <Link href={`/login?next=/join/${id}`} className="block">
              <button className="w-full h-12 bg-surface-2 text-text border border-border rounded-[--radius-card] hover:bg-muted-2 transition-all text-sm font-medium">
                Already have an account? Log in
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
