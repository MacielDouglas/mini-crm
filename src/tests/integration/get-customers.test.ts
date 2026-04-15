import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/shared/lib/prisma", () => ({
  prisma: {
    customer: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import { getCustomers } from "@/features/customers/actions/get-customers";
import { prisma } from "@/shared/lib/prisma";

const mockCustomer = {
  id: "customer-1",
  name: "Empresa ABC",
  email: "contato@abc.com",
  phone: "(11) 99999-9999",
  company: "ABC Ltda",
  totalRevenue: 15000,
  organizationId: "org-1",
  leadId: "lead-1",
  createdAt: new Date(),
  updatedAt: new Date(),
  _count: { interactions: 3 },
};

describe("getCustomers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna clientes paginados", async () => {
    vi.mocked(prisma.customer.findMany).mockResolvedValue([
      mockCustomer,
    ] as never);
    vi.mocked(prisma.customer.count).mockResolvedValue(1);

    const result = await getCustomers({ organizationId: "org-1" });

    expect(result.customers).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.pages).toBe(1);
  });

  it("aplica filtro de busca por nome", async () => {
    vi.mocked(prisma.customer.findMany).mockResolvedValue([]);
    vi.mocked(prisma.customer.count).mockResolvedValue(0);

    await getCustomers({ organizationId: "org-1", search: "ABC" });

    expect(prisma.customer.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.arrayContaining([
            expect.objectContaining({
              name: expect.objectContaining({ contains: "ABC" }),
            }),
          ]),
        }),
      }),
    );
  });

  it("não aplica filtro OR quando search está vazio", async () => {
    vi.mocked(prisma.customer.findMany).mockResolvedValue([]);
    vi.mocked(prisma.customer.count).mockResolvedValue(0);

    await getCustomers({ organizationId: "org-1" });

    expect(prisma.customer.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { organizationId: "org-1" },
      }),
    );
  });

  it("calcula paginação corretamente", async () => {
    vi.mocked(prisma.customer.findMany).mockResolvedValue([]);
    vi.mocked(prisma.customer.count).mockResolvedValue(50);

    const result = await getCustomers({
      organizationId: "org-1",
      pageSize: 20,
    });

    expect(result.pages).toBe(3); // ceil(50/20) = 3
    expect(result.total).toBe(50);
  });

  it("usa pageSize padrão de 20", async () => {
    vi.mocked(prisma.customer.findMany).mockResolvedValue([]);
    vi.mocked(prisma.customer.count).mockResolvedValue(0);

    await getCustomers({ organizationId: "org-1" });

    expect(prisma.customer.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 20, skip: 0 }),
    );
  });

  it("aplica skip correto na página 2", async () => {
    vi.mocked(prisma.customer.findMany).mockResolvedValue([]);
    vi.mocked(prisma.customer.count).mockResolvedValue(0);

    await getCustomers({ organizationId: "org-1", page: 2, pageSize: 20 });

    expect(prisma.customer.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 20, skip: 20 }),
    );
  });
});
