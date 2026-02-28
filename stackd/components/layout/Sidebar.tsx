// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/avatar";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="size-4 shrink-0" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function TrophyIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="size-4 shrink-0" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 17 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="size-4 shrink-0" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
      <path d="M3 21V3" />
    </svg>
  );
}

const navItems = [
  { href: "/dashboard",  label: "Dashboard",  Icon: HomeIcon },
  { href: "/challenges", label: "Challenges", Icon: TrophyIcon },
  { href: "/profile",    label: "Profile",    Icon: UserIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-56 min-h-dvh shrink-0" style={{
      background: "rgba(18, 18, 24, 0.98)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Logo */}
      <div className="h-14 flex items-center px-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/dashboard" className="font-heading font-bold text-xl text-text tracking-tight">
          Stack<span className="text-lime" style={{ textShadow: "0 0 16px rgba(217,119,87,0.45)" }}>d</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-3 px-3 h-10 rounded-[--radius-btn] text-sm font-medium transition-all duration-150",
                active
                  ? "bg-lime/10 text-lime"
                  : "text-muted hover:text-text hover:bg-surface-2"
              )}
            >
              {/* Active left bar */}
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-lime"
                  style={{ boxShadow: "0 0 8px rgba(217,119,87,0.65)" }}
                />
              )}
              <Icon active={active} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="p-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-[--radius-btn] hover:bg-surface-2 transition-colors group">
          <Avatar src={profile?.avatar_url} username={profile?.username} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">
              {profile?.username ?? "…"}
            </p>
          </div>
          <button
            onClick={signOut}
            className="text-muted hover:text-red transition-colors p-1 opacity-0 group-hover:opacity-100"
            title="Log out"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  );
}
