// app/(app)/upgrade/UpgradeButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="space-y-2">
      <Button size="lg" className="w-full" loading={loading} onClick={handleUpgrade}>
        ⚡ Upgrade to Pro — ฿149/mo
      </Button>
      {error && (
        <p className="text-xs text-red text-center">{error}</p>
      )}
    </div>
  );
}
