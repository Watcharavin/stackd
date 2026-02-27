// components/layout/Topbar.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";
import { ProBadge } from "@/components/subscription/ProBadge";
import Link from "next/link";

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-4 bg-bg/80 backdrop-blur-md border-b border-border md:px-6">
      {/* Mobile logo */}
      <span className="font-heading font-bold text-lg text-text md:hidden">
        {title ?? <>Stack<span className="text-lime">d</span></>}
      </span>
      {/* Desktop page title */}
      {title && (
        <h1 className="hidden md:block font-heading text-lg font-semibold text-text">
          {title}
        </h1>
      )}
      <div className="flex-1 md:flex-none" />

      {/* Right side */}
      <Link href="/profile" className="flex items-center gap-2">
        {profile?.is_pro && <ProBadge />}
        <Avatar src={profile?.avatar_url} username={profile?.username} size="sm" />
      </Link>
    </header>
  );
}
