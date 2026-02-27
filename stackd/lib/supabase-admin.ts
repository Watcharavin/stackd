// lib/supabase-admin.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

// Service-role client — bypasses RLS. Server-only. Never expose to client.
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
