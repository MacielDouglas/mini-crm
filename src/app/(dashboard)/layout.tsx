import { Sidebar } from "@/shared/components/sidebar";
import { BottomNav } from "@/shared/components/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:pb-6 lg:p-6">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
