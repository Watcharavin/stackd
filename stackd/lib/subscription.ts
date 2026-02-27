// lib/subscription.ts
import { createServerSupabase } from "./supabase-server";
import { FREE_CHALLENGE_LIMIT, FREE_MEMBER_LIMIT } from "./stripe";

export type PlanLimits = {
  isPro: boolean;
  activeCreatedChallenges: number;
  stripeCustomerId: string | null;
  periodEnd: string | null;
};

/** Fetch the user's plan status in one DB round-trip */
export async function getUserPlan(userId: string): Promise<PlanLimits> {
  const supabase = await createServerSupabase();

  const [{ data: userRow }, { count: activeCount }] = await Promise.all([
    supabase
      .from("users")
      .select("is_pro, stripe_customer_id, stripe_period_end")
      .eq("id", userId)
      .single(),
    supabase
      .from("challenges")
      .select("*", { count: "exact", head: true })
      .eq("creator_id", userId)
      .eq("status", "active"),
  ]);

  return {
    isPro: userRow?.is_pro ?? false,
    activeCreatedChallenges: activeCount ?? 0,
    stripeCustomerId: userRow?.stripe_customer_id ?? null,
    periodEnd: userRow?.stripe_period_end ?? null,
  };
}

/** How many members are already in a challenge */
export async function getChallengeMemberCount(challengeId: string): Promise<number> {
  const supabase = await createServerSupabase();
  const { count } = await supabase
    .from("challenge_members")
    .select("*", { count: "exact", head: true })
    .eq("challenge_id", challengeId);
  return count ?? 0;
}

export { FREE_CHALLENGE_LIMIT, FREE_MEMBER_LIMIT };
