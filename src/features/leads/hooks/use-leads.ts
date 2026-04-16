"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createLead } from "../actions/create-lead";
import { updateLead } from "../actions/update-lead";
import { deleteLead } from "../actions/delete-lead";
import type { LeadSchema } from "../types";

export function useLeads(organizationId: string) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(data: LeadSchema): Promise<boolean> {
    setError(null);

    return new Promise((resolve) => {
      startTransition(async () => {
        const result = await createLead(organizationId, data);
        if (result?.error) {
          setError(result.error);
          resolve(false);
          return;
        }
        router.refresh();
        resolve(true);
      });
    });
  }

  async function handleUpdate(leadId: string, data: Partial<LeadSchema>) {
    setError(null);
    startTransition(async () => {
      const result = await updateLead(leadId, data);
      if (result?.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  async function handleDelete(leadId: string) {
    setError(null);
    startTransition(async () => {
      const result = await deleteLead(leadId);
      if (result?.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return { isPending, error, handleCreate, handleUpdate, handleDelete };
}
