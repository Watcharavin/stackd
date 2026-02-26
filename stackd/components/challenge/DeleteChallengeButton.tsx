// components/challenge/DeleteChallengeButton.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

interface DeleteChallengeButtonProps {
  challengeId: string;
}

export function DeleteChallengeButton({ challengeId }: DeleteChallengeButtonProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const ok = window.confirm("Delete this challenge? This cannot be undone.");
    if (!ok) return;

    setLoading(true);

    const { error } = await supabase
      .from("challenges")
      .delete()
      .eq("id", challengeId);

    if (error) {
      alert("Failed to delete: " + error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/challenges";
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="h-9 px-4 bg-red/10 text-red border border-red/20 rounded-[--radius-btn] text-sm font-medium hover:bg-red/20 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin inline-block" />
      ) : (
        "🗑 Delete"
      )}
    </button>
  );
}
