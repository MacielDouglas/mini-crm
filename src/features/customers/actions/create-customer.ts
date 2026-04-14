"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { customerSchema } from "../types";

export async function createCustomer(
  organizationId: string,
  leadId: string,
  data: unknown,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Não autorizado" };

  const parsed = customerSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const existing = await prisma.customer.findUnique({ where: { leadId } });
    if (existing) return { error: "Este lead já foi convertido em cliente" };

    await prisma.customer.create({
      data: {
        organizationId,
        leadId,
        name: parsed.data.name,
        email: parsed.data.email || null,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        totalRevenue: parsed.data.totalRevenue ?? null,
      },
    });

    // Atualiza status do lead para WON
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: "WON" },
    });

    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/leads");
  } catch {
    return { error: "Erro ao converter lead em cliente" };
  }
}
