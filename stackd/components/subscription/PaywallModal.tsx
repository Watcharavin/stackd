// components/subscription/PaywallModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  reason: "challenge_limit" | "member_limit";
}

const CONTENT = {
  challenge_limit: {
    icon: "⚡",
    title: "You've hit the Free limit",
    body: "Free accounts can run up to 2 active challenges at once. Upgrade to Pro for unlimited challenges.",
  },
  member_limit: {
    icon: "👥",
    title: "This challenge is full",
    body: "Free challenges support up to 6 members. The challenge creator needs Pro to unlock unlimited members.",
  },
};

export function PaywallModal({ open, onClose, reason }: PaywallModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { icon, title, body } = CONTENT[reason];

  if (!open) return null;

  async function handleUpgrade() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
      }
    } catch {
      setError("Could not connect. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-surface border border-border rounded-[--radius-card] p-6 space-y-5 shadow-xl">
        <div className="text-4xl text-center">{icon}</div>

        <div className="text-center space-y-2">
          <h2 className="font-heading text-lg font-bold text-text">{title}</h2>
          <p className="text-sm text-muted">{body}</p>
        </div>

        {/* Pro features list */}
        <ul className="space-y-2">
          {[
            "Unlimited active challenges",
            "Unlimited members per challenge",
            "Cancel anytime",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-text">
              <span className="text-lime">✓</span> {f}
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <Button
            onClick={handleUpgrade}
            loading={loading}
            size="lg"
            className="w-full"
          >
            ⚡ Upgrade to Pro — ฿149/mo
          </Button>
          {error && <p className="text-xs text-red text-center">{error}</p>}
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={onClose}
          >
            Maybe later
          </Button>
        </div>
      </div>
    </div>
  );
}
