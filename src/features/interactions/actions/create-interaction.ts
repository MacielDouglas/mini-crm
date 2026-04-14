"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

interface CreateInteractionInput {
  leadId: string;
  type: string;
  title?: string;
  content: string;
}

export async function createInteraction(data: CreateInteractionInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { error: "Não autorizado" };

  const interactionTypeLabels: Record<string, string> = {
    NOTE: "Nota",
    EMAIL: "E-mail",
    CALL: "Ligação",
    MEETING: "Reunião",
    TASK: "Tarefa",
  };

  try {
    await prisma.interaction.create({
      data: {
        leadId: data.leadId,
        type: data.type as never,
        title: data.title ?? interactionTypeLabels[data.type] ?? data.type,
        content: data.content,
        userId: session.user.id,
      },
    });
  } catch {
    return { error: "Erro ao registrar interação" };
  }
}
