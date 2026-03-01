// app/(app)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-bg">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 pb-20 md:pb-0">
          <PageWrapper>{children}</PageWrapper>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
