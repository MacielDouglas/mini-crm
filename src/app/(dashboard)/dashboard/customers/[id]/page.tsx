import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { getCustomer } from "@/features/customers/actions/get-customer";
import { CustomerDetailCard } from "@/features/customers/components/customer-detail-card";
import { CustomerInteractions } from "@/features/customers/components/customer-interactions";
import { DeleteCustomerDialog } from "@/features/customers/components/delete-customer-dialog";

interface CustomerPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;

  const member = await prisma.organizationMember.findFirst({
    where: { userId: session.user.id },
  });
  if (!member) redirect("/onboarding");

  const customer = await getCustomer(id);
  if (!customer) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/customers">
            <ArrowLeft className="mr-2 size-4" aria-hidden />
            Voltar para clientes
          </Link>
        </Button>
        <DeleteCustomerDialog
          customerId={customer.id}
          customerName={customer.name}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomerDetailCard customer={customer} />
        </div>
        <div className="lg:col-span-1">
          <CustomerInteractions
            customerId={customer.id}
            interactions={customer.interactions}
          />
        </div>
      </div>
    </div>
  );
}
