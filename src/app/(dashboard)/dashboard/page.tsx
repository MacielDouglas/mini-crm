import { Header } from "@/shared/components/header";
import { StatsCards } from "@/features/dashboard/components/stats-cards";
import { PipelineChart } from "@/features/dashboard/components/pipeline-chart";
import { RecentLeads } from "@/features/dashboard/components/recent-leads";
import { getDashboardStats } from "@/features/dashboard/actions/get-dashboard-stats";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Buscar organização do usuário
  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });

  // Sem organização → onboarding
  if (!member) redirect("/onboarding");

  const stats = await getDashboardStats(member.organization.id);

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
