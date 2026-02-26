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

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-text">Create account</h1>
        <p className="text-sm text-muted mt-1">Start challenging your friends today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Username"
          placeholder="e.g. artcu"
          autoComplete="username"
          hint="Lowercase, letters and numbers only"
          error={errors.username?.message}
          {...register("username")}
        />
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
          Create account
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
