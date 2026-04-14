import type { Metadata } from "next";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/lib/prisma";
import { OnboardingForm } from "@/features/auth/components/onboarding-form";

export const metadata: Metadata = {
  title: "Configurar organização | Mini CRM",
};

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Se já tem organização, vai para o dashboard
  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
  });

  if (member) redirect("/dashboard");

  return (
    <main className="flex items-center justify-center w-full">
      <OnboardingForm />
    </main>
  );
}
