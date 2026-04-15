import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  phone: z
    .string()
    .max(20, "Telefone muito longo")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(100, "Nome da empresa muito longo")
    .optional()
    .or(z.literal("")),
  jobTitle: z
    .string()
    .max(100, "Cargo muito longo")
    .optional()
    .or(z.literal("")),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  stageId: z.string().min(1, "Estágio é obrigatório"),
  source: z.enum([
    "WEBSITE",
    "REFERRAL",
    "COLD_OUTREACH",
    "SOCIAL_MEDIA",
    "EVENT",
    "PAID_AD",
    "OTHER",
  ]),
  value: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? parseFloat(v) : undefined)),
  notes: z
    .string()
    .max(2000, "Notas muito longas")
    .optional()
    .or(z.literal("")),
  expectedCloseAt: z.coerce.date().optional(),
  assignedToId: z.string().optional().or(z.literal("")),
});

export type LeadSchema = z.infer<typeof leadSchema>;

export const leadSourceLabels: Record<string, string> = {
  WEBSITE: "Site",
  REFERRAL: "Indicação",
  COLD_OUTREACH: "Prospecção",
  SOCIAL_MEDIA: "Redes Sociais",
  EVENT: "Evento",
  PAID_AD: "Anúncio",
  OTHER: "Outro",
};
