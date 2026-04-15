import { test, expect } from "@playwright/test";

// Fixture: usuário já autenticado
test.use({ storageState: "src/tests/e2e/.auth/user.json" });

test.describe("Leads", () => {
  test("exibe a lista de leads", async ({ page }) => {
    await page.goto("/dashboard/leads");
    await expect(page.getByRole("heading", { name: /leads/i })).toBeVisible();
  });

  test("abre o modal de criação de lead", async ({ page }) => {
    await page.goto("/dashboard/leads");
    await page.getByRole("button", { name: /novo lead|adicionar/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByLabel(/nome/i)).toBeVisible();
  });

  test("valida campo nome obrigatório ao criar lead", async ({ page }) => {
    await page.goto("/dashboard/leads");
    await page.getByRole("button", { name: /novo lead|adicionar/i }).click();
    await page.getByRole("button", { name: /salvar|criar/i }).click();
    await expect(
      page.getByText(/pelo menos 2 caracteres|obrigatório/i),
    ).toBeVisible({ timeout: 3000 });
  });
});
