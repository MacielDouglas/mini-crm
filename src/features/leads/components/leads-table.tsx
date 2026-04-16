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
import { Badge } from "@/shared/components/ui/badge";

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { DeleteLeadDialog } from "./delete-lead-dialog";
import { leadSourceLabels } from "../types";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  value: unknown;
  aiScore: number | null;
  createdAt: string; // ← era Date, agora string
  source: string;
  stage: { id: string; name: string; color: string };
  assignedTo: { id: string; name: string; image: string | null } | null;
  _count: { interactions: number };
}

interface LeadsTableProps {
  leads: Lead[];
  organizationId: string;
}

export function LeadsTable({ leads, organizationId }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg bg-card">
        <p className="text-muted-foreground text-sm mb-2">
          Nenhum lead encontrado
        </p>
        <p className="text-xs text-muted-foreground">
          Adicione seu primeiro lead ou ajuste os filtros
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead</TableHead>
            <TableHead className="hidden md:table-cell">Empresa</TableHead>
            <TableHead className="hidden lg:table-cell">Estágio</TableHead>
            <TableHead className="hidden lg:table-cell">Origem</TableHead>
            <TableHead className="hidden xl:table-cell">Score IA</TableHead>
            <TableHead className="hidden md:table-cell">Criado</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Ações</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="text-xs">
                      {lead.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="font-medium text-sm hover:underline underline-offset-4 truncate block"
                    >
                      {lead.name}
                    </Link>
                    {lead.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.email}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {lead.company ?? "—"}
              </TableCell>

              <TableCell className="hidden lg:table-cell">
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: `${lead.stage.color}20`,
                    color: lead.stage.color,
                  }}
                >
                  {lead.stage.name}
                </Badge>
              </TableCell>

              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {leadSourceLabels[lead.source] ?? lead.source}
              </TableCell>

              <TableCell className="hidden xl:table-cell">
                {lead.aiScore !== null ? (
                  <span
                    className={`text-sm font-medium tabular-nums ${
                      lead.aiScore >= 70
                        ? "text-green-600"
                        : lead.aiScore >= 40
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {lead.aiScore}/100
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                <time dateTime={lead.createdAt}>
                  {formatDistanceToNow(new Date(lead.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </time>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1">
                  <DeleteLeadDialog
                    leadId={lead.id}
                    leadName={lead.name}
                    organizationId={organizationId}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
