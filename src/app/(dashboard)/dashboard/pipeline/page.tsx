import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { Header } from "@/shared/components/header";
import { PipelineBoard } from "@/features/pipeline/components/pipeline-board";

export default async function PipelinePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/login");

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });
  if (!member) redirect("/onboarding");

  const organizationId = member.organization.id;

  const [stages, leads] = await Promise.all([
    prisma.pipelineStage.findMany({
      where: { organizationId },
      orderBy: { position: "asc" },
    }),
    prisma.lead.findMany({
      where: {
        organizationId,
        status: { notIn: ["WON", "LOST"] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        value: true,
        aiScore: true,
        stageId: true,
        assignedTo: { select: { name: true, image: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Mapa leadId → stageId para estado inicial do board
  const stageMap = Object.fromEntries(leads.map((l) => [l.id, l.stageId]));

  const totalPipeline = leads.reduce((acc, l) => {
    return acc + (l.value ? Number(l.value) : 0);
  }, 0);

  const serializedLeads = leads.map((lead) => ({
    ...lead,
    value: lead.value ? Number(lead.value) : null,
    // converta outros campos Decimal aqui se houver
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Header title="Pipeline" />
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground tabular-nums">
            {leads.length}
          </span>{" "}
          leads ·{" "}
          <span className="font-medium text-foreground tabular-nums">
            {totalPipeline.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0,
            })}
          </span>{" "}
          em aberto
        </div>
      </div>

      <PipelineBoard
        stages={stages}
        initialLeads={serializedLeads}
        stageMap={stageMap}
      />
    </div>
  );
}
