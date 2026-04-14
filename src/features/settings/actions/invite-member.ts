"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  role: z.enum(["ADMIN", "MEMBER"]),
});

export async function inviteMember(
  organizationId: string,
  data: z.infer<typeof schema>,
) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (!user)
      return {
        error: "Usuário não encontrado. Peça que se cadastre primeiro.",
      };

    const existing = await prisma.organizationMember.findFirst({
      where: { organizationId, userId: user.id },
    });

    if (existing) return { error: "Este usuário já é membro da organização" };

    await prisma.organizationMember.create({
      data: {
        organizationId,
        userId: user.id,
        role: parsed.data.role,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch {
    return { error: "Erro ao convidar membro" };
  }
}
