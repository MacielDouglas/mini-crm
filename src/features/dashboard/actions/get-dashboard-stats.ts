"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { LeadStatus } from "@/generated/prisma/client";

export async function getDashboardStats(organizationId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Não autenticado");

  const [
    totalLeads,
    wonLeads,
    lostLeads,
    totalValue,
    leadsByStage,
    recentLeads,
  ] = await Promise.all([
    // Total de leads ativos
    prisma.lead.count({
      where: {
        organizationId,
        status: { notIn: [LeadStatus.WON, LeadStatus.LOST] },
      },
    }),

    // Leads ganhos
    prisma.lead.count({
      where: { organizationId, status: LeadStatus.WON },
    }),

    // Leads perdidos
    prisma.lead.count({
      where: { organizationId, status: LeadStatus.LOST },
    }),

    // Valor total do pipeline
    prisma.lead.aggregate({
      where: {
        organizationId,
        status: { notIn: [LeadStatus.WON, LeadStatus.LOST] },
      },
      _sum: { value: true },
    }),

    // Leads por estágio
    prisma.pipelineStage.findMany({
      where: { organizationId },
      include: {
        _count: { select: { leads: true } },
      },
      orderBy: { position: "asc" },
    }),

    // Leads recentes
    prisma.lead.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        stage: { select: { name: true, color: true } },
        assignedTo: { select: { name: true, image: true } },
      },
    }),
  ]);

  const totalAll = totalLeads + wonLeads + lostLeads;
  const conversionRate =
    totalAll > 0 ? Math.round((wonLeads / totalAll) * 100) : 0;

  return {
    totalLeads,
    wonLeads,
    lostLeads,
    conversionRate,
    pipelineValue: Number(totalValue._sum.value ?? 0),
    leadsByStage: leadsByStage.map((stage) => ({
      name: stage.name,
      color: stage.color,
      count: stage._count.leads,
    })),
    recentLeads,
  };
}
