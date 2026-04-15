import { describe, it, expect } from "vitest";
import { cn } from "@/shared/utils/utils";

describe("cn (className utility)", () => {
  it("combina classes simples", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("ignora valores falsy", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("resolve conflitos do Tailwind (último vence)", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("aceita objetos condicionais", () => {
    expect(cn({ "text-red-500": true, "text-blue-500": false })).toBe(
      "text-red-500",
    );
  });

  it("retorna string vazia sem argumentos", () => {
    expect(cn()).toBe("");
  });
});
