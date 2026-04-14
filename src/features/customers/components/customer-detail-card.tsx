import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Building2, Mail, Phone, Link2 } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import Link from "next/link";

interface CustomerDetailCardProps {
  customer: {
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    totalRevenue: unknown;
    createdAt: Date;
    lead: { id: string; name: string };
  };
}

export function CustomerDetailCard({ customer }: CustomerDetailCardProps) {
  const revenue =
    customer.totalRevenue !== null && customer.totalRevenue !== undefined
      ? Number(customer.totalRevenue).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{customer.name}</CardTitle>
            {customer.company && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                <Building2 className="size-3.5" aria-hidden />
                {customer.company}
              </div>
            )}
          </div>
          <Badge
            variant="secondary"
            className="shrink-0 text-green-600 bg-green-500/10"
          >
            Cliente
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {customer.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail
                className="size-4 text-muted-foreground shrink-0"
                aria-hidden
              />
              <a
                href={`mailto:${customer.email}`}
                className="hover:underline truncate"
              >
                {customer.email}
              </a>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone
                className="size-4 text-muted-foreground shrink-0"
                aria-hidden
              />
              <a href={`tel:${customer.phone}`} className="hover:underline">
                {customer.phone}
              </a>
            </div>
          )}
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          {revenue && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Receita total
              </p>
              <p className="text-sm font-semibold tabular-nums text-green-600">
                {revenue}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Lead de origem</p>
            <Link
              href={`/dashboard/leads/${customer.lead.id}`}
              className="flex items-center gap-1 text-sm hover:underline"
            >
              <Link2 className="size-3.5" aria-hidden />
              {customer.lead.name}
            </Link>
          </div>
        </div>

        <Separator />
        <p className="text-xs text-muted-foreground">
          Cliente desde{" "}
          {format(customer.createdAt, "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </p>
      </CardContent>
    </Card>
  );
}
