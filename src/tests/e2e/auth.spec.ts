import { test, expect } from "@playwright/test";

test.describe("Autenticação", () => {
  test("exibe a página de login", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/mini.crm/i);
    await expect(page.getByRole("textbox", { name: "E-mail" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Senha" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Criar conta" })).toBeVisible();
  });

  test("exibe erro com credenciais inválidas", async ({ page }) => {
    await page.goto("/login");
    await page
      .getByRole("textbox", { name: "E-mail" })
      .fill("usuario@invalido.com");
    await page.getByRole("textbox", { name: "Senha" }).fill("senhaerrada123");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page.getByText(/e-mail ou senha incorretos/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("redireciona para login ao acessar rota protegida", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/login/);
  });

  test("navega para a página de cadastro", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Criar conta" }).click();
    await expect(page).toHaveURL(/register/);
    await expect(page.getByRole("textbox", { name: "E-mail" })).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Senha", exact: true }),
    ).toBeVisible(); // ← exact: true
    await expect(
      page.getByRole("textbox", { name: "Confirmar senha" }),
    ).toBeVisible(); // ← bônus
  });
});

// import { test, expect } from "@playwright/test";

// test.describe("Autenticação", () => {
//   test("exibe a página de login", async ({ page }) => {
//     await page.goto("/login");
//     await expect(page).toHaveTitle(/mini.crm/i);
//     // Heading real é "Entrar" mas como h1/h2 — ajuste para o que aparece na screenshot
//     await expect(page.getByText("Entrar").first()).toBeVisible();
//     await expect(page.getByLabel(/e-mail/i)).toBeVisible();
//     await expect(page.getByLabel(/senha/i)).toBeVisible();
//     await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
//   });

//   test("exibe erro com credenciais inválidas", async ({ page }) => {
//     await page.goto("/login");
//     await page.getByLabel(/e-mail/i).fill("usuario@invalido.com");
//     await page.getByLabel(/senha/i).fill("senhaerrada123");
//     await page.getByRole("button", { name: "Entrar" }).click();
//     await expect(page.getByText(/e-mail ou senha incorretos/i)).toBeVisible({
//       timeout: 5000,
//     });
//   });

//   test("redireciona para login ao acessar rota protegida", async ({ page }) => {
//     await page.goto("/dashboard");
//     await expect(page).toHaveURL(/login/); // ← /login, não /sign-in
//   });

//   test("exibe a página de cadastro", async ({ page }) => {
//     await page.goto("/sign-up");
//     // Inspecione os labels reais — ajuste conforme o formulário
//     await expect(page.getByLabel(/nome completo|seu nome/i)).toBeVisible();
//     await expect(page.getByLabel(/e-mail/i)).toBeVisible();
//     await expect(page.getByLabel(/senha/i).first()).toBeVisible();
//   });

//   test("valida campos obrigatórios no cadastro", async ({ page }) => {
//     await page.goto("/sign-up");
//     // Verifique o texto exato do botão no formulário de cadastro
//     await page
//       .getByRole("button", { name: /criar conta|registrar|cadastrar|sign up/i })
//       .click();
//     await expect(
//       page.getByText(/obrigatório|deve ter|caracteres/i).first(),
//     ).toBeVisible({ timeout: 3000 });
//   });
// });
