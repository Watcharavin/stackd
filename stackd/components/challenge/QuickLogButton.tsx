// components/challenge/QuickLogButton.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { CheckIcon } from "@/components/ui/icons";

interface Props {
  challengeId: string;
  userId: string;
  loggedToday: boolean;
}

export function QuickLogButton({ challengeId, userId, loggedToday }: Props) {
  const [done, setDone] = useState(loggedToday);
  const [loading, setLoading] = useState(false);

  if (done) {
    return (
      <span className="text-xs font-medium text-green flex items-center gap-1">
        <CheckIcon className="size-3.5" strokeWidth={2.5} />
        Logged
      </span>
    );
  }

  async function handleLog(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const supabase = createClient();
    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("logs").insert({
      challenge_id: challengeId,
      user_id: userId,
      date: today,
    });

    if (error && error.code !== "23505") {
      setLoading(false);
      return;
    }

    const { data: member } = await supabase
      .from("challenge_members")
      .select("logged_days, streak_days, last_log_date")
      .eq("challenge_id", challengeId)
      .eq("user_id", userId)
      .single();

    if (member) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split("T")[0];
      const isConsecutive = member.last_log_date === yStr;

      await supabase
        .from("challenge_members")
        .update({
          logged_days: member.logged_days + 1,
          streak_days: isConsecutive ? member.streak_days + 1 : 1,
          last_log_date: today,
          status: "safe",
        })
        .eq("challenge_id", challengeId)
        .eq("user_id", userId);
    }

    fetch("/api/push/notify/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId, loggerUserId: userId }),
    });

    setDone(true);
    setLoading(false);
  }

  return (
    <button
      onClick={handleLog}
      disabled={loading}
      className="text-xs font-medium text-lime border border-lime/30 rounded-full px-3 py-1 hover:bg-lime/10 transition-colors disabled:opacity-50 flex items-center gap-1"
    >
      {loading ? (
        <span className="size-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : "Log today"}
    </button>
  );
}
