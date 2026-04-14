"use server";

import { prisma } from "@/shared/lib/prisma";

export async function getLead(leadId: string) {
  return prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      stage: { select: { id: true, name: true, color: true } },
      assignedTo: { select: { id: true, name: true, image: true } },
      interactions: {
        orderBy: { occurredAt: "desc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });
}
