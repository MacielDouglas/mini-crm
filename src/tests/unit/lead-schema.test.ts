import { describe, it, expect } from "vitest";
import { leadSchema, leadSourceLabels } from "@/features/leads/types";

describe("leadSchema", () => {
  it("valida um lead completo corretamente", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      stageId: "clxyz123",
      source: "WEBSITE",
      email: "joao@empresa.com",
      phone: "(11) 99999-9999",
      company: "Empresa S.A.",
      jobTitle: "CEO",
      value: "5000",
      expectedCloseAt: new Date("2026-12-31"),
      notes: "Cliente potencial",
    });

    if (!result.success)
      console.log("ZOD ERRORS:", JSON.stringify(result.error.issues, null, 2));

    expect(result.success).toBe(true);
  });

  it("valida um lead mínimo (só nome e estágio)", () => {
    const result = leadSchema.safeParse({
      name: "Maria",
      stageId: "clxyz123",
      source: "OTHER",
    });

    expect(result.success).toBe(true);
  });

  it("rejeita nome muito curto", () => {
    const result = leadSchema.safeParse({
      name: "A",
      stageId: "clxyz123",
      source: "OTHER",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("name");
  });

  it("rejeita nome vazio", () => {
    const result = leadSchema.safeParse({
      name: "",
      stageId: "clxyz123",
      source: "OTHER",
    });

    expect(result.success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      stageId: "clxyz123",
      source: "OTHER",
      email: "email-invalido",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("email");
  });

  it("aceita e-mail vazio (campo opcional)", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      stageId: "clxyz123",
      source: "OTHER",
      email: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejeita stageId vazio", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      stageId: "",
      source: "OTHER",
    });

    expect(result.success).toBe(false);
  });

  it("rejeita source inválido", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      stageId: "clxyz123",
      source: "INVALIDO",
    });

    expect(result.success).toBe(false);
  });

  it("transforma value string para number", () => {
    const result = leadSchema.safeParse({
      name: "João Silva",
      stageId: "clxyz123",
      source: "OTHER",
      value: "1500.50",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(typeof result.data.value).toBe("number");
      expect(result.data.value).toBe(1500.5);
    }
  });
});

describe("leadSourceLabels", () => {
  it("tem label para todas as sources do schema", () => {
    const sources = [
      "WEBSITE",
      "REFERRAL",
      "COLD_OUTREACH",
      "SOCIAL_MEDIA",
      "EVENT",
      "PAID_AD",
      "OTHER",
    ];
    sources.forEach((source) => {
      expect(leadSourceLabels[source]).toBeDefined();
      expect(typeof leadSourceLabels[source]).toBe("string");
    });
  });
});
