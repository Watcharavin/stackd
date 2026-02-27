// app/(app)/challenges/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PaywallModal } from "@/components/subscription/PaywallModal";
import { createChallenge } from "./actions";

const EMOJIS = ["🎯", "💪", "📚", "🏃", "🧘", "✍️", "🎸", "🥗", "💻", "🌅", "🚴", "🏊"];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  emoji: z.string().min(1),
  goal: z.string().min(5, "Describe the daily goal").max(200),
  end_date: z.string().min(1, "Pick an end date"),
  reward: z.string().max(100).optional(),
  punishment: z.string().max(100).optional(),
  privacy: z.enum(["private", "public"]),
});
type FormData = z.infer<typeof schema>;

// Min date = tomorrow
function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function NewChallengePage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState("🎯");
  const [showPaywall, setShowPaywall] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { emoji: "🎯", privacy: "private" },
  });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const result = await createChallenge({
      name: data.name,
      emoji: data.emoji,
      goal: data.goal,
      end_date: data.end_date,
      reward: data.reward || null,
      punishment: data.punishment || null,
      privacy: data.privacy,
    });

    if (result?.error === "limit_reached") { setShowPaywall(true); return; }
    if (result?.error === "unauthorized") { router.push("/login"); return; }
    if (result?.error) { setServerError(result.error); return; }
    // On success, createChallenge redirects server-side
  }

  return (
    <div>
      <Topbar title="New Challenge" />
      <div className="max-w-lg mx-auto px-4 py-6">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Emoji picker */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-text">Pick an emoji</p>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => { setSelectedEmoji(e); setValue("emoji", e); }}
                  className={`text-2xl w-11 h-11 rounded-[--radius-btn] transition-all flex items-center justify-center
                    ${selectedEmoji === e
                      ? "bg-lime/20 ring-2 ring-lime"
                      : "bg-surface-2 hover:bg-muted-2"
                    }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Challenge name"
            placeholder="e.g. 30-day gym streak"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Daily goal"
            placeholder="e.g. Go to the gym and log a photo"
            hint="What counts as completing the day?"
            error={errors.goal?.message}
            {...register("goal")}
          />

          <Input
            label="End date"
            type="date"
            min={minDate()}
            error={errors.end_date?.message}
            {...register("end_date")}
          />

          {/* Stakes */}
          <Card className="space-y-4">
            <p className="font-heading font-semibold text-text text-sm">
              🔥 Stakes <span className="text-muted font-normal">(optional but recommended)</span>
            </p>
            <Input
              label="Reward for winners 🏆"
              placeholder="e.g. Losers buy dinner"
              error={errors.reward?.message}
              {...register("reward")}
            />
            <Input
              label="Punishment for quitters 💀"
              placeholder="e.g. Post embarrassing photo"
              error={errors.punishment?.message}
              {...register("punishment")}
            />
          </Card>

          {/* Privacy */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-text">Visibility</p>
            <div className="flex gap-2">
              {(["private", "public"] as const).map((opt) => (
                <label
                  key={opt}
                  className="flex-1 flex items-center gap-2 cursor-pointer bg-surface-2 border border-border rounded-[--radius-input] px-4 py-3 has-[:checked]:border-lime/50 has-[:checked]:bg-lime/5 transition-colors"
                >
                  <input
                    type="radio"
                    value={opt}
                    className="accent-lime"
                    {...register("privacy")}
                  />
                  <div>
                    <p className="text-sm font-medium text-text capitalize">{opt}</p>
                    <p className="text-xs text-muted">
                      {opt === "private" ? "Invite-only" : "Anyone can join"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {serverError && (
            <p className="text-sm text-red bg-red/10 border border-red/20 rounded-[--radius-input] px-3 py-2">
              {serverError}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
            Create challenge
          </Button>
        </form>
      </div>

      <PaywallModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
        reason="challenge_limit"
      />
    </div>
  );
}
