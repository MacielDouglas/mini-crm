"use server";

import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MemberRole } from "@/generated/prisma/client";

const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  slug: z
    .string()
    .min(2, "Slug deve ter pelo menos 2 caracteres")
    .max(50, "Slug muito longo")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug deve conter apenas letras minúsculas, números e hífens",
    ),
});

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;

export async function createOrganization(data: CreateOrganizationSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Não autenticado" };
  }

  const parsed = createOrganizationSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Verificar se o slug já existe
  const existing = await prisma.organization.findUnique({
    where: { slug: parsed.data.slug },
  });

  if (existing) {
    return { error: "Este slug já está em uso. Escolha outro." };
  }

  // Verificar se usuário já tem organização
  const alreadyMember = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
  });

  if (alreadyMember) {
    redirect("/dashboard");
  }

  // Criar organização e adicionar usuário como OWNER
  await prisma.organization.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      members: {
        create: {
          userId: session.user.id,
          role: MemberRole.OWNER,
        },
      },
      // Criar estágios padrão do pipeline
      pipeline: {
        createMany: {
          data: [
            {
              name: "Novo Lead",
              color: "#6366f1",
              position: 0,
              isDefault: true,
            },
            { name: "Contato Feito", color: "#f59e0b", position: 1 },
            { name: "Proposta Enviada", color: "#3b82f6", position: 2 },
            { name: "Negociação", color: "#8b5cf6", position: 3 },
            { name: "Fechado", color: "#10b981", position: 4 },
          ],
        },
      },
    },
  });

  redirect(`/dashboard`);
}
