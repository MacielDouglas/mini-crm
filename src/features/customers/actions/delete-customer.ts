"use server";

import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteCustomer(customerId: string) {
  try {
    await prisma.customer.delete({ where: { id: customerId } });
    revalidatePath("/dashboard/customers");
  } catch {
    return { error: "Erro ao excluir cliente" };
  }
  redirect("/dashboard/customers");
}
