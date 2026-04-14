"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/shared/utils/utils";
import { PipelineCard, type PipelineLead } from "./pipeline-card";

interface PipelineColumnProps {
  stage: {
    id: string;
    name: string;
    color: string;
  };
  leads: PipelineLead[];
  isOver?: boolean;
}

export function PipelineColumn({ stage, leads, isOver }: PipelineColumnProps) {
  const { setNodeRef } = useDroppable({ id: stage.id });

  const totalValue = leads.reduce((acc, lead) => {
    const v = lead.value !== null ? Number(lead.value) : 0;
    return acc + (isNaN(v) ? 0 : v);
  }, 0);

  const formattedTotal =
    totalValue > 0
      ? totalValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          maximumFractionDigits: 0,
        })
      : null;

  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Header da coluna */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
            aria-hidden
          />
          <h3 className="text-sm font-semibold truncate">{stage.name}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full tabular-nums">
            {leads.length}
          </span>
        </div>
        {formattedTotal && (
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {formattedTotal}
          </span>
        )}
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-xl p-2 min-h-24 transition-colors duration-150",
          "bg-muted/40",
          isOver && "bg-primary/5 ring-2 ring-primary/20",
        )}
      >
        <SortableContext
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {leads.map((lead) => (
              <PipelineCard key={lead.id} lead={lead} />
            ))}
          </div>
        </SortableContext>

        {leads.length === 0 && (
          <div
            className={cn(
              "flex items-center justify-center h-24 rounded-lg border-2 border-dashed",
              "text-xs text-muted-foreground",
              isOver
                ? "border-primary/40 text-primary"
                : "border-muted-foreground/20",
            )}
          >
            {isOver ? "Soltar aqui" : "Sem leads"}
          </div>
        )}
      </div>
    </div>
  );
}
