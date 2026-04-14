"use server";

import { prisma } from "@/shared/lib/prisma";

interface GetCustomersParams {
  organizationId: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getCustomers({
  organizationId,
  search,
  page = 1,
  pageSize = 20,
}: GetCustomersParams) {
  const where = {
    organizationId,
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        { company: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: {
        _count: { select: { interactions: true } },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: (page - 1) * pageSize,
    }),
    prisma.customer.count({ where }),
  ]);

  return { customers, total, pages: Math.ceil(total / pageSize) };
}
