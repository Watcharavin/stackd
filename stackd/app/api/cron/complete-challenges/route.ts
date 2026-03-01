// app/api/cron/complete-challenges/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendPushToUser, supabaseAdmin } from "@/lib/webpush";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().split("T")[0];

    // Find all active challenges whose end_date has passed
    const { data: expired } = await supabaseAdmin
      .from("challenges")
      .select("id, name, emoji, creator_id")
      .eq("status", "active")
      .lt("end_date", today);

    if (!expired?.length) {
      return NextResponse.json({ ok: true, completed: 0 });
    }

    const ids = expired.map((c) => c.id);

    // Mark them all as completed
    await supabaseAdmin
      .from("challenges")
      .update({ status: "completed" })
      .in("id", ids);

    // Notify all members of each completed challenge
    let notified = 0;
    await Promise.allSettled(
      expired.map(async (challenge) => {
        const { data: members } = await supabaseAdmin
          .from("challenge_members")
          .select("user_id")
          .eq("challenge_id", challenge.id);

        if (!members?.length) return;

        await Promise.allSettled(
          members.map((m) =>
            sendPushToUser(m.user_id, {
              title: `${challenge.emoji} Challenge ended!`,
              body: `${challenge.name} has wrapped up. See the final results!`,
              url: `/challenges/${challenge.id}`,
            })
          )
        );
        notified += members.length;
      })
    );

    return NextResponse.json({ ok: true, completed: ids.length, notified });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[cron/complete-challenges]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
