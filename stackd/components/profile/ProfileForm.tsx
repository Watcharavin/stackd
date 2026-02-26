// components/profile/ProfileForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  username: z
    .string()
    .min(3, "At least 3 characters")
    .max(20, "Max 20 characters")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, underscores"),
});
type FormData = z.infer<typeof schema>;

interface ProfileFormProps {
  userId: string;
  currentUsername: string;
}

export function ProfileForm({ userId, currentUsername }: ProfileFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { username: currentUsername },
  });

  async function onSubmit(data: FormData) {
    setServerError(null);
    setSuccess(false);

    if (data.username !== currentUsername) {
      // Check uniqueness
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("username", data.username)
        .maybeSingle();

      if (existing) {
        setServerError("Username is already taken");
        return;
      }
    }

    const { error } = await supabase
      .from("users")
      .update({ username: data.username })
      .eq("id", userId);

    if (error) { setServerError(error.message); return; }

    setSuccess(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Username"
        placeholder="your_username"
        hint="Lowercase letters, numbers, underscores"
        error={errors.username?.message}
        {...register("username")}
      />

      {serverError && (
        <p className="text-sm text-red bg-red/10 border border-red/20 rounded-[--radius-input] px-3 py-2">
          {serverError}
        </p>
      )}
      {success && (
        <p className="text-sm text-green bg-green/10 border border-green/20 rounded-[--radius-input] px-3 py-2">
          ✅ Profile updated!
        </p>
      )}

      <Button type="submit" loading={isSubmitting} className="w-full">
        Save changes
      </Button>
    </form>
  );
}
