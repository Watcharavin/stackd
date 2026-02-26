// components/profile/LogoutButton.tsx
"use client";

import { createClient } from "@/lib/supabase";

export function LogoutButton() {
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full h-11 bg-surface-2 border border-border text-muted rounded-[--radius-btn] text-sm font-medium hover:text-red hover:border-red/30 hover:bg-red/5 transition-colors"
    >
      Log out
    </button>
  );
}
