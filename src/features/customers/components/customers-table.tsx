"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { DeleteCustomerDialog } from "./delete-customer-dialog";

interface Customer {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  totalRevenue: unknown;
  createdAt: Date;
  _count: { interactions: number };
}

export function CustomersTable({ customers }: { customers: Customer[] }) {
  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg bg-card">
        <p className="text-muted-foreground text-sm mb-2">
          Nenhum cliente encontrado
        </p>
        <p className="text-xs text-muted-foreground">
          Converta um lead em cliente para começar
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden md:table-cell">Empresa</TableHead>
            <TableHead className="hidden lg:table-cell">Receita</TableHead>
            <TableHead className="hidden lg:table-cell">Interações</TableHead>
            <TableHead className="hidden md:table-cell">Cadastrado</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Ações</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="text-xs">
                      {customer.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/customers/${customer.id}`}
                      className="font-medium text-sm hover:underline underline-offset-4 truncate block"
                    >
                      {customer.name}
                    </Link>
                    {customer.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {customer.email}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {customer.company ?? "—"}
              </TableCell>

              <TableCell className="hidden lg:table-cell text-sm tabular-nums">
                {customer.totalRevenue !== null
                  ? Number(customer.totalRevenue).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "—"}
              </TableCell>

              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground tabular-nums">
                {customer._count.interactions}
              </TableCell>

              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                <time dateTime={customer.createdAt.toISOString()}>
                  {formatDistanceToNow(customer.createdAt, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </time>
              </TableCell>

              <TableCell>
                <DeleteCustomerDialog
                  customerId={customer.id}
                  customerName={customer.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
