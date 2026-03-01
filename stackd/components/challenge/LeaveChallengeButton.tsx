// components/challenge/LeaveChallengeButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  challengeId: string;
}

export function LeaveChallengeButton({ challengeId }: Props) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLeave() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/challenges/leave", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not leave. Try again.");
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/challenges");
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted">Sure?</span>
        <button
          onClick={() => setConfirm(false)}
          className="h-9 px-3 rounded-[--radius-btn] text-sm font-medium text-muted border border-border hover:text-text hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleLeave}
          disabled={loading}
          className="h-9 px-3 rounded-[--radius-btn] text-sm font-medium text-red bg-red/10 border border-red/30 hover:bg-red/20 transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {loading ? (
            <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            "Confirm"
          )}
        </button>
        {error && <p className="text-xs text-red w-full">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="h-9 px-4 rounded-[--radius-btn] text-sm font-medium text-red border border-red/20 hover:bg-red/10 transition-colors"
    >
      🚪 Leave
    </button>
  );
}
