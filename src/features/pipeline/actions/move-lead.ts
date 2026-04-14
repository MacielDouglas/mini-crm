"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function moveLead(leadId: string, stageId: string) {
  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: { stageId },
    });
    revalidatePath("/dashboard/pipeline");
  } catch {
    return { error: "Erro ao mover lead" };
  }
}
