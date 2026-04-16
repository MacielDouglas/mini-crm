import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { LeadDetailCard } from "@/features/leads/components/lead-detail-card";
import { LeadInteractions } from "@/features/leads/components/lead-interactions";
import { ScoreLeadButton } from "@/features/ai/components/score-lead-button";
import { Button } from "../../../../../shared/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LeadEditDialog } from "../../../../../features/leads/components/lead-edit-dialog";

interface LeadPageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadPage({ params }: LeadPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
  });
  if (!member) redirect("/onboarding");

  const [lead, stages] = await Promise.all([
    prisma.lead.findUnique({
      where: { id },
      include: {
        stage: { select: { name: true, color: true } },
        assignedTo: { select: { name: true, image: true } },
        interactions: {
          orderBy: { occurredAt: "desc" },
          include: { user: { select: { name: true, image: true } } },
        },
        tags: { include: { tag: true } },
      },
    }),
    prisma.pipelineStage.findMany({
      where: { organizationId: member.organizationId },
      orderBy: { position: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!lead) notFound();

  const serializedLead = {
    ...lead,
    value: lead.value ? Number(lead.value) : null,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
    expectedCloseAt: lead.expectedCloseAt?.toISOString() ?? null,
    closedAt: lead.closedAt?.toISOString() ?? null,
    lastContactAt: lead.lastContactAt?.toISOString() ?? null,
    aiScoredAt: lead.aiScoredAt?.toISOString() ?? null,
    interactions: lead.interactions.map((i) => ({
      ...i,
      occurredAt: i.occurredAt.toISOString(),
      createdAt: i.createdAt.toISOString(),
    })),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/dashboard/leads">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold truncate">{lead.name}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ScoreLeadButton leadId={lead.id} currentScore={lead.aiScore} />
          <LeadEditDialog
            leadId={lead.id}
            organizationId={member.organizationId}
            stages={stages}
            defaultValues={{
              name: lead.name,
              email: lead.email ?? "",
              phone: lead.phone ?? "",
              company: lead.company ?? "",
              jobTitle: lead.jobTitle ?? "",
              website: lead.website ?? "",
              stageId: lead.stageId,
              source: lead.source,
              value: lead.value ? String(Number(lead.value)) : "",
              notes: lead.notes ?? "",
              expectedCloseAt:
                lead.expectedCloseAt?.toISOString().split("T")[0] ?? "",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          <LeadDetailCard lead={serializedLead} />
          <LeadInteractions
            leadId={lead.id}
            interactions={serializedLead.interactions}
          />
        </div>

        {/* Sidebar IA */}
        {(lead.aiScore !== null || lead.aiScoreReason) && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-4 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                ✨ Análise de IA
              </h3>

              {lead.aiScore !== null && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Score</p>
                  <p
                    className={`text-3xl font-bold tabular-nums ${
                      lead.aiScore >= 70
                        ? "text-green-600"
                        : lead.aiScore >= 40
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {lead.aiScore}
                    <span className="text-base font-normal text-muted-foreground">
                      /100
                    </span>
                  </p>
                </div>
              )}

              {lead.aiScoreReason && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Análise</p>
                  <p className="text-sm">{lead.aiScoreReason}</p>
                </div>
              )}

              {lead.aiNextAction && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Próxima ação
                  </p>
                  <p className="text-sm font-medium">{lead.aiNextAction}</p>
                </div>
              )}

              {lead.aiScoredAt && (
                <p className="text-xs text-muted-foreground">
                  Analisado em{" "}
                  {new Date(lead.aiScoredAt).toLocaleDateString("pt-BR")}
                </p>
              )}

              <ScoreLeadButton leadId={lead.id} currentScore={lead.aiScore} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
