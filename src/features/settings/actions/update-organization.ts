"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
});

export async function updateOrganization(
  organizationId: string,
  data: z.infer<typeof schema>,
) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const slugInUse = await prisma.organization.findFirst({
      where: { slug: parsed.data.slug, NOT: { id: organizationId } },
    });
    if (slugInUse) return { error: "Este slug já está em uso" };

    await prisma.organization.update({
      where: { id: organizationId },
      data: parsed.data,
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch {
    return { error: "Erro ao atualizar organização" };
  }
}
