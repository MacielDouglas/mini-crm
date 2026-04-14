import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Globe, Mail, Phone, Tag, User } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { leadSourceLabels } from "../types";

interface LeadDetailCardProps {
  lead: {
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    jobTitle: string | null;
    website: string | null;
    source: string;
    value: unknown;
    notes: string | null;
    expectedCloseAt: Date | null;
    aiScore: number | null;
    createdAt: Date;
    stage: { name: string; color: string };
    assignedTo: { name: string } | null;
  };
}

export function LeadDetailCard({ lead }: LeadDetailCardProps) {
  const value =
    lead.value !== null && lead.value !== undefined
      ? Number(lead.value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{lead.name}</CardTitle>
          {lead.company && (
            <p className="text-sm text-muted-foreground mt-1">
              {lead.jobTitle ? `${lead.jobTitle} · ` : ""}
              {lead.company}
            </p>
          )}
        </div>
        <Badge
          variant="secondary"
          style={{
            backgroundColor: `${lead.stage.color}20`,
            color: lead.stage.color,
          }}
        >
          {lead.stage.name}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contato */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lead.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail
                className="size-4 text-muted-foreground shrink-0"
                aria-hidden
              />
              <a
                href={`mailto:${lead.email}`}
                className="hover:underline truncate"
              >
                {lead.email}
              </a>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone
                className="size-4 text-muted-foreground shrink-0"
                aria-hidden
              />
              <a href={`tel:${lead.phone}`} className="hover:underline">
                {lead.phone}
              </a>
            </div>
          )}
          {lead.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe
                className="size-4 text-muted-foreground shrink-0"
                aria-hidden
              />
              <a
                href={lead.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                {lead.website}
              </a>
            </div>
          )}
          {lead.assignedTo && (
            <div className="flex items-center gap-2 text-sm">
              <User
                className="size-4 text-muted-foreground shrink-0"
                aria-hidden
              />
              <span>{lead.assignedTo.name}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Métricas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Origem</p>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Tag className="size-3.5 text-muted-foreground" aria-hidden />
              {leadSourceLabels[lead.source] ?? lead.source}
            </div>
          </div>

          {value && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Valor estimado
              </p>
              <p className="text-sm font-medium tabular-nums">{value}</p>
            </div>
          )}

          {lead.expectedCloseAt && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Previsão fechamento
              </p>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Calendar
                  className="size-3.5 text-muted-foreground"
                  aria-hidden
                />
                {format(lead.expectedCloseAt, "dd/MM/yyyy", { locale: ptBR })}
              </div>
            </div>
          )}

          {lead.aiScore !== null && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Score IA</p>
              <p
                className={`text-sm font-bold tabular-nums ${
                  lead.aiScore >= 70
                    ? "text-green-600"
                    : lead.aiScore >= 40
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {lead.aiScore}/100
              </p>
            </div>
          )}
        </div>

        {/* Notas */}
        {lead.notes && (
          <>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-2">Notas</p>
              <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
            </div>
          </>
        )}

        {/* Rodapé */}
        <Separator />
        <p className="text-xs text-muted-foreground">
          Criado em{" "}
          {format(lead.createdAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </CardContent>
    </Card>
  );
}
