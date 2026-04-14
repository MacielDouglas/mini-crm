import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/shared/components/ui/button";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { getLead } from "@/features/leads/actions/get-lead";
import { LeadDetailCard } from "@/features/leads/components/lead-detail-card";
import { LeadEditDialog } from "@/features/leads/components/lead-edit-dialog";
import { LeadInteractions } from "@/features/leads/components/lead-interactions";
import { DeleteLeadDialog } from "@/features/leads/components/delete-lead-dialog";
import { ConvertLeadDialog } from "@/features/customers/components/customer-form-dialog";

interface LeadPageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadPage({ params }: LeadPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/login");

  const { id } = await params;

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });
  if (!member) redirect("/onboarding");

  const [lead, stages] = await Promise.all([
    getLead(id),
    prisma.pipelineStage.findMany({
      where: { organizationId: member.organization.id },
      orderBy: { position: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!lead) notFound();
  const typedLead = lead!;

  const defaultValues = {
    name: lead.name,
    email: lead.email ?? undefined,
    phone: lead.phone ?? undefined,
    company: lead.company ?? undefined,
    jobTitle: lead.jobTitle ?? undefined,
    website: lead.website ?? undefined,
    source: lead.source as never,
    stageId: lead.stageId,
    value: lead.value !== null ? String(lead.value) : undefined,
    notes: lead.notes ?? undefined,
    expectedCloseAt: lead.expectedCloseAt
      ? lead.expectedCloseAt.toISOString().split("T")[0]
      : undefined,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/leads">
            <ArrowLeft className="mr-2 size-4" aria-hidden />
            Voltar para leads
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <LeadEditDialog
            leadId={lead.id}
            organizationId={member.organization.id}
            stages={stages}
            defaultValues={defaultValues}
          />
          <ConvertLeadDialog
            organizationId={member.organization.id}
            lead={{
              id: typedLead.id,
              name: typedLead.name,
              email: typedLead.email,
              phone: typedLead.phone,
              company: typedLead.company,
            }}
          />
          <DeleteLeadDialog
            leadId={lead.id}
            leadName={lead.name}
            organizationId={member.organization.id}
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detalhes — ocupa 2 colunas */}
        <div className="lg:col-span-2 space-y-6">
          <LeadDetailCard lead={typedLead} />
        </div>

        {/* Interações — lateral */}
        <div className="lg:col-span-1">
          <LeadInteractions
            leadId={typedLead.id}
            interactions={typedLead.interactions}
          />
        </div>
      </div>
    </div>
  );
}
