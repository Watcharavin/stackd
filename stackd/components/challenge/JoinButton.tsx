// components/challenge/JoinButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PaywallModal } from "@/components/subscription/PaywallModal";

interface JoinButtonProps {
  challengeId: string;
}

export function JoinButton({ challengeId }: JoinButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  async function handleJoin() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/challenges/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId }),
    });

    if (res.status === 401) { router.push(`/login?next=/join/${challengeId}`); return; }

    const data = await res.json();

    if (data.error === "member_limit") {
      setShowPaywall(true);
      setLoading(false);
      return;
    }

    if (!res.ok) {
      setError("Could not join. Try again.");
      setLoading(false);
      return;
    }

    router.push(`/challenges/${challengeId}`);
    router.refresh();
  }

  return (
    <>
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

      <PaywallModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="member_limit"
      />
    </>
  );
}
