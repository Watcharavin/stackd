// app/(app)/challenges/new/actions.ts
"use server";

import { redirect } from "next/navigation";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { getUserPlan, FREE_CHALLENGE_LIMIT } from "@/lib/subscription";

type ChallengeInput = {
  name: string;
  emoji: string;
  goal: string;
  end_date: string;
  reward?: string | null;
  punishment?: string | null;
  privacy: "public" | "private";
};

type Result =
  | { id: string; error?: never }
  | { error: "limit_reached" | "unauthorized" | string; id?: never };

export async function createChallenge(input: ChallengeInput): Promise<Result> {
  const user = await getUser();
  if (!user) return { error: "unauthorized" };

  // Server-side limit check
  const plan = await getUserPlan(user.id);
  if (!plan.isPro && plan.activeCreatedChallenges >= FREE_CHALLENGE_LIMIT) {
    return { error: "limit_reached" };
  }

  const supabase = await createServerSupabase();
  const { data: challenge, error } = await supabase
    .from("challenges")
    .insert({
      name: input.name,
      emoji: input.emoji,
      goal: input.goal,
      start_date: new Date().toISOString().split("T")[0],
      end_date: input.end_date,
      reward: input.reward || null,
      punishment: input.punishment || null,
      privacy: input.privacy,
      creator_id: user.id,
      status: "active",
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  redirect(`/challenges/${challenge.id}`);
}
