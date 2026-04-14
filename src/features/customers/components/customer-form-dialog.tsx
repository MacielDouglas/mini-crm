"use client";

import { useState, useTransition } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { CustomerForm } from "./customer-form";
import { createCustomer } from "../actions/create-customer";
import type { CustomerFormOutput } from "../types";

interface ConvertLeadDialogProps {
  organizationId: string;
  lead: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
  };
}

export function ConvertLeadDialog({
  organizationId,
  lead,
}: ConvertLeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(data: CustomerFormOutput) {
    setError(null);
    startTransition(async () => {
      const result = await createCustomer(organizationId, lead.id, data);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowRightLeft className="mr-2 size-4" aria-hidden />
          Converter em Cliente
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Converter Lead em Cliente</DialogTitle>
        </DialogHeader>

        {error && (
          <div
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <CustomerForm
          defaultValues={{
            name: lead.name,
            email: lead.email ?? "",
            phone: lead.phone ?? "",
            company: lead.company ?? "",
          }}
          onSubmit={onSubmit}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" form="customer-form" disabled={isPending}>
            {isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            )}
            {isPending ? "Convertendo..." : "Converter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
