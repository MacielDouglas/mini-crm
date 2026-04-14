import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { Header } from "@/shared/components/header";
import { OrganizationForm } from "@/features/settings/components/organization-form";
import { PipelineStagesForm } from "@/features/settings/components/pipeline-stages-form";
import { MembersList } from "@/features/settings/components/members-list";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/login");

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });
  if (!member) redirect("/onboarding");

  const organizationId = member.organization.id;

  const [stages, members] = await Promise.all([
    prisma.pipelineStage.findMany({
      where: { organizationId },
      orderBy: { position: "asc" },
      include: { _count: { select: { leads: true } } },
    }),
    prisma.organizationMember.findMany({
      where: { organizationId },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Só admin pode acessar configurações
  if (member.role !== "ADMIN" && member.role !== "OWNER")
    redirect("/dashboard");

  return (
    <div className="space-y-6 max-w-2xl">
      <Header title="Configurações" />

      <OrganizationForm
        organizationId={organizationId}
        defaultValues={{
          name: member.organization.name,
          slug: member.organization.slug,
        }}
      />

      <PipelineStagesForm
        organizationId={organizationId}
        initialStages={stages.map((s) => ({
          ...s,
          leadsCount: s._count.leads,
        }))}
      />

      <MembersList
        organizationId={organizationId}
        members={members}
        currentUserId={session.user.id}
      />
    </div>
  );
}
