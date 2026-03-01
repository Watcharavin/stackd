// components/challenge/Leaderboard.tsx
"use client";

import Link from "next/link";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { InviteButton } from "@/components/challenge/InviteButton";
import { FlameIcon, CheckIcon } from "@/components/ui/icons";
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
            <Link
              href={isMe ? "/profile" : `/profile/${entry.user.username}`}
              className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
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
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <FlameIcon className="size-3" />
                    {entry.streak_days}
                  </span>
                  <span className="text-border">·</span>
                  <span className="flex items-center gap-1">
                    <CheckIcon className="size-3" strokeWidth={2.5} />
                    {entry.logged_days} days
                  </span>
                </div>
              </div>
            </Link>

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
        <div className="flex flex-col items-center text-center py-10 gap-3">
          <p className="text-3xl">👥</p>
          <p className="font-heading font-semibold text-text text-sm">No teammates yet</p>
          <p className="text-xs text-muted">Invite friends to start competing</p>
          <InviteButton challengeId={challengeId} />
        </div>
      )}
    </div>
  );
}
