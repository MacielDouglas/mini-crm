import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

async function globalSetup() {
  const authDir = path.join("src/tests/e2e/.auth");
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");

  await page.getByRole("textbox", { name: "E-mail" }).fill("douglas@mail.com");
  await page.getByRole("textbox", { name: "Senha" }).fill("Teste1234");
  await page.getByRole("button", { name: "Entrar" }).click();

  // Aguarda o dashboard
  await page.waitForURL(/dashboard/, { timeout: 15000 });

  // ✅ Salva o estado de autenticação
  await page.context().storageState({ path: "src/tests/e2e/.auth/user.json" });

  console.log("user.json salvo com sucesso!");
  await browser.close();
}

export default globalSetup;
