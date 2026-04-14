import { Header } from "@/shared/components/header";
import { StatsCards } from "@/features/dashboard/components/stats-cards";
import { PipelineChart } from "@/features/dashboard/components/pipeline-chart";
import { RecentLeads } from "@/features/dashboard/components/recent-leads";
import { getDashboardStats } from "@/features/dashboard/actions/get-dashboard-stats";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Por agora usamos um organizationId placeholder
  // Na próxima etapa implementamos o onboarding de organização
  const organizationId = session.user.id;

  const stats = await getDashboardStats(organizationId);

  return (
    <div className="space-y-6">
      <Header title="Dashboard" />

      <StatsCards
        totalLeads={stats.totalLeads}
        wonLeads={stats.wonLeads}
        conversionRate={stats.conversionRate}
        pipelineValue={stats.pipelineValue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PipelineChart data={stats.leadsByStage} />
        <RecentLeads leads={stats.recentLeads} />
      </div>
    </div>
  );
}
