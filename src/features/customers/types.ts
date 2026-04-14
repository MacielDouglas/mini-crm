import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  company: z.string().optional(),
  totalRevenue: z
    .string()
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : parseFloat(v)))
    .pipe(z.number().positive("Valor deve ser positivo").optional()),
});

export type CustomerFormInput = z.input<typeof customerSchema>;
export type CustomerFormOutput = z.output<typeof customerSchema>;
