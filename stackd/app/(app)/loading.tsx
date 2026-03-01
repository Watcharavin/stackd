// app/(app)/loading.tsx
// Shown instantly on any navigation within the app while server fetches data
export default function AppLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 animate-pulse">
      {/* Topbar placeholder */}
      <div className="h-14 -mx-4 mb-2" />

      {/* Hero card skeleton */}
      <div className="rounded-[--radius-card] bg-surface h-28" />

      {/* Section header */}
      <div className="flex items-center justify-between pt-2">
        <div className="h-4 w-24 rounded bg-surface-2" />
        <div className="h-8 w-16 rounded-[--radius-btn] bg-surface-2" />
      </div>

      {/* Challenge card skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-[--radius-card] bg-surface p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-full bg-surface-2 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-2/3 rounded bg-surface-2" />
              <div className="h-2.5 w-1/2 rounded bg-surface-2" />
            </div>
            <div className="h-5 w-12 rounded-full bg-surface-2" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-surface-2" />
          <div className="flex justify-between">
            <div className="h-2.5 w-20 rounded bg-surface-2" />
            <div className="h-2.5 w-16 rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
