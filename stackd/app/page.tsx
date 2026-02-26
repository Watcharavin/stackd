// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-bg flex flex-col">
      {/* Topbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-heading font-bold text-xl text-text tracking-tight">
            Stack<span className="text-lime">d</span>
          </span>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 gap-6">
        <Badge variant="lime">Beta — Free while we build 🚀</Badge>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold text-text max-w-2xl leading-tight tracking-tight">
          Challenge your friends.{" "}
          <span className="text-lime">No excuses.</span>
        </h1>

        <p className="text-muted text-base sm:text-lg max-w-md leading-relaxed">
          Create any challenge, set real stakes — rewards or punishments — and
          watch the realtime leaderboard hold everyone accountable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Start a challenge
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              See how it works
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <Card>
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-heading font-semibold text-text mb-1">Any challenge</h3>
          <p className="text-sm text-muted">
            Gym streak, reading, coding — anything with a daily log counts.
          </p>
        </Card>
        <Card glow>
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-heading font-semibold text-text mb-1">Real stakes</h3>
          <p className="text-sm text-muted">
            Set a reward for winners or a punishment for quitters. Make it hurt.
          </p>
        </Card>
        <Card>
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="font-heading font-semibold text-text mb-1">Realtime board</h3>
          <p className="text-sm text-muted">
            Live leaderboard updates the moment someone logs — or goes dead.
          </p>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        © 2026 Stackd — Built for people who actually show up.
      </footer>
    </main>
  );
}
