import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock do Prisma
vi.mock("@/shared/lib/prisma", () => ({
  prisma: {
    lead: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

// Mock do auth
vi.mock("@/shared/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

// Mock do next/headers
vi.mock("next/headers", () => ({
  headers: vi.fn(() => new Headers()),
}));

import { getLeads } from "@/features/leads/actions/get-leads";
import { prisma } from "@/shared/lib/prisma";
import { auth } from "@/shared/lib/auth";

const mockLead = {
  id: "lead-1",
  name: "Lead Teste",
  email: "lead@teste.com",
  company: "Empresa",
  value: null,
  aiScore: null,
  status: "ACTIVE",
  source: "WEBSITE",
  createdAt: new Date(),
  updatedAt: new Date(),
  organizationId: "org-1",
  stageId: "stage-1",
  stage: { id: "stage-1", name: "Novo Lead", color: "#6366f1" },
  assignedTo: null,
  tags: [],
  _count: { interactions: 0 },
};

describe("getLeads", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { id: "user-1", name: "User", email: "user@test.com" },
      session: { id: "session-1" },
    } as never);
  });

  it("retorna leads paginados", async () => {
    vi.mocked(prisma.lead.findMany).mockResolvedValue([mockLead] as never);
    vi.mocked(prisma.lead.count).mockResolvedValue(1);

    const result = await getLeads({ organizationId: "org-1" });

    expect(result.leads).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.pages).toBe(1);
    expect(result.page).toBe(1);
  });

  it("aplica filtro de busca", async () => {
    vi.mocked(prisma.lead.findMany).mockResolvedValue([]);
    vi.mocked(prisma.lead.count).mockResolvedValue(0);

    await getLeads({ organizationId: "org-1", search: "João" });

    expect(prisma.lead.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.arrayContaining([
            expect.objectContaining({
              name: expect.objectContaining({ contains: "João" }),
            }),
          ]),
        }),
      }),
    );
  });

  it("aplica filtro de stageId", async () => {
    vi.mocked(prisma.lead.findMany).mockResolvedValue([]);
    vi.mocked(prisma.lead.count).mockResolvedValue(0);

    await getLeads({ organizationId: "org-1", stageId: "stage-1" });

    expect(prisma.lead.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ stageId: "stage-1" }),
      }),
    );
  });

  it("lança erro se não autenticado", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null as never);

    await expect(getLeads({ organizationId: "org-1" })).rejects.toThrow();
  });

  it("calcula paginação corretamente", async () => {
    vi.mocked(prisma.lead.findMany).mockResolvedValue([]);
    vi.mocked(prisma.lead.count).mockResolvedValue(45);

    const result = await getLeads({ organizationId: "org-1", limit: 20 });

    expect(result.pages).toBe(3); // ceil(45/20) = 3
    expect(result.total).toBe(45);
  });
});
