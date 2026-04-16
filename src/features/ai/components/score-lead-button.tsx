"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useScoreLead } from "@/features/ai/hooks/use-score-lead";

interface ScoreLeadButtonProps {
  leadId: string;
  currentScore: number | null;
}

export function ScoreLeadButton({
  leadId,
  currentScore,
}: ScoreLeadButtonProps) {
  const { scoreLead, isPending, error } = useScoreLead();

  return (
    <div className="space-y-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => scoreLead(leadId)}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="size-4 mr-2" />
        )}
        {isPending
          ? "Analisando..."
          : currentScore !== null
            ? "Re-analisar com IA"
            : "Analisar com IA"}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
