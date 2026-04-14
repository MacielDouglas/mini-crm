import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { Header } from "@/shared/components/header";
import { ProfileForm } from "@/features/auth/components/profile-form";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });
  if (!member) redirect("/onboarding");

  return (
    <div className="space-y-6 max-w-lg">
      <Header title="Meu Perfil" />
      <ProfileForm
        user={{
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? null,
        }}
        organizationName={member.organization.name}
        role={member.role}
      />
    </div>
  );
}
