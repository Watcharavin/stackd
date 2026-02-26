// components/challenge/Leaderboard.tsx
"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

interface LeaderboardProps {
  challengeId: string;
  currentUserId: string;
}

export function Leaderboard({ challengeId, currentUserId }: LeaderboardProps) {
  const { entries, loading } = useLeaderboard(challengeId);

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-surface-2 rounded-[--radius-input] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => {
        const isMe = entry.user_id === currentUserId;
        const medal = RANK_MEDALS[entry.rank - 1];

        return (
          <div
            key={entry.user_id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-[--radius-input] transition-colors",
              isMe
                ? "bg-lime/10 border border-lime/20"
                : "bg-surface-2 border border-transparent"
            )}
          >
            {/* Rank */}
            <span className="w-7 text-center text-lg shrink-0">
              {medal ?? <span className="text-sm text-muted font-bold">{entry.rank}</span>}
            </span>

            {/* Avatar + name */}
            <Avatar
              src={entry.user.avatar_url}
              username={entry.user.username}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-medium truncate", isMe ? "text-lime" : "text-text")}>
                {entry.user.username}
                {isMe && <span className="text-muted font-normal"> (you)</span>}
              </p>
              <p className="text-xs text-muted">
                🔥 {entry.streak_days} streak · ✅ {entry.logged_days} days
              </p>
            </div>

            {/* Status */}
            <Badge
              variant={
                entry.status === "safe" ? "green"
                : entry.status === "risk" ? "yellow"
                : "red"
              }
            >
              {entry.status}
            </Badge>
          </div>
        );
      })}

      {entries.length === 0 && (
        <p className="text-center text-sm text-muted py-6">No members yet</p>
      )}
    </div>
  );
}
