// app/api/challenges/leave/route.ts
import { NextResponse } from "next/server";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";

export async function DELETE(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { challengeId } = await request.json();
  if (!challengeId) {
    return NextResponse.json({ error: "Missing challengeId" }, { status: 400 });
  }

  // Verify challenge exists and user is not the creator
  const { data: challenge } = await supabaseAdmin
    .from("challenges")
    .select("creator_id")
    .eq("id", challengeId)
    .single();

  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }

  if (challenge.creator_id === user.id) {
    return NextResponse.json({ error: "Creator cannot leave the challenge" }, { status: 403 });
  }

  // Delete membership via session client (respects RLS)
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("challenge_members")
    .delete()
    .eq("challenge_id", challengeId)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
