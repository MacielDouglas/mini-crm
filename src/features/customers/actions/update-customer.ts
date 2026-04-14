"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { customerSchema } from "../types";

export async function updateCustomer(customerId: string, data: unknown) {
  const parsed = customerSchema.partial().safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        name: parsed.data.name,
        email: parsed.data.email || null,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        totalRevenue: parsed.data.totalRevenue ?? undefined,
      },
    });
    revalidatePath("/dashboard/customers");
  } catch {
    return { error: "Erro ao atualizar cliente" };
  }
}
