// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  { icon: "📷", title: "Photo proof logging", desc: "Log with a real photo so no one can fake it. Duplicates are blocked by hash." },
  { icon: "⚡", title: "Real-time leaderboard", desc: "Rankings update the second someone logs — or goes quiet for too long." },
  { icon: "🏆", title: "Stakes that matter", desc: "Set a reward for the winner and a punishment for quitters. Make it sting." },
  { icon: "💬", title: "Trash talk chat", desc: "Built-in group chat to hype each other up — or roast the ones falling behind." },
  { icon: "🧭", title: "Public challenges", desc: "Discover open challenges and compete with strangers on the same goal." },
  { icon: "🔔", title: "Push notifications", desc: "Get pinged the moment a teammate logs — or goes suspiciously silent." },
];

const HOW_IT_WORKS = [
  { n: "1", icon: "🎯", title: "Create a challenge", desc: "Name it, set your goal, pick a start and end date. Add a real reward for winners and a punishment for quitters." },
  { n: "2", icon: "👥", title: "Invite your people", desc: "Share one link. Friends join in a single tap and land on the leaderboard immediately." },
  { n: "3", icon: "🔥", title: "Log daily or lose face", desc: "Log each day to keep your streak. Miss a day and your status flips to 'risk' — for everyone to see." },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-bg flex flex-col page-enter">

      {/* ── Nav ────────────────────────────────────────────────── */}
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

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-4 pt-14 pb-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* Copy */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          <Badge variant="lime" className="self-center lg:self-start">
            🚀 Free while in beta
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-[1.1] tracking-tight">
            Challenge friends.<br />
            <span className="text-lime">No excuses.</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            Set any challenge, add real stakes — reward the winner, punish the quitter — and hold everyone accountable with a live leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto shadow-[--shadow-glow-sm]">
                Start a challenge →
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                🧭 Browse public challenges
              </Button>
            </Link>
          </div>
        </div>

        {/* Mock phone */}
        <div className="w-full max-w-[260px] lg:max-w-[280px] shrink-0 mx-auto">
          <MockPhone />
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-4 py-16">
        <h2 className="font-heading text-2xl font-bold text-text text-center mb-2">
          How it works
        </h2>
        <p className="text-muted text-sm text-center mb-10">
          From idea to accountability in under a minute.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          {/* connector line on desktop */}
          <div className="hidden sm:block absolute top-5 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-px bg-border" />
          {HOW_IT_WORKS.map(({ n, icon, title, desc }) => (
            <div key={n} className="flex flex-col items-center text-center gap-3 relative">
              <div className="size-10 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center text-lime font-heading font-bold text-sm z-10 bg-bg">
                {n}
              </div>
              <span className="text-3xl">{icon}</span>
              <h3 className="font-heading font-semibold text-text">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-4 py-10">
        <h2 className="font-heading text-2xl font-bold text-text text-center mb-8">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-[--radius-card] p-5 border border-border transition-colors hover:border-border-strong"
              style={{ background: "#242120" }}
            >
              <p className="text-2xl mb-3">{icon}</p>
              <h3 className="font-heading font-semibold text-text mb-1">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-4 py-20 text-center">
        <div
          className="rounded-[--radius-card] px-8 py-14 relative overflow-hidden"
          style={{ background: "#242120", border: "1px solid rgba(217,119,87,0.15)" }}
        >
          {/* glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(217,119,87,0.08) 0%, transparent 60%)" }}
          />
          <p className="text-5xl mb-4">⚡</p>
          <h2 className="font-heading text-3xl font-bold text-text mb-3">
            Ready to stop making excuses?
          </h2>
          <p className="text-muted mb-8 max-w-sm mx-auto">
            Free to start. No credit card needed. Upgrade when you&apos;re ready for unlimited.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shadow-[--shadow-glow]">
              Create your first challenge
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        © 2026 Stackd — Built for people who actually show up.
      </footer>

    </main>
  );
}

/* ── Mock phone UI ────────────────────────────────────────── */
function MockPhone() {
  return (
    <div
      className="relative rounded-[32px] p-3 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
      style={{ background: "#2D2A27", border: "1px solid rgba(255,228,210,0.12)" }}
    >
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full" style={{ background: "#1A1816" }} />

      {/* Screen */}
      <div className="rounded-[24px] overflow-hidden" style={{ background: "#1A1816" }}>
        {/* Topbar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,228,210,0.08)" }}
        >
          <span className="font-heading font-bold text-sm" style={{ color: "#EDE8E2" }}>
            Stack<span style={{ color: "#D97757" }}>d</span>
          </span>
          <div className="size-6 rounded-full" style={{ background: "rgba(217,119,87,0.6)" }} />
        </div>

        {/* Content */}
        <div className="p-3 space-y-2.5">
          {/* Greeting card */}
          <div
            className="rounded-2xl p-3.5"
            style={{ background: "#242120", border: "1px solid rgba(217,119,87,0.12)" }}
          >
            <p className="text-[9px]" style={{ color: "#7A706A" }}>Good morning ☀️</p>
            <p className="font-bold text-sm mt-0.5" style={{ color: "#EDE8E2" }}>Hey, you 👋</p>
            <div className="flex gap-4 mt-2.5 pt-2.5" style={{ borderTop: "1px solid rgba(255,228,210,0.06)" }}>
              {[
                { label: "Active", value: "3", color: "#D97757" },
                { label: "Logged", value: "47", color: "#EDE8E2" },
                { label: "Streak", value: "🔥 12", color: "#E8B050" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <p className="font-bold text-sm" style={{ color }}>{value}</p>
                  <p className="text-[8px] mt-0.5" style={{ color: "#7A706A" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge card 1 */}
          <div className="rounded-2xl p-3" style={{ background: "#242120", border: "1px solid rgba(255,228,210,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🏋️</span>
              <div className="flex-1">
                <p className="text-[10px] font-semibold" style={{ color: "#EDE8E2" }}>Gym 30 days</p>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(76,175,130,0.15)", color: "#4CAF82" }}>safe</span>
            </div>
            <div className="h-1 rounded-full" style={{ background: "#2D2A27" }}>
              <div className="h-full rounded-full" style={{ width: "73%", background: "#D97757" }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px]" style={{ color: "#7A706A" }}>22 / 30 days</span>
              <span className="text-[8px]" style={{ color: "#7A706A" }}>8d left</span>
            </div>
          </div>

          {/* Challenge card 2 */}
          <div className="rounded-2xl p-3" style={{ background: "#242120", border: "1px solid rgba(255,228,210,0.06)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📚</span>
              <div className="flex-1">
                <p className="text-[10px] font-semibold" style={{ color: "#EDE8E2" }}>Read every day</p>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(232,176,80,0.15)", color: "#E8B050" }}>risk</span>
            </div>
            <div className="h-1 rounded-full" style={{ background: "#2D2A27" }}>
              <div className="h-full rounded-full" style={{ width: "40%", background: "#E8B050" }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px]" style={{ color: "#7A706A" }}>12 / 30 days</span>
              <span className="text-[8px]" style={{ color: "#7A706A" }}>18d left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
