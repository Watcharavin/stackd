// app/api/cron/streak-warning/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendPushToUser, supabaseAdmin } from "@/lib/webpush";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify cron secret
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().split("T")[0];

    // Find members with an active streak who haven't logged today
    const { data: members } = await supabaseAdmin
      .from("challenge_members")
      .select("user_id, streak_days, challenges!inner(id, name, emoji, status)")
      .gt("streak_days", 0)
      .or(`last_log_date.is.null,last_log_date.neq.${today}`)
      .eq("challenges.status", "active");

    if (!members?.length) return NextResponse.json({ ok: true, sent: 0 });

    let sent = 0;
    await Promise.allSettled(
      members.map(async (m) => {
        const row = m as typeof m & {
          challenges: { id: string; name: string; emoji: string; status: string };
        };
        const challenge = row.challenges;
        if (!challenge) return;

        await sendPushToUser(m.user_id, {
          title: "💀 Streak กำลังจะหลุด!",
          body: `Streak ${m.streak_days} วันของคุณใน ${challenge.emoji} ${challenge.name} — Log ก่อนเที่ยงคืน!`,
          url: `/challenges/${challenge.id}`,
        });
        sent++;
      })
    );

    return NextResponse.json({ ok: true, sent });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[cron/streak-warning]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
