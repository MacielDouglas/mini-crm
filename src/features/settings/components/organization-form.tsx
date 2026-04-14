"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
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
import { updateOrganization } from "../actions/update-organization";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
});

type FormData = z.infer<typeof schema>;

interface OrganizationFormProps {
  organizationId: string;
  defaultValues: FormData;
}

export function OrganizationForm({
  organizationId,
  defaultValues,
}: OrganizationFormProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function onSubmit(data: FormData) {
    setSuccess(false);
    setError(null);
    startTransition(async () => {
      const result = await updateOrganization(organizationId, data);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organização</CardTitle>
        <CardDescription>
          Informações básicas da sua organização
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div
              role="alert"
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              role="status"
              className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-600"
            >
              Salvo com sucesso!
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="org-name">Nome</Label>
            <Input id="org-name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="org-slug">Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground shrink-0">
                minicrm.app/
              </span>
              <Input
                id="org-slug"
                {...register("slug")}
                className="lowercase"
                onChange={(e) => {
                  e.target.value = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  register("slug").onChange(e);
                }}
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-end border-t pt-4">
          <Button type="submit" disabled={isPending || !isDirty}>
            {isPending && (
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            )}
            {isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
