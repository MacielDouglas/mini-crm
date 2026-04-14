"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { useDebouncedCallback } from "../../../shared/hooks/use-debounced-callback";

interface LeadsFiltersProps {
  stages: { id: string; name: string }[];
}

export function LeadsFilters({ stages }: LeadsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    updateParam("search", value);
  }, 400);

  const hasFilters = searchParams.has("search") || searchParams.has("stageId");

  return (
    <div className="flex flex-col sm:flex-row gap-3">
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
          aria-label="Buscar leads"
        />
      </div>

      <Select
        defaultValue={searchParams.get("stageId") ?? "all"}
        onValueChange={(v) => updateParam("stageId", v === "all" ? "" : v)}
      >
        <SelectTrigger
          className="w-full sm:w-48"
          aria-label="Filtrar por estágio"
        >
          <SelectValue placeholder="Todos os estágios" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os estágios</SelectItem>
          {stages.map((stage) => (
            <SelectItem key={stage.id} value={stage.id}>
              {stage.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          onClick={() => router.push(pathname)}
          aria-label="Limpar filtros"
        >
          <X className="size-4 mr-2" aria-hidden />
          Limpar
        </Button>
      )}
    </div>
  );
}
