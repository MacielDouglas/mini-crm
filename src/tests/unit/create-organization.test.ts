import { describe, it, expect } from "vitest";
import { z } from "zod";

// Testamos o schema de validação isolado (sem chamar o banco)
const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  slug: z
    .string()
    .min(2, "Slug deve ter pelo menos 2 caracteres")
    .max(50, "Slug muito longo")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug deve conter apenas letras minúsculas, números e hífens",
    ),
});

describe("createOrganizationSchema", () => {
  it("valida dados corretos", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Acme Inc",
      slug: "acme-inc",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita nome muito curto", () => {
    const result = createOrganizationSchema.safeParse({
      name: "A",
      slug: "acme",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Nome deve ter pelo menos 2 caracteres",
    );
  });

  it("rejeita slug com caracteres inválidos", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Acme Inc",
      slug: "Acme Inc!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Slug deve conter apenas letras minúsculas, números e hífens",
    );
  });

  it("rejeita slug muito curto", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Acme Inc",
      slug: "a",
    });
    expect(result.success).toBe(false);
  });

  it("aceita slug com números e hífens", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Acme Inc",
      slug: "acme-inc-2024",
    });
    expect(result.success).toBe(true);
  });
});
