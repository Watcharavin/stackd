// hooks/useLeaderboard.ts
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";

type Member = Database["public"]["Tables"]["challenge_members"]["Row"];
type UserProfile = Database["public"]["Tables"]["users"]["Row"];

export interface LeaderboardEntry extends Member {
  user: UserProfile;
  rank: number;
}

export function useLeaderboard(challengeId: string) {
  const supabase = createClient();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeaderboard() {
    const { data } = await supabase
      .from("challenge_members")
      .select("*, users(*)")
      .eq("challenge_id", challengeId)
      .order("logged_days", { ascending: false })
      .order("streak_days", { ascending: false });

    if (!data) return;

    const ranked = (data as unknown as (Member & { users: UserProfile })[]).map(
      (row, i) => ({ ...row, user: row.users, rank: i + 1 })
    );

    setEntries(ranked);
    setLoading(false);
  }

  useEffect(() => {
    fetchLeaderboard();

    // Realtime subscription on challenge_members
    const channel = supabase
      .channel(`leaderboard:${challengeId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "challenge_members",
          filter: `challenge_id=eq.${challengeId}`,
        },
        () => fetchLeaderboard()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  return { entries, loading };
}
