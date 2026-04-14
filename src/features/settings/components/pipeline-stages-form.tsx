"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { updatePipelineStages } from "../actions/update-pipeline-stages";
import { cn } from "@/shared/utils/utils";

interface Stage {
  id?: string;
  name: string;
  color: string;
  position: number;
  leadsCount?: number;
}

const PRESET_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#64748b",
];

function SortableStageRow({
  stage,
  onChange,
  onRemove,
  canRemove,
}: {
  stage: Stage & { _key: string };
  onChange: (key: string, field: keyof Stage, value: string) => void;
  onRemove: (key: string) => void;
  canRemove: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stage._key });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg border bg-card",
        isDragging && "opacity-50 shadow-lg",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing"
        aria-label="Reordenar"
        type="button"
      >
        <GripVertical className="size-4" aria-hidden />
      </button>

      {/* Color picker */}
      <div className="relative shrink-0">
        <input
          type="color"
          value={stage.color}
          onChange={(e) => onChange(stage._key, "color", e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer size-full"
          aria-label="Cor do estágio"
        />
        <div
          className="size-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: stage.color }}
        />
      </div>

      <Input
        value={stage.name}
        onChange={(e) => onChange(stage._key, "name", e.target.value)}
        placeholder="Nome do estágio"
        className="flex-1 h-8 text-sm"
      />

      {stage.leadsCount !== undefined && stage.leadsCount > 0 && (
        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
          {stage.leadsCount} lead{stage.leadsCount !== 1 ? "s" : ""}
        </span>
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-destructive shrink-0"
        onClick={() => onRemove(stage._key)}
        disabled={
          !canRemove || (stage.leadsCount !== undefined && stage.leadsCount > 0)
        }
        aria-label="Remover estágio"
      >
        <Trash2 className="size-3.5" aria-hidden />
      </Button>
    </div>
  );
}

interface PipelineStagesFormProps {
  organizationId: string;
  initialStages: (Stage & { id: string; leadsCount: number })[];
}

export function PipelineStagesForm({
  organizationId,
  initialStages,
}: PipelineStagesFormProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [stages, setStages] = useState<(Stage & { _key: string })[]>(
    initialStages.map((s) => ({ ...s, _key: s.id })),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    setStages((prev) => {
      const from = prev.findIndex((s) => s._key === active.id);
      const to = prev.findIndex((s) => s._key === over.id);
      return arrayMove(prev, from, to).map((s, i) => ({ ...s, position: i }));
    });
  }

  function handleChange(key: string, field: keyof Stage, value: string) {
    setStages((prev) =>
      prev.map((s) => (s._key === key ? { ...s, [field]: value } : s)),
    );
  }

  function handleAdd() {
    const key = `new-${Date.now()}`;
    setStages((prev) => [
      ...prev,
      {
        _key: key,
        name: "",
        color: PRESET_COLORS[prev.length % PRESET_COLORS.length],
        position: prev.length,
        leadsCount: 0,
      },
    ]);
  }

  function handleRemove(key: string) {
    setStages((prev) => prev.filter((s) => s._key !== key));
  }

  function handleSave() {
    setSuccess(false);
    setError(null);
    startTransition(async () => {
      const payload = stages.map((s, i) => ({
        id: s.id,
        name: s.name,
        color: s.color,
        position: i,
      }));
      const result = await updatePipelineStages(organizationId, payload);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estágios do Pipeline</CardTitle>
        <CardDescription>
          Arraste para reordenar. Estágios com leads não podem ser removidos.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {error && (
          <div
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            role="status"
            className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-600"
          >
            Salvo com sucesso!
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={stages.map((s) => s._key)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {stages.map((stage) => (
                <SortableStageRow
                  key={stage._key}
                  stage={stage}
                  onChange={handleChange}
                  onRemove={handleRemove}
                  canRemove={stages.length > 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="w-full"
        >
          <Plus className="mr-2 size-4" aria-hidden />
          Adicionar estágio
        </Button>
      </CardContent>

      <CardFooter className="justify-end border-t pt-4">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending && (
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
          )}
          {isPending ? "Salvando..." : "Salvar estágios"}
        </Button>
      </CardFooter>
    </Card>
  );
}
