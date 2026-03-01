// app/(app)/upgrade/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/card";
import { ZapIcon, CheckIcon } from "@/components/ui/icons";
import { UpgradeButton } from "./UpgradeButton";

const FREE_FEATURES = [
  "2 active challenges",
  "6 members per challenge",
  "Photo proof logging",
  "Real-time leaderboard",
  "Trash talk chat",
];

const PRO_FEATURES = [
  "Unlimited active challenges",
  "Unlimited members per challenge",
  "Photo proof logging",
  "Real-time leaderboard",
  "Trash talk chat",
  "Pro badge on profile",
];

export default async function UpgradePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();
  const { data: profile } = await supabase
    .from("users")
    .select("is_pro")
    .eq("id", user.id)
    .single();

  if (profile?.is_pro) redirect("/profile");

  return (
    <div>
      <Topbar title="Upgrade to Pro" backHref="/profile" />

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">

        <div className="text-center space-y-2">
          <div className="size-12 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto">
            <ZapIcon className="size-6 text-lime" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-text">Go Pro. No excuses.</h1>
          <p className="text-muted text-sm">Unlock unlimited challenges and members.</p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-3">
          {/* Free */}
          <Card className="space-y-3">
            <div>
              <p className="font-heading font-semibold text-text">Free</p>
              <p className="text-2xl font-bold text-text mt-1">฿0</p>
              <p className="text-xs text-muted">forever</p>
            </div>
            <ul className="space-y-2">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-muted">
                  <span className="mt-0.5 shrink-0">·</span> {f}
                </li>
              ))}
            </ul>
          </Card>

          {/* Pro */}
          <Card className="space-y-3 border-lime/40 bg-lime/5 relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[10px] font-bold bg-lime text-bg px-1.5 py-0.5 rounded-full uppercase tracking-wide">
              Popular
            </div>
            <div>
              <p className="font-heading font-semibold text-lime">Pro</p>
              <p className="text-2xl font-bold text-text mt-1">฿149</p>
              <p className="text-xs text-muted">per month</p>
            </div>
            <ul className="space-y-2">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-text">
                  <CheckIcon className="size-3.5 text-lime mt-0.5 shrink-0" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <UpgradeButton />

        <p className="text-center text-xs text-muted">
          Cancel anytime from your{" "}
          <Link href="/profile" className="text-text underline underline-offset-2">
            profile
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
