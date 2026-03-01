// components/challenge/ChallengeTabs.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  overview: React.ReactNode;
  chat: React.ReactNode;
}

export function ChallengeTabs({ overview, chat }: Props) {
  const [tab, setTab] = useState<"overview" | "chat">("overview");

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 mb-5 rounded-[--radius-input]"
        style={{ background: "rgba(255,228,210,0.05)", border: "1px solid rgba(255,228,210,0.08)" }}
      >
        {(["overview", "chat"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 h-9 rounded-[--radius-btn] text-sm font-medium transition-all duration-200",
              tab === t
                ? "bg-lime text-bg shadow-sm"
                : "text-muted hover:text-text"
            )}
          >
            {t === "overview" ? "📊 Overview" : "💬 Chat"}
          </button>
        ))}
      </div>

      <div className={tab === "overview" ? "block" : "hidden"}>
        {overview}
      </div>
      <div className={tab === "chat" ? "block" : "hidden"}>
        {chat}
      </div>
    </div>
  );
}
