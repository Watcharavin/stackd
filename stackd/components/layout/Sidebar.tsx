// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "⚡" },
  { href: "/challenges", label: "Challenges", icon: "🎯" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-56 min-h-dvh bg-surface border-r border-border shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-border">
        <span className="font-heading font-bold text-xl text-text tracking-tight">
          Stack<span className="text-lime">d</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 h-10 rounded-[--radius-btn] text-sm font-medium transition-colors",
                active
                  ? "bg-lime/10 text-lime"
                  : "text-muted hover:text-text hover:bg-surface-2"
              )}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-[--radius-btn] hover:bg-surface-2 transition-colors">
          <Avatar src={profile?.avatar_url} username={profile?.username} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">
              {profile?.username ?? "…"}
            </p>
          </div>
          <button
            onClick={signOut}
            className="text-muted hover:text-text transition-colors text-xs px-1"
            title="Log out"
          >
            ↪
          </button>
        </div>
      </div>
    </aside>
  );
}
