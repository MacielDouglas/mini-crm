"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { serializeLead } from "../../../shared/utils/serialize-lead";

export interface GetLeadsParams {
  organizationId: string;
  search?: string;
  stageId?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function getLeads({
  organizationId,
  search,
  stageId,
  status,
  page = 1,
  limit = 20,
}: GetLeadsParams) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Não autenticado");

  const where = {
    organizationId,
    ...(stageId && { stageId }),
    ...(status && { status: status as never }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        { company: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        stage: { select: { id: true, name: true, color: true } },
        assignedTo: { select: { id: true, name: true, image: true } },
        tags: { include: { tag: true } },
        _count: { select: { interactions: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    leads: leads.map(serializeLead),
    total,
    pages: Math.ceil(total / limit),
    page,
  };
}
