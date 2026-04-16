import type { Lead } from "@/generated/prisma/client";

export function serializeLead<
  T extends {
    value: unknown;
    createdAt: Date;
    updatedAt: Date;
    expectedCloseAt?: Date | null;
    closedAt?: Date | null;
    lastContactAt?: Date | null;
    aiScoredAt?: Date | null;
  },
>(lead: T) {
  return {
    ...lead,
    value: lead.value ? Number(lead.value) : null,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
    expectedCloseAt: lead.expectedCloseAt?.toISOString() ?? null,
    closedAt: lead.closedAt?.toISOString() ?? null,
    lastContactAt: lead.lastContactAt?.toISOString() ?? null,
    aiScoredAt: lead.aiScoredAt?.toISOString() ?? null,
  };
}

export type SerializedLead = Omit<
  Lead,
  | "value"
  | "createdAt"
  | "updatedAt"
  | "expectedCloseAt"
  | "closedAt"
  | "lastContactAt"
  | "aiScoredAt"
> & {
  value: number | null;
  createdAt: string;
  updatedAt: string;
  expectedCloseAt: string | null;
  closedAt: string | null;
  lastContactAt: string | null;
  aiScoredAt: string | null;
};
