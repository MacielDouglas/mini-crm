import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

interface RecentLeadsProps {
  leads: {
    id: string;
    name: string;
    company: string | null;
    createdAt: Date;
    stage: { name: string; color: string };
    assignedTo: { name: string; image: string | null } | null;
  }[];
}

export function RecentLeads({ leads }: RecentLeadsProps) {
  if (leads.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground text-sm">
              Nenhum lead cadastrado ainda.
            </p>
            <Link
              href="/dashboard/leads"
              className="text-primary text-sm underline-offset-4 hover:underline mt-2"
            >
              Adicionar primeiro lead
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads Recentes</CardTitle>
        <CardDescription>Últimos 5 leads adicionados</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4" role="list">
          {leads.map((lead) => (
            <li key={lead.id}>
              <Link
                href={`/dashboard/leads/${lead.id}`}
                className="flex items-center gap-3 rounded-md p-2 -mx-2 hover:bg-accent transition-colors"
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarImage
                    src={lead.assignedTo?.image ?? ""}
                    alt={lead.assignedTo?.name ?? ""}
                  />
                  <AvatarFallback className="text-xs">
                    {lead.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {lead.company ?? "Sem empresa"}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant="secondary" className="text-xs">
                    {lead.stage.name}
                  </Badge>
                  <time
                    dateTime={lead.createdAt.toISOString()}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDistanceToNow(lead.createdAt, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
