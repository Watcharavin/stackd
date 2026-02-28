// app/(app)/challenges/[id]/loading.tsx
import { Topbar } from "@/components/layout/Topbar";

export default function ChallengeLoading() {
  return (
    <div>
      <Topbar />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* Challenge header skeleton */}
        <div className="rounded-[--radius-card] border border-border bg-surface p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded bg-surface-2 animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 rounded bg-surface-2 animate-pulse" />
              <div className="h-3 w-56 rounded bg-surface-2 animate-pulse" />
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-20 rounded-full bg-surface-2 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Log button skeleton */}
        <div className="h-16 w-full rounded-[--radius-card] bg-surface-2 animate-pulse" />

        {/* Invite skeleton */}
        <div className="h-10 w-full rounded-[--radius-btn] bg-surface-2 animate-pulse" />

        {/* Leaderboard skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-28 rounded bg-surface-2 animate-pulse mb-3" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 w-full rounded-[--radius-input] bg-surface-2 animate-pulse"
            />
          ))}
        </div>

        {/* Trash talk skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-32 rounded bg-surface-2 animate-pulse" />
          <div className="h-64 w-full rounded-[--radius-card] bg-surface-2 animate-pulse" />
          <div className="h-10 w-full rounded-[--radius-input] bg-surface-2 animate-pulse" />
        </div>

      </div>
    </div>
  );
}
