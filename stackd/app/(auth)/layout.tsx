// app/(auth)/layout.tsx
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link href="/" className="mb-8 font-heading font-bold text-2xl text-text tracking-tight">
        Stack<span className="text-lime">d</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm bg-surface border border-border rounded-[--radius-card] p-6 shadow-[--shadow-card]">
        {children}
      </div>
    </div>
  );
}
