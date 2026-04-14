"use server";

import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

export async function updateProfile(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Não autorizado" };

  const parsed = schema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await auth.api.updateUser({
      headers: await headers(),
      body: { name: parsed.data.name },
    });
  } catch {
    return { error: "Erro ao atualizar perfil" };
  }
}
