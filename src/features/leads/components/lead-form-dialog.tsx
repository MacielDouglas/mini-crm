"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { LeadForm } from "./lead-form";
import { useLeads } from "../hooks/use-leads";
import type { LeadSchema } from "../types";

interface LeadFormDialogProps {
  organizationId: string;
  stages: { id: string; name: string }[];
}

export function LeadFormDialog({
  organizationId,
  stages,
}: LeadFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { isPending, error, handleCreate } = useLeads(organizationId);

  async function onSubmit(data: LeadSchema) {
    const success = await handleCreate(data);
    if (success) setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" aria-hidden />
          Novo Lead
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Lead</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo lead para adicioná-lo ao pipeline.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <LeadForm stages={stages} onSubmit={onSubmit} isPending={isPending} />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" form="lead-form" disabled={isPending}>
            {isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            )}
            {isPending ? "Salvando..." : "Salvar Lead"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
