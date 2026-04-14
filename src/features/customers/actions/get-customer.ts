"use server";

import { prisma } from "@/shared/lib/prisma";

export async function getCustomer(customerId: string) {
  return prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      lead: { select: { id: true, name: true } },
      interactions: {
        orderBy: { occurredAt: "desc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });
}
