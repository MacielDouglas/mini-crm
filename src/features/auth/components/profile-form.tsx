"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Building2, ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Separator } from "@/shared/components/ui/separator";
import { updateProfile } from "../actions/update-profile";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

type ProfileSchema = z.infer<typeof profileSchema>;

const roleLabels: Record<string, string> = {
  OWNER: "Proprietário",
  ADMIN: "Administrador",
  MEMBER: "Membro",
};

interface ProfileFormProps {
  user: { id: string; name: string; email: string; image: string | null };
  organizationName: string;
  role: string;
}

export function ProfileForm({
  user,
  organizationName,
  role,
}: ProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name },
  });

  function onSubmit(data: ProfileSchema) {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const result = await updateProfile(data);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      {/* Info da organização */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Building2 className="size-5 text-primary" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-medium">{organizationName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck
                  className="size-3.5 text-muted-foreground"
                  aria-hidden
                />
                <Badge variant="secondary" className="text-xs h-auto py-0">
                  {roleLabels[role] ?? role}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados do perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados pessoais</CardTitle>
          <CardDescription>Atualize seu nome de exibição</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator />

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
                Perfil atualizado com sucesso!
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="profile-name">Nome</Label>
              <Input
                id="profile-name"
                placeholder="Seu nome"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">E-mail</Label>
              <Input
                id="profile-email"
                type="email"
                value={user.email}
                disabled
                className="opacity-60"
              />
              <p className="text-xs text-muted-foreground">
                E-mail não pode ser alterado
              </p>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending && (
                <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
              )}
              {isPending ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
