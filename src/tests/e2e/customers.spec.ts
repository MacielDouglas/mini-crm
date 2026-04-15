import { test, expect } from "@playwright/test";

test.use({ storageState: "src/tests/e2e/.auth/user.json" });

test.describe("Customers", () => {
  test("exibe a página de clientes", async ({ page }) => {
    await page.goto("/dashboard/customers");
    await expect(page.getByRole("heading", { name: "Clientes" })).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Buscar clientes" }),
    ).toBeVisible();
  });

  test("exibe estado vazio quando não há clientes", async ({ page }) => {
    await page.goto("/dashboard/customers");
    // Busca inexistente para garantir estado vazio
    await page
      .getByRole("textbox", { name: "Buscar clientes" })
      .fill("xyzcliente99999");
    await expect(page.getByText(/nenhum cliente encontrado/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("campo de busca funciona", async ({ page }) => {
    await page.goto("/dashboard/customers");
    const searchInput = page.getByRole("textbox", { name: "Buscar clientes" });
    await searchInput.fill("Empresa");
    await expect(searchInput).toHaveValue("Empresa");
  });

  test("redireciona para login se não autenticado", async ({ browser }) => {
    const context = await browser.newContext({
      storageState: { cookies: [], origins: [] }, // ← contexto completamente limpo
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000/dashboard/customers");
    await expect(page).toHaveURL(/login/);
    await context.close();
  });
});
