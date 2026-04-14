"use client";

import { useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { LeadForm } from "./lead-form";
import { useLeads } from "../hooks/use-leads";
import type { z } from "zod";
import type { leadSchema } from "../types";

type LeadFormOutput = z.output<typeof leadSchema>;

interface LeadEditDialogProps {
  leadId: string;
  organizationId: string;
  stages: { id: string; name: string }[];
  defaultValues: Partial<z.input<typeof leadSchema>>;
}

export function LeadEditDialog({
  leadId,
  organizationId,
  stages,
  defaultValues,
}: LeadEditDialogProps) {
  const [open, setOpen] = useState(false);
  const { isPending, error, handleUpdate } = useLeads(organizationId);

  async function onSubmit(data: LeadFormOutput) {
    await handleUpdate(leadId, data);
    if (!error) setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 size-4" aria-hidden />
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>

        {error && (
          <div
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <LeadForm
          stages={stages}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isPending={isPending}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" form="lead-form" disabled={isPending}>
            {isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            )}
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
