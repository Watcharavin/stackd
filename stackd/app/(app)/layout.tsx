// app/(app)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-bg">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page content — padding-bottom for mobile nav */}
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
