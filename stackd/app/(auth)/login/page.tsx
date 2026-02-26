// app/(auth)/login/page.tsx
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

function LoginForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-text">Welcome back</h1>
        <p className="text-sm text-muted mt-1">Log in to your Stackd account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        {serverError && (
          <p className="text-sm text-red bg-red/10 border border-red/20 rounded-[--radius-input] px-3 py-2">
            {serverError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full mt-1" loading={isSubmitting}>
          Log in
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-5">
        No account?{" "}
        <Link href="/signup" className="text-lime hover:underline font-medium">
          Sign up free
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
