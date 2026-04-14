"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removeMember(memberId: string, requesterId: string) {
  try {
    const member = await prisma.organizationMember.findUnique({
      where: { id: memberId },
    });

    if (!member) return { error: "Membro não encontrado" };
    if (member.userId === requesterId)
      return { error: "Você não pode se remover" };

    await prisma.organizationMember.delete({ where: { id: memberId } });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch {
    return { error: "Erro ao remover membro" };
  }
}
