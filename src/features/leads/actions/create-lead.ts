"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { leadSchema, type LeadSchema } from "../types";
import { LeadStatus } from "@/generated/prisma/client";

export async function createLead(organizationId: string, data: LeadSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { error: "Não autenticado" };

  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { value, expectedCloseAt, assignedToId, ...rest } = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      ...rest,
      email: rest.email || null,
      phone: rest.phone || null,
      company: rest.company || null,
      jobTitle: rest.jobTitle || null,
      website: rest.website || null,
      notes: rest.notes || null,
      organizationId,
      createdById: session.user.id,
      status: LeadStatus.NEW,
      value: value ?? null,
      assignedToId: assignedToId || null,
      expectedCloseAt: expectedCloseAt ? new Date(expectedCloseAt) : null,
    },
  });

  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");

  return { success: true, lead };
}
