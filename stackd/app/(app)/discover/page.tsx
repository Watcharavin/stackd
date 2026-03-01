// app/(app)/discover/page.tsx
import { redirect } from "next/navigation";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";
import { Topbar } from "@/components/layout/Topbar";
import { JoinButton } from "@/components/challenge/JoinButton";
import { Badge } from "@/components/ui/badge";
import { daysRemaining } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();

  // Fetch user's existing memberships
  const { data: memberships } = await supabase
    .from("challenge_members")
    .select("challenge_id")
    .eq("user_id", user.id);

  const joinedIds = new Set((memberships ?? []).map((m) => m.challenge_id));

  // Query public active challenges with member counts (bypass RLS)
  const { data: challenges } = await supabaseAdmin
    .from("challenges")
    .select("*, challenge_members(user_id)")
    .eq("privacy", "public")
    .eq("status", "active");

  // Filter out challenges the user already joined or created
  const available = (challenges ?? []).filter(
    (c) => !joinedIds.has(c.id) && c.creator_id !== user.id
  );

  return (
    <div>
      <Topbar title="Discover" />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="font-heading text-xl font-bold text-text mb-1">Public Challenges</h2>
        <p className="text-sm text-muted mb-6">Join an open challenge and compete with others.</p>

        {available.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <span className="text-4xl">🧭</span>
            <p className="text-muted text-sm">No public challenges available right now.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {available.map((challenge) => {
              const memberCount = Array.isArray(challenge.challenge_members)
                ? challenge.challenge_members.length
                : 0;
              const days = daysRemaining(challenge.end_date);

              return (
                <div
                  key={challenge.id}
                  className="rounded-[--radius-card] p-4 flex flex-col gap-3"
                  style={{
                    background: "#242120",
                    border: "1px solid rgba(255,228,210,0.08)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl leading-none">{challenge.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-text text-base truncate">
                        {challenge.name}
                      </h3>
                      <p className="text-xs text-muted mt-0.5 line-clamp-2">{challenge.goal}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="default">⏰ {days}d left</Badge>
                    <Badge variant="default">
                      👥 {memberCount} member{memberCount !== 1 ? "s" : ""}
                    </Badge>
                  </div>

                  <JoinButton challengeId={challenge.id} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
