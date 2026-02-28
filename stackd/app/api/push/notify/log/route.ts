// app/api/push/notify/log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendPushToUsers, supabaseAdmin } from "@/lib/webpush";

export async function POST(req: NextRequest) {
  try {
    const { challengeId, loggerUserId } = await req.json() as {
      challengeId: string;
      loggerUserId: string;
    };

    if (!challengeId || !loggerUserId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Fetch challenge name + logger username in parallel
    const [challengeRes, loggerRes] = await Promise.all([
      supabaseAdmin
        .from("challenges")
        .select("name, emoji")
        .eq("id", challengeId)
        .single(),
      supabaseAdmin
        .from("users")
        .select("username")
        .eq("id", loggerUserId)
        .single(),
    ]);

    const challenge = challengeRes.data;
    const logger = loggerRes.data;
    if (!challenge || !logger) return NextResponse.json({ ok: true });

    // Fetch all other active members
    const { data: members } = await supabaseAdmin
      .from("challenge_members")
      .select("user_id")
      .eq("challenge_id", challengeId)
      .neq("user_id", loggerUserId)
      .neq("status", "dead");

    if (!members?.length) return NextResponse.json({ ok: true });

    const recipientIds = members.map((m) => m.user_id);

    await sendPushToUsers(recipientIds, {
      title: `${challenge.emoji} ${challenge.name}`,
      body: `${logger.username} log แล้ว! คุณยัง? 🔥`,
      url: `/challenges/${challengeId}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[push/notify/log]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
