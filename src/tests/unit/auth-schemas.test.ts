import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "@/features/auth/types";

describe("loginSchema", () => {
  it("valida dados corretos", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "senha123",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita email inválido", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "senha123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("E-mail inválido");
  });

  it("rejeita email vazio", () => {
    const result = loginSchema.safeParse({ email: "", password: "senha123" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("E-mail é obrigatório");
  });

  it("rejeita senha vazia", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Senha é obrigatória");
  });
});

describe("registerSchema", () => {
  const validData = {
    name: "Douglas Maciel",
    email: "douglas@example.com",
    password: "Senha123",
    confirmPassword: "Senha123",
  };

  it("valida dados corretos", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejeita nome muito curto", () => {
    const result = registerSchema.safeParse({ ...validData, name: "D" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Nome deve ter pelo menos 2 caracteres",
    );
  });

  it("rejeita senha sem maiúscula", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "senha123",
      confirmPassword: "senha123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Deve conter pelo menos uma letra maiúscula",
    );
  });

  it("rejeita senha sem número", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "SenhaSemNumero",
      confirmPassword: "SenhaSemNumero",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Deve conter pelo menos um número",
    );
  });

  it("rejeita senhas que não coincidem", () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: "SenhaErrada1",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Senhas não coincidem");
  });

  it("rejeita senha com menos de 8 caracteres", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "S1",
      confirmPassword: "S1",
    });
    expect(result.success).toBe(false);
  });
});
