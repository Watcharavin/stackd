// app/api/push/notify/message/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendPushToUsers, supabaseAdmin } from "@/lib/webpush";

export async function POST(req: NextRequest) {
  try {
    const { challengeId, senderUserId, text } = await req.json() as {
      challengeId: string;
      senderUserId: string;
      text: string;
    };

    if (!challengeId || !senderUserId || !text) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Fetch challenge + sender username in parallel
    const [challengeRes, senderRes] = await Promise.all([
      supabaseAdmin
        .from("challenges")
        .select("name, emoji")
        .eq("id", challengeId)
        .single(),
      supabaseAdmin
        .from("users")
        .select("username")
        .eq("id", senderUserId)
        .single(),
    ]);

    const challenge = challengeRes.data;
    const sender = senderRes.data;
    if (!challenge || !sender) return NextResponse.json({ ok: true });

    // Fetch all other active members
    const { data: members } = await supabaseAdmin
      .from("challenge_members")
      .select("user_id")
      .eq("challenge_id", challengeId)
      .neq("user_id", senderUserId)
      .neq("status", "dead");

    if (!members?.length) return NextResponse.json({ ok: true });

    const recipientIds = members.map((m) => m.user_id);

    // Truncate long messages
    const preview = text.length > 60 ? text.slice(0, 57) + "..." : text;

    await sendPushToUsers(recipientIds, {
      title: `${challenge.emoji} ${challenge.name}`,
      body: `${sender.username}: ${preview}`,
      url: `/challenges/${challengeId}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[push/notify/message]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
