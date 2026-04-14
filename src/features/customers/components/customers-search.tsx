"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useDebouncedCallback } from "@/shared/hooks/use-debounced-callback";

export function CustomersSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, 400);

  const hasSearch = searchParams.has("search");

  return (
    <div className="flex items-center gap-2 max-w-sm">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          aria-hidden
        />
        <Input
          placeholder="Buscar por nome, e-mail ou empresa..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9"
          aria-label="Buscar clientes"
        />
      </div>
      {hasSearch && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(pathname)}
          aria-label="Limpar busca"
        >
          <X className="size-4" aria-hidden />
        </Button>
      )}
    </div>
  );
}
