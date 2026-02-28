// app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);

    // Check username uniqueness
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("username", data.username)
      .maybeSingle();

    if (existing) {
      setServerError("Username is already taken");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { username: data.username },
      },
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setConfirmedEmail(data.email);
    setDone(true);
  }

  // ─── Email verification screen ────────────────────────────────────────────
  if (done) {
    return (
      <div className="flex flex-col items-center text-center gap-5">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center text-3xl">
          ✉️
        </div>

        <div className="space-y-1.5">
          <h1 className="font-heading text-2xl font-bold text-text">Check your email</h1>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            We sent a verification link to
          </p>
          <p className="text-sm font-semibold text-lime break-all">{confirmedEmail}</p>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            Click the link in the email to activate your account.
          </p>
        </div>

        <div className="w-full space-y-2 pt-1">
          <Button
            size="lg"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Go to login
          </Button>
          <button
            className="w-full text-sm text-muted hover:text-text transition-colors py-2"
            onClick={() => setDone(false)}
          >
            Use a different email
          </button>
        </div>

        <p className="text-xs text-muted">
          Didn&apos;t receive it? Check spam or{" "}
          <button
            className="text-lime hover:underline"
            onClick={() => setDone(false)}
          >
            try again
          </button>
          .
        </p>
      </div>
    );
  }

  // ─── Signup form ──────────────────────────────────────────────────────────
  return (
    <>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-text">Create account</h1>
        <p className="text-sm text-muted mt-1">Start challenging your friends today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Username with @ prefix hint */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">Username</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm select-none">@</span>
            <input
              placeholder="artcu"
              autoComplete="username"
              className="w-full h-11 pl-7 pr-3 rounded-[--radius-input] bg-surface-2 border border-border text-text text-sm placeholder:text-muted focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/20 transition-colors"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-red">{errors.username.message}</p>
          )}
          <p className="text-xs text-muted">Lowercase letters, numbers, and underscores</p>
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          hint="At least 6 characters"
          error={errors.password?.message}
          {...register("password")}
        />

        {serverError && (
          <p className="text-sm text-red bg-red/10 border border-red/20 rounded-[--radius-input] px-3 py-2">
            {serverError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full mt-1" loading={isSubmitting}>
          Create account →
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-5">
        Already have an account?{" "}
        <Link href="/login" className="text-lime hover:underline font-medium">
          Log in
        </Link>
      </p>
    </>
  );
}
