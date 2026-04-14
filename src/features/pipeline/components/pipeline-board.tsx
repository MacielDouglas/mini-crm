"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable"
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { PipelineColumn } from "./pipeline-column";
import { PipelineCard, type PipelineLead } from "./pipeline-card";
import { moveLead } from "../actions/move-lead";

interface Stage {
  id: string;
  name: string;
  color: string;
}

interface PipelineBoardProps {
  stages: Stage[];
  initialLeads: PipelineLead[];
  stageMap: Record<string, string>; // leadId → stageId
}

export function PipelineBoard({
  stages,
  initialLeads,
  stageMap,
}: PipelineBoardProps) {
  // Estado local: mapa de leadId → stageId para drag otimista
  const [leadStages, setLeadStages] =
    useState<Record<string, string>>(stageMap);
  const [leads] = useState<PipelineLead[]>(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const getLeadsForStage = useCallback(
    (stageId: string) =>
      leads.filter((l) => (leadStages[l.id] ?? stageId) === stageId),
    [leads, leadStages],
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function handleDragOver({ over }: DragOverEvent) {
    if (!over) return;
    setOverId(over.id as string);
  }

  async function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const leadId = active.id as string;
    const targetId = over.id as string;

    // Determina o stageId de destino
    // Se o targetId é um stage → move para esse stage
    // Se o targetId é um lead → move para o stage desse lead
    const targetStageId = stages.find((s) => s.id === targetId)
      ? targetId
      : (leadStages[targetId] ?? leadStages[leadId]);

    if (!targetStageId || targetStageId === leadStages[leadId]) return;

    // Atualização otimista
    setLeadStages((prev) => ({ ...prev, [leadId]: targetStageId }));

    // Persiste no servidor
    const result = await moveLead(leadId, targetStageId);
    if (result?.error) {
      // Reverte em caso de erro
      setLeadStages((prev) => ({ ...prev, [leadId]: leadStages[leadId] }));
    }
  }

  const activeLead = leads.find((l) => l.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 min-h-[calc(100vh-12rem)]">
          {stages.map((stage) => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              leads={getLeadsForStage(stage.id)}
              isOver={overId === stage.id}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Ghost card ao arrastar */}
      <DragOverlay dropAnimation={{ duration: 150, easing: "ease" }}>
        {activeLead ? (
          <div className="rotate-2 scale-105 opacity-95 shadow-xl">
            <PipelineCard lead={activeLead} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
