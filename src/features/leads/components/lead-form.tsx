"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { leadSchema, leadSourceLabels, type LeadSchema } from "../types";

import { z } from "zod";

// Tipos separados: input (valores crus do form) e output (valores após transformação Zod)
type LeadFormInput = z.input<typeof leadSchema>;
type LeadFormOutput = z.output<typeof leadSchema>;

interface LeadFormProps {
  stages: { id: string; name: string }[];
  defaultValues?: Partial<LeadFormInput>;
  onSubmit: (data: LeadFormOutput) => void;
  isPending?: boolean;
}

export function LeadForm({ stages, defaultValues, onSubmit }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeadFormInput, unknown, LeadFormOutput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      source: "OTHER",
      ...defaultValues,
    },
  });

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="lead-name">
          Nome <span className="text-destructive">*</span>
        </Label>
        <Input
          id="lead-name"
          placeholder="Nome do lead"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="lead-name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email e Telefone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lead-email">E-mail</Label>
          <Input
            id="lead-email"
            type="email"
            placeholder="contato@empresa.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-phone">Telefone</Label>
          <Input
            id="lead-phone"
            type="tel"
            placeholder="(11) 99999-9999"
            {...register("phone")}
          />
        </div>
      </div>

      {/* Empresa e Cargo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lead-company">Empresa</Label>
          <Input
            id="lead-company"
            placeholder="Nome da empresa"
            {...register("company")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-jobtitle">Cargo</Label>
          <Input
            id="lead-jobtitle"
            placeholder="CEO, Gerente..."
            {...register("jobTitle")}
          />
        </div>
      </div>

      {/* Estágio e Origem */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lead-stage">
            Estágio <span className="text-destructive">*</span>
          </Label>
          <Select
            defaultValue={defaultValues?.stageId}
            onValueChange={(v) =>
              setValue("stageId", v, { shouldValidate: true })
            }
          >
            <SelectTrigger id="lead-stage" aria-invalid={!!errors.stageId}>
              <SelectValue placeholder="Selecione o estágio" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.stageId && (
            <p className="text-sm text-destructive">{errors.stageId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-source">Origem</Label>
          <Select
            defaultValue={defaultValues?.source ?? "OTHER"}
            onValueChange={(v) => setValue("source", v as LeadSchema["source"])}
          >
            <SelectTrigger id="lead-source">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(leadSourceLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Valor estimado */}
      <div className="space-y-2">
        <Label htmlFor="lead-value">Valor estimado (R$)</Label>
        <Input
          id="lead-value"
          type="number"
          min="0"
          step="0.01"
          placeholder="0,00"
          {...register("value")}
        />
        {errors.value && (
          <p className="text-sm text-destructive">{errors.value.message}</p>
        )}
      </div>

      {/* Previsão de fechamento */}
      <div className="space-y-2">
        <Label htmlFor="lead-close">Previsão de fechamento</Label>
        <Input id="lead-close" type="date" {...register("expectedCloseAt")} />
      </div>

      {/* Notas */}
      <div className="space-y-2">
        <Label htmlFor="lead-notes">Notas</Label>
        <textarea
          id="lead-notes"
          rows={3}
          placeholder="Observações sobre o lead..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          {...register("notes")}
        />
      </div>
    </form>
  );
}
