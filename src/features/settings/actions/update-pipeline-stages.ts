"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const stageSchema = z.object({
  id: z.string().optional(), // undefined = novo estágio
  name: z.string().min(1, "Nome obrigatório"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cor inválida"),
  position: z.number(),
});

export async function updatePipelineStages(
  organizationId: string,
  stages: z.infer<typeof stageSchema>[],
) {
  const parsed = z.array(stageSchema).safeParse(stages);
  if (!parsed.success) return { error: "Dados inválidos" };

  try {
    await prisma.$transaction(async (tx) => {
      // IDs enviados (existentes)
      const incomingIds = parsed.data.filter((s) => s.id).map((s) => s.id!);

      // Remove estágios deletados (que não vieram no payload)
      await tx.pipelineStage.deleteMany({
        where: {
          organizationId,
          id: { notIn: incomingIds },
          // Só deleta se não tiver leads vinculados
          leads: { none: {} },
        },
      });

      // Upsert cada estágio
      for (const stage of parsed.data) {
        if (stage.id) {
          await tx.pipelineStage.update({
            where: { id: stage.id },
            data: {
              name: stage.name,
              color: stage.color,
              position: stage.position,
            },
          });
        } else {
          await tx.pipelineStage.create({
            data: {
              organizationId,
              name: stage.name,
              color: stage.color,
              position: stage.position,
            },
          });
        }
      }
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard/pipeline");
    return { success: true };
  } catch {
    return { error: "Erro ao salvar estágios" };
  }
}
