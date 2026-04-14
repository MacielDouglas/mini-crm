"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  customerSchema,
  type CustomerFormInput,
  type CustomerFormOutput,
} from "../types";

interface CustomerFormProps {
  defaultValues?: Partial<CustomerFormInput>;
  onSubmit: (data: CustomerFormOutput) => void;
}

export function CustomerForm({ defaultValues, onSubmit }: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormInput, unknown, CustomerFormOutput>({
    resolver: zodResolver(customerSchema),
    defaultValues: { ...defaultValues },
  });

  return (
    <form
      id="customer-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="c-name">
          Nome <span className="text-destructive">*</span>
        </Label>
        <Input
          id="c-name"
          placeholder="Nome do cliente"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="c-email">E-mail</Label>
          <Input
            id="c-email"
            type="email"
            placeholder="contato@empresa.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-phone">Telefone</Label>
          <Input
            id="c-phone"
            type="tel"
            placeholder="(11) 99999-9999"
            {...register("phone")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="c-company">Empresa</Label>
          <Input
            id="c-company"
            placeholder="Nome da empresa"
            {...register("company")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-revenue">Receita total (R$)</Label>
          <Input
            id="c-revenue"
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
            {...register("totalRevenue")}
          />
          {errors.totalRevenue && (
            <p className="text-sm text-destructive">
              {errors.totalRevenue.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
