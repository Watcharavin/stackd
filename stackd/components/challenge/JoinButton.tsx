// components/challenge/JoinButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

interface JoinButtonProps {
  challengeId: string;
}

export function JoinButton({ challengeId }: JoinButtonProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleJoin() {
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push(`/login?next=/join/${challengeId}`); return; }

    const { error: insertError } = await supabase
      .from("challenge_members")
      .insert({ challenge_id: challengeId, user_id: user.id });

    if (insertError) {
      setError("Could not join. Try again.");
      setLoading(false);
      return;
    }

    router.push(`/challenges/${challengeId}`);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleJoin}
        disabled={loading}
        className="w-full h-12 bg-lime text-bg font-heading font-bold rounded-[--radius-card] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="size-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : "⚡ Join challenge"}
      </button>
      {error && <p className="text-xs text-red text-center">{error}</p>}
    </div>
  );
}
