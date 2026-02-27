// app/(app)/upgrade/success/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UpgradeSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="text-6xl">🎉</div>

        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-bold text-text">
            Welcome to Pro!
          </h1>
          <p className="text-muted text-sm">
            Your account has been upgraded. Unlimited challenges and members are now unlocked.
          </p>
        </div>

        <div className="space-y-2">
          <Link href="/challenges/new">
            <Button size="lg" className="w-full">
              ⚡ Create a challenge
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="lg" className="w-full">
              Go to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
