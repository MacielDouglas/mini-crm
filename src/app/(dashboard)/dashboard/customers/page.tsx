import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { Header } from "@/shared/components/header";
import { CustomersTable } from "@/features/customers/components/customers-table";
import { CustomersSearch } from "@/features/customers/components/customers-search";
import { Pagination } from "@/shared/components/pagination";
import { getCustomers } from "@/features/customers/actions/get-customers";

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
  const currentPage = params.page ? parseInt(params.page) : 1;
  const pageSize = 20;

  const { customers, total } = await getCustomers({
    organizationId,
    search: params.search,
    page: currentPage,
    pageSize,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Header title="Clientes" />
        <p className="text-sm text-muted-foreground">
          {total} cliente{total !== 1 ? "s" : ""}
        </p>
      </div>

      <CustomersSearch />
      <CustomersTable customers={customers} />
      <Pagination total={total} pageSize={pageSize} currentPage={currentPage} />
    </div>
  );
}
