// app/(auth)/layout.tsx
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-dvh bg-bg flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Lime glow blob — top right */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 size-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,240,0,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Subtle glow — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 size-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,240,0,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <Link
        href="/"
        className="relative mb-8 font-heading font-bold text-3xl text-text tracking-tight"
      >
        Stack<span className="text-lime" style={{ textShadow: "0 0 20px rgba(200,240,0,0.4)" }}>d</span>
      </Link>

      {/* Card */}
      <div
        className="relative w-full max-w-sm rounded-[--radius-card] p-6 page-enter"
        style={{
          background: "rgba(24, 24, 31, 0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,240,0,0.04) inset",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Top highlight line */}
        <div
          className="absolute inset-x-0 top-0 h-px rounded-t-[--radius-card]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,240,0,0.2) 50%, transparent 100%)",
          }}
        />
        {children}
      </div>

      <p className="mt-6 text-xs text-muted">
        © {new Date().getFullYear()} Stackd
      </p>
    </div>
  );
}
