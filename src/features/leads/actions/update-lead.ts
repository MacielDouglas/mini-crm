"use server";

import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { type LeadSchema } from "../types";

export async function updateLead(leadId: string, data: Partial<LeadSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { error: "Não autenticado" };

  const { value, expectedCloseAt, assignedToId, ...rest } = data;

  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: {
      ...rest,
      email: rest.email || null,
      phone: rest.phone || null,
      company: rest.company || null,
      jobTitle: rest.jobTitle || null,
      website: rest.website || null,
      notes: rest.notes || null,
      value: value ?? undefined,
      assignedToId: assignedToId || null,
      expectedCloseAt: expectedCloseAt ? new Date(expectedCloseAt) : null,
    },
  });

  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard");

  return { success: true, lead };
}
