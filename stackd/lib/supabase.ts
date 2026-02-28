// lib/supabase.ts
import { createBrowserClient } from "@supabase/ssr";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          created_at: string;
          is_pro: boolean;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          stripe_period_end: string | null;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          is_pro?: boolean;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_period_end?: string | null;
        };
        Update: {
          username?: string;
          avatar_url?: string | null;
          is_pro?: boolean;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_period_end?: string | null;
        };
        Relationships: [];
      };
      challenges: {
        Row: {
          id: string;
          name: string;
          emoji: string;
          goal: string;
          start_date: string;
          end_date: string;
          reward: string | null;
          punishment: string | null;
          privacy: "public" | "private";
          creator_id: string;
          status: "active" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          name: string;
          emoji: string;
          goal: string;
          start_date: string;
          end_date: string;
          reward?: string | null;
          punishment?: string | null;
          privacy: "public" | "private";
          creator_id: string;
          status?: "active" | "completed" | "cancelled";
        };
        Update: {
          name?: string;
          emoji?: string;
          goal?: string;
          start_date?: string;
          end_date?: string;
          reward?: string | null;
          punishment?: string | null;
          privacy?: "public" | "private";
          status?: "active" | "completed" | "cancelled";
        };
        Relationships: [];
      };
      challenge_members: {
        Row: {
          challenge_id: string;
          user_id: string;
          logged_days: number;
          streak_days: number;
          last_log_date: string | null;
          status: "safe" | "risk" | "dead";
          joined_at: string;
        };
        Insert: {
          challenge_id: string;
          user_id: string;
          logged_days?: number;
          streak_days?: number;
          last_log_date?: string | null;
          status?: "safe" | "risk" | "dead";
        };
        Update: {
          logged_days?: number;
          streak_days?: number;
          last_log_date?: string | null;
          status?: "safe" | "risk" | "dead";
        };
        Relationships: [];
      };
      logs: {
        Row: {
          id: string;
          challenge_id: string;
          user_id: string;
          date: string;
          photo_url: string | null;
          photo_hash: string | null;
          created_at: string;
        };
        Insert: {
          challenge_id: string;
          user_id: string;
          date: string;
          photo_url?: string | null;
          photo_hash?: string | null;
        };
        Update: {
          photo_url?: string | null;
          photo_hash?: string | null;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          challenge_id: string;
          user_id: string;
          text: string;
          type: "message" | "system" | "trash_talk";
          photo_url: string | null;
          created_at: string;
        };
        Insert: {
          challenge_id: string;
          user_id: string;
          text: string;
          type?: "message" | "system" | "trash_talk";
          photo_url?: string | null;
        };
        Update: {
          text?: string;
        };
        Relationships: [];
      };
      push_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

// Convenience row types
export type ChallengeRow = Database["public"]["Tables"]["challenges"]["Row"];
export type MemberRow = Database["public"]["Tables"]["challenge_members"]["Row"];
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type LogRow = Database["public"]["Tables"]["logs"]["Row"];
export type MessageRow = Database["public"]["Tables"]["messages"]["Row"];
export type PushSubscriptionRow = Database["public"]["Tables"]["push_subscriptions"]["Row"];

// ─── Browser Client (use in Client Components) ────────────────────────────────

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
