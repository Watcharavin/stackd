// app/api/notifications/read/route.ts
import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/webpush";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json().catch(() => ({}));

  const query = supabaseAdmin
    .from("notifications")
    .update({ read: true })
    .eq("user_id", user.id);

  // Mark single notification if id provided, otherwise mark all
  if (id) {
    await query.eq("id", id);
  } else {
    await query.eq("read", false);
  }

  return NextResponse.json({ ok: true });
}
