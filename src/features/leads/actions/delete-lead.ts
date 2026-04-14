"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteLead(leadId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { error: "Não autenticado" };

  await prisma.lead.delete({
    where: { id: leadId },
  });

  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");

  return { success: true };
}
