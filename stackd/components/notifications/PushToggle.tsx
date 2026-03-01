// components/notifications/PushToggle.tsx
"use client";

import { usePushNotifications } from "@/hooks/usePushNotifications";
import { BellIcon, BellOffIcon } from "@/components/ui/icons";

export function PushToggle() {
  const { isSupported, isSubscribed, subscribe, unsubscribe, loading } =
    usePushNotifications();

  if (!isSupported) return null;

  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-[--radius-card]"
      style={{ background: "#242120", border: "1px solid rgba(255,228,210,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-surface-2 flex items-center justify-center text-muted">
          {isSubscribed
            ? <BellIcon className="size-4" />
            : <BellOffIcon className="size-4" />
          }
        </div>
        <div>
          <p className="text-sm font-medium text-text">Push notifications</p>
          <p className="text-xs text-muted">
            {isSubscribed ? "On — receiving alerts on this device" : "Off — not receiving alerts"}
          </p>
        </div>
      </div>

      <button
        onClick={isSubscribed ? unsubscribe : subscribe}
        disabled={loading}
        className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 focus:outline-none"
        style={{ background: isSubscribed ? "#D97757" : "rgba(255,255,255,0.1)" }}
        aria-label={isSubscribed ? "Turn off push notifications" : "Turn on push notifications"}
      >
        <span
          className="inline-block size-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: isSubscribed ? "translateX(22px)" : "translateX(3px)" }}
        />
      </button>
    </div>
  );
}
