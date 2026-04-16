"use client";

import { useState } from "react";
import { scoreLeadAction } from "../actions/score-lead-action";

export function useScoreLead() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function scoreLead(leadId: string) {
    setIsPending(true);
    setError(null);
    const result = await scoreLeadAction(leadId);
    setIsPending(false);

    if ("error" in result) {
      setError(result.error);
      return null;
    }

    return result; // { success: true, score, reason, nextAction }
  }

  return { scoreLead, isPending, error };
}
