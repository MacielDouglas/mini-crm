"use server";

import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { scoreLeadWithAI } from "../services/score-lead";

type ActionResult =
  | { success: true; score: number; reason: string; nextAction: string }
  | { error: string; fallback?: boolean };

async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: unknown) {
      if (i === retries - 1) throw err;
      const status = (err as { status?: number })?.status;
      if (status !== 503 && status !== 429) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error("Max retries reached");
}

export async function scoreLeadAction(leadId: string): Promise<ActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Não autenticado" };

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      stage: { select: { name: true } },
      interactions: {
        orderBy: { occurredAt: "desc" },
        take: 5,
        select: { type: true, title: true, occurredAt: true },
      },
    },
  });

  if (!lead) return { error: "Lead não encontrado" };

  try {
    const started = Date.now();
    const { score, reason, nextAction } = await withRetry(() =>
      scoreLeadWithAI(lead),
    );
    const durationMs = Date.now() - started;

    await prisma.lead.update({
      where: { id: leadId },
      data: {
        aiScore: score,
        aiScoreReason: reason,
        aiNextAction: nextAction,
        aiScoredAt: new Date(),
      },
    });

    const member = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    });
    if (member) {
      await prisma.aiUsageLog.create({
        data: {
          organizationId: member.organizationId,
          userId: session.user.id,
          action: "LEAD_SCORE",
          inputTokens: 0,
          outputTokens: 0,
          durationMs,
        },
      });
    }

    revalidatePath(`/dashboard/leads/${leadId}`);
    revalidatePath("/dashboard/pipeline");

    return { success: true, score, reason, nextAction };
  } catch (err: unknown) {
    console.error("scoreLeadAction error:", err);
    const status = (err as { status?: number })?.status;
    if (status === 429 || status === 503) {
      return {
        error:
          "IA temporariamente indisponível. Tente novamente em alguns minutos.",
        fallback: true,
      };
    }
    return { error: "Erro ao gerar score com IA. Tente novamente." };
  }
}
