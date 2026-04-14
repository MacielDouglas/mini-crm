"use client";

import { useState, useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { createInteraction } from "@/features/interactions/actions/create-interaction";
import { useRouter } from "next/navigation";

const interactionTypes = [
  { value: "NOTE", label: "Nota" },
  { value: "EMAIL", label: "E-mail" },
  { value: "CALL", label: "Ligação" },
  { value: "MEETING", label: "Reunião" },
  { value: "TASK", label: "Tarefa" },
];

interface Interaction {
  id: string;
  type: string;
  title: string;
  content: string | null;
  occurredAt: Date;
  user: { name: string; image: string | null };
}

interface LeadInteractionsProps {
  leadId: string;
  interactions: Interaction[];
}

export function LeadInteractions({
  leadId,
  interactions,
}: LeadInteractionsProps) {
  const router = useRouter();
  const [type, setType] = useState("NOTE");
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    startTransition(async () => {
      await createInteraction({ leadId, type, content });
      setContent("");
      router.refresh();
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Interações ({interactions.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Nova interação */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-36 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {interactionTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Registre uma nota, ligação, reunião..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="resize-none"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={isPending || !content.trim()}
            >
              <Send className="mr-2 size-3.5" aria-hidden />
              {isPending ? "Salvando..." : "Registrar"}
            </Button>
          </div>
        </form>

        {/* Lista de interações */}
        {interactions.length > 0 ? (
          <div className="space-y-3 pt-2 border-t">
            {interactions.map((interaction) => (
              <div key={interaction.id} className="flex gap-3">
                <Avatar className="size-7 shrink-0 mt-0.5">
                  <AvatarFallback className="text-xs">
                    {interaction.user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">
                      {interaction.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                      {interactionTypes.find(
                        (t) => t.value === interaction.type,
                      )?.label ?? interaction.type}
                    </span>
                    <time className="text-xs text-muted-foreground ml-auto">
                      {formatDistanceToNow(interaction.occurredAt, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 whitespace-pre-wrap">
                    {interaction.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-sm text-muted-foreground border-t pt-4">
            Nenhuma interação registrada ainda
          </div>
        )}
      </CardContent>
    </Card>
  );
}
