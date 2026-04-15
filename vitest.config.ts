import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/e2e/**", // ← exclui testes do Playwright
      "**/*.spec.ts", // ← exclui arquivos .spec.ts
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
