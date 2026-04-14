"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Building2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  createOrganization,
  type CreateOrganizationSchema,
} from "../actions/create-organization";

const schema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  slug: z
    .string()
    .min(2, "Slug deve ter pelo menos 2 caracteres")
    .max(50, "Slug muito longo")
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
});

export function OnboardingForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateOrganizationSchema>({
    resolver: zodResolver(schema),
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    // Auto-gerar slug a partir do nome
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setValue("slug", slug, { shouldValidate: true });
  }

  function onSubmit(data: CreateOrganizationSchema) {
    setServerError(null);
    startTransition(async () => {
      const result = await createOrganization(data);
      if (result?.error) {
        setServerError(result.error);
      }
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-md bg-primary flex items-center justify-center">
            <Building2 className="size-5 text-primary-foreground" aria-hidden />
          </div>
          <div>
            <CardTitle className="text-xl">Criar sua organização</CardTitle>
            <CardDescription>
              Configure o espaço de trabalho da sua empresa
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
          {serverError && (
            <div
              role="alert"
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {serverError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome da empresa</Label>
            <Input
              id="name"
              type="text"
              placeholder="Acme Inc."
              autoComplete="organization"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name", { onChange: handleNameChange })}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug{" "}
              <span className="text-xs text-muted-foreground font-normal">
                (identificador único)
              </span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground shrink-0">
                minicrm.app/
              </span>
              <Input
                id="slug"
                type="text"
                placeholder="acme-inc"
                aria-invalid={!!errors.slug}
                aria-describedby={errors.slug ? "slug-error" : "slug-hint"}
                {...register("slug")}
              />
            </div>
            {errors.slug ? (
              <p id="slug-error" className="text-sm text-destructive">
                {errors.slug.message}
              </p>
            ) : (
              <p id="slug-hint" className="text-xs text-muted-foreground">
                Gerado automaticamente. Pode editar se quiser.
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            )}
            {isPending ? "Criando..." : "Criar organização"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
