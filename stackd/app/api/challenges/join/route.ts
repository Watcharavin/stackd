// app/api/challenges/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";
import { getChallengeMemberCount, FREE_MEMBER_LIMIT } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { challengeId } = await req.json();
  if (!challengeId) return NextResponse.json({ error: "Missing challengeId" }, { status: 400 });

  const supabase = await createServerSupabase();

  // Use admin client to bypass RLS — joiner is not yet a member so session client can't read private challenges
  const { data: challenge } = await supabaseAdmin
    .from("challenges")
    .select("creator_id")
    .eq("id", challengeId)
    .single();

  if (!challenge) return NextResponse.json({ error: "Challenge not found" }, { status: 404 });

  const { data: creator } = await supabase
    .from("users")
    .select("is_pro")
    .eq("id", challenge.creator_id)
    .single();

  const creatorIsPro = creator?.is_pro ?? false;
  const memberCount = await getChallengeMemberCount(challengeId);

  if (!creatorIsPro && memberCount >= FREE_MEMBER_LIMIT) {
    return NextResponse.json({ error: "member_limit" }, { status: 403 });
  }

  const { error } = await supabase
    .from("challenge_members")
    .insert({ challenge_id: challengeId, user_id: user.id });

  if (error) {
    // Duplicate join — treat as success
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
