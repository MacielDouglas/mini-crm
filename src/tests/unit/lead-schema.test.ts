import { describe, it, expect } from "vitest";
import { leadSchema } from "@/features/leads/types";

describe("leadSchema", () => {
  const validLead = {
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "11999999999",
    company: "Empresa XYZ",
    jobTitle: "CEO",
    website: "https://empresa.com",
    stageId: "stage-id-123",
    source: "REFERRAL" as const,
    value: "5000",
    notes: "Lead quente",
    expectedCloseAt: "",
    assignedToId: "",
  };

  it("valida lead completo", () => {
    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it("valida lead com apenas campos obrigatórios", () => {
    const result = leadSchema.safeParse({
      name: "Maria Santos",
      stageId: "stage-id-123",
      source: "WEBSITE",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita nome muito curto", () => {
    const result = leadSchema.safeParse({ ...validLead, name: "J" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Nome deve ter pelo menos 2 caracteres",
    );
  });

  it("rejeita email inválido", () => {
    const result = leadSchema.safeParse({
      ...validLead,
      email: "email-invalido",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita URL inválida", () => {
    const result = leadSchema.safeParse({
      ...validLead,
      website: "site-sem-https",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita source inválido", () => {
    const result = leadSchema.safeParse({
      ...validLead,
      source: "INVALIDO",
    });
    expect(result.success).toBe(false);
  });

  it("aceita email vazio", () => {
    const result = leadSchema.safeParse({ ...validLead, email: "" });
    expect(result.success).toBe(true);
  });

  it("aceita website vazio", () => {
    const result = leadSchema.safeParse({ ...validLead, website: "" });
    expect(result.success).toBe(true);
  });

  it("transforma value string em número", () => {
    const result = leadSchema.safeParse({ ...validLead, value: "1500.50" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.value).toBe(1500.5);
    }
  });

  it("aceita value vazio", () => {
    const result = leadSchema.safeParse({ ...validLead, value: "" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.value).toBeUndefined();
    }
  });
});
