"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Building2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/utils/utils";

export interface PipelineLead {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  value: unknown;
  aiScore: number | null;
  assignedTo: { name: string; image: string | null } | null;
}

interface PipelineCardProps {
  lead: PipelineLead;
  isDragging?: boolean;
}

export function PipelineCard({ lead, isDragging }: PipelineCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const value =
    lead.value !== null && lead.value !== undefined
      ? Number(lead.value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        })
      : null;

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={cn(
          "p-3 group cursor-grab active:cursor-grabbing select-none",
          "hover:shadow-md transition-shadow duration-150",
          (isSortableDragging || isDragging) && "opacity-40",
        )}
      >
        <div className="flex items-start gap-2">
          {/* Handle */}
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 shrink-0 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            aria-label="Arrastar card"
            tabIndex={-1}
          >
            <GripVertical className="size-4" aria-hidden />
          </button>

          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Nome */}
            <Link
              href={`/dashboard/leads/${lead.id}`}
              className="text-sm font-medium leading-tight hover:underline underline-offset-2 line-clamp-2 block"
              onClick={(e) => e.stopPropagation()}
            >
              {lead.name}
            </Link>

            {/* Empresa */}
            {lead.company && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="size-3 shrink-0" aria-hidden />
                <span className="truncate">{lead.company}</span>
              </div>
            )}

            {/* Rodapé */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {/* Valor */}
              {value ? (
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {value}
                </span>
              ) : (
                <span />
              )}

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Score IA */}
                {lead.aiScore !== null && (
                  <span
                    className={cn(
                      "text-xs font-bold tabular-nums",
                      lead.aiScore >= 70
                        ? "text-green-600"
                        : lead.aiScore >= 40
                          ? "text-yellow-600"
                          : "text-red-500",
                    )}
                  >
                    {lead.aiScore}
                  </span>
                )}

                {/* Avatar responsável */}
                {lead.assignedTo && (
                  <Avatar className="size-5">
                    <AvatarFallback className="text-[10px]">
                      {lead.assignedTo.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
