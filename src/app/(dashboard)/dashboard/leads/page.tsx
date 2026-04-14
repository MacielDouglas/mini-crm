import { Header } from "@/shared/components/header";
import { LeadsTable } from "@/features/leads/components/leads-table";
import { LeadsFilters } from "@/features/leads/components/leads-filters";
import { LeadFormDialog } from "@/features/leads/components/lead-form-dialog";
import { Pagination } from "@/shared/components/pagination";
import { getLeads } from "@/features/leads/actions/get-leads";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface LeadsPageProps {
  searchParams: Promise<{
    search?: string;
    stageId?: string;
    page?: string;
  }>;
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });
  if (!member) redirect("/onboarding");

  const params = await searchParams;
  const organizationId = member.organization.id;
  const currentPage = params.page ? parseInt(params.page) : 1;
  const pageSize = 20;

  const [{ leads, total }, stages] = await Promise.all([
    getLeads({
      organizationId,
      search: params.search,
      stageId: params.stageId,
      page: currentPage,
      limit: pageSize,
    }),
    prisma.pipelineStage.findMany({
      where: { organizationId },
      orderBy: { position: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <Header title="Leads" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {total} lead{total !== 1 ? "s" : ""} encontrado
          {total !== 1 ? "s" : ""}
        </p>
        <LeadFormDialog organizationId={organizationId} stages={stages} />
      </div>

      <LeadsFilters stages={stages} />
      <LeadsTable leads={leads} organizationId={organizationId} />
      <Pagination total={total} pageSize={pageSize} currentPage={currentPage} />
    </div>
  );
}
