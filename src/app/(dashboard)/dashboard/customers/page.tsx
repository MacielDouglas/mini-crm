import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { Header } from "@/shared/components/header";
import { CustomersTable } from "@/features/customers/components/customers-table";
import { getCustomers } from "@/features/customers/actions/get-customers";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";

interface CustomersPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
    include: { organization: true },
  });
  if (!member) redirect("/onboarding");

  const params = await searchParams;
  const organizationId = member.organization.id;

  const { customers, total } = await getCustomers({
    organizationId,
    search: params.search,
    page: params.page ? parseInt(params.page) : 1,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Header title="Clientes" />
        <p className="text-sm text-muted-foreground">
          {total} cliente{total !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          aria-hidden
        />
        <Input
          placeholder="Buscar por nome, e-mail ou empresa..."
          defaultValue={params.search ?? ""}
          className="pl-9"
          aria-label="Buscar clientes"
        />
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}
