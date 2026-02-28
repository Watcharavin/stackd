// app/(app)/dashboard/loading.tsx
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardLoading() {
  return (
    <div>
      <Topbar />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Hero skeleton */}
        <div className="rounded-[--radius-card] border border-border p-5 space-y-3">
          <div className="h-3 w-24 rounded bg-surface-2 animate-pulse" />
          <div className="h-7 w-44 rounded bg-surface-2 animate-pulse" />
          <div className="flex gap-5 pt-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-6 w-8 rounded bg-surface-2 animate-pulse" />
                <div className="h-2.5 w-14 rounded bg-surface-2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-24 rounded bg-surface-2 animate-pulse" />
            <div className="h-8 w-16 rounded-[--radius-chip] bg-surface-2 animate-pulse" />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[--radius-card] border border-border bg-surface p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="size-8 rounded bg-surface-2 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 rounded bg-surface-2 animate-pulse" />
                  <div className="h-3 w-52 rounded bg-surface-2 animate-pulse" />
                </div>
                <div className="h-5 w-12 rounded-full bg-surface-2 animate-pulse" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-surface-2 animate-pulse" />
              <div className="flex justify-between">
                <div className="h-2.5 w-20 rounded bg-surface-2 animate-pulse" />
                <div className="h-2.5 w-20 rounded bg-surface-2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
