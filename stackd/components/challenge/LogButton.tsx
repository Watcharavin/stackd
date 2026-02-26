// components/challenge/LogButton.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogButtonProps {
  challengeId: string;
  userId: string;
  loggedToday: boolean;
  onLogged?: () => void;
}

export function LogButton({ challengeId, userId, loggedToday, onLogged }: LogButtonProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(loggedToday);

  async function handleLog() {
    if (done) return;
    setLoading(true);

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("logs").insert({
      challenge_id: challengeId,
      user_id: userId,
      date: today,
    });

    if (!error) {
      // Update member stats
      const { data: member } = await supabase
        .from("challenge_members")
        .select("logged_days, streak_days, last_log_date")
        .eq("challenge_id", challengeId)
        .eq("user_id", userId)
        .single();

      if (member) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];
        const isConsecutive = member.last_log_date === yesterdayStr;

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

      setDone(true);
      onLogged?.();
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleLog}
      disabled={done || loading}
      className={cn(
        "w-full h-16 rounded-[--radius-card] font-heading font-bold text-lg transition-all duration-200",
        "flex items-center justify-center gap-3",
        done
          ? "bg-green/10 text-green border-2 border-green/30 cursor-default"
          : "bg-lime text-bg hover:brightness-110 active:scale-[0.98] shadow-[--shadow-glow]",
        loading && "opacity-60 cursor-wait"
      )}
    >
      {loading ? (
        <span className="size-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : done ? (
        <>✅ Logged today!</>
      ) : (
        <>⚡ Log today</>
      )}
    </button>
  );
}
