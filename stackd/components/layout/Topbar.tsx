// components/layout/Topbar.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";
import { ProBadge } from "@/components/subscription/ProBadge";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import Link from "next/link";

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

interface TopbarProps {
  title?: string;
  backHref?: string;
}

export function Topbar({ title, backHref }: TopbarProps) {
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-4 bg-bg/85 backdrop-blur-md border-b border-border md:px-6">

      {/* Left side */}
      {backHref ? (
        /* Back button mode */
        <Link
          href={backHref}
          className="flex items-center gap-1 text-muted hover:text-text transition-colors -ml-1"
        >
          <ChevronLeft />
          <span className="font-heading font-semibold text-text text-base leading-none">
            {title}
          </span>
        </Link>
      ) : (
        <>
          {/* Mobile: show logo or title */}
          <span className="font-heading font-bold text-lg text-text md:hidden">
            {title ?? (
              <>Stack<span className="text-lime">d</span></>
            )}
          </span>
          {/* Desktop: show page title */}
          {title && (
            <h1 className="hidden md:block font-heading text-lg font-semibold text-text">
              {title}
            </h1>
          )}
        </>
      )}

      <div className="flex-1 md:flex-none" />

      {/* Right side */}
      <div className="flex items-center gap-1">
        <NotificationBell />
        <Link href="/profile" className="flex items-center gap-2">
          {profile?.is_pro && <ProBadge />}
          <Avatar src={profile?.avatar_url} username={profile?.username} size="sm" />
        </Link>
      </div>
    </header>
  );
}
