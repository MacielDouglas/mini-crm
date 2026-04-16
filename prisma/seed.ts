import { config } from "dotenv";
config({ path: ".env", override: true }); // carrega .env.test

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { auth } from "../src/shared/lib/auth";

// Cria o cliente diretamente, sem depender do prisma.ts compartilhado
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const testEmail = process.env.TEST_EMAIL ?? "test@minicrm.com";
  const testPassword = process.env.TEST_PASSWORD ?? "Test@1234";

  const existing = await prisma.user.findUnique({
    where: { email: testEmail },
  });

  if (!existing) {
    await auth.api.signUpEmail({
      body: { name: "Usuário Teste", email: testEmail, password: testPassword },
    });
    console.log(`✅ Usuário criado: ${testEmail}`);
  } else {
    console.log(`⏭️ Usuário já existe: ${testEmail}`);
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: testEmail },
  });

  const orgExists = await prisma.organization.findUnique({
    where: { slug: "org-teste" },
  });

  let org;
  if (!orgExists) {
    org = await prisma.organization.create({
      data: {
        name: "Organização Teste",
        slug: "org-teste",
        members: { create: { userId: user.id, role: "OWNER" } },
        pipeline: {
          createMany: {
            data: [
              {
                name: "Novo Lead",
                color: "#6366f1",
                position: 0,
                isDefault: true,
              },
              { name: "Contato Feito", color: "#f59e0b", position: 1 },
              { name: "Proposta Enviada", color: "#3b82f6", position: 2 },
              { name: "Negociação", color: "#8b5cf6", position: 3 },
              { name: "Fechado", color: "#10b981", position: 4 },
            ],
          },
        },
      },
      include: { pipeline: true },
    });
    console.log(`✅ Organização criada: ${org.name}`);
  } else {
    org = await prisma.organization.findUniqueOrThrow({
      where: { slug: "org-teste" },
      include: { pipeline: true },
    });
    console.log(`⏭️ Organização já existe: ${org.name}`);
  }

  const firstStage = org.pipeline[0];
  const leadExists = await prisma.lead.findUnique({
    where: { id: "lead-e2e-test" },
  });

  if (!leadExists) {
    await prisma.lead.create({
      data: {
        id: "lead-e2e-test",
        organizationId: org.id,
        stageId: firstStage.id,
        createdById: user.id,
        name: "Lead E2E Teste",
        email: "lead-e2e@teste.com",
        company: "Empresa E2E",
        source: "WEBSITE",
        status: "NEW",
      },
    });
    console.log("✅ Lead de teste criado");
  } else {
    console.log("⏭️ Lead de teste já existe");
  }

  console.log("🎉 Seed concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
