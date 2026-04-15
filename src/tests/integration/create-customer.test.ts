import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/shared/lib/prisma", () => ({
  prisma: {
    customer: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    lead: {
      update: vi.fn(),
    },
  },
}));

vi.mock("@/shared/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(() => new Headers()),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { createCustomer } from "@/features/customers/actions/create-customer";
import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";

const validData = {
  name: "Empresa ABC",
  email: "contato@abc.com",
  phone: "(11) 99999-9999",
  company: "ABC Ltda",
  totalRevenue: "15000",
};

describe("createCustomer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { id: "user-1" },
      session: { id: "session-1" },
    } as never);
    vi.mocked(prisma.customer.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.customer.create).mockResolvedValue({} as never);
    vi.mocked(prisma.lead.update).mockResolvedValue({} as never);
  });

  it("cria cliente com dados válidos", async () => {
    const result = await createCustomer("org-1", "lead-1", validData);

    expect(result).toBeUndefined(); // sem erro = sucesso
    expect(prisma.customer.create).toHaveBeenCalledOnce();
    expect(prisma.lead.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "lead-1" },
        data: { status: "WON" },
      }),
    );
  });

  it("retorna erro se não autenticado", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null as never);

    const result = await createCustomer("org-1", "lead-1", validData);

    expect(result).toEqual({ error: "Não autorizado" });
    expect(prisma.customer.create).not.toHaveBeenCalled();
  });

  it("retorna erro se dados inválidos", async () => {
    const result = await createCustomer("org-1", "lead-1", { name: "A" });

    expect(result).toEqual(
      expect.objectContaining({ error: expect.any(String) }),
    );
    expect(prisma.customer.create).not.toHaveBeenCalled();
  });

  it("retorna erro se lead já foi convertido", async () => {
    vi.mocked(prisma.customer.findUnique).mockResolvedValue({
      id: "existing",
    } as never);

    const result = await createCustomer("org-1", "lead-1", validData);

    expect(result).toEqual({ error: expect.stringContaining("convertido") });
    expect(prisma.customer.create).not.toHaveBeenCalled();
  });

  it("retorna erro se e-mail inválido", async () => {
    const result = await createCustomer("org-1", "lead-1", {
      ...validData,
      email: "email-invalido",
    });

    expect(result).toEqual(
      expect.objectContaining({ error: expect.any(String) }),
    );
  });

  it("aceita totalRevenue vazio como null", async () => {
    await createCustomer("org-1", "lead-1", { ...validData, totalRevenue: "" });

    expect(prisma.customer.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ totalRevenue: null }),
      }),
    );
  });
});
