"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, UserMinus, Shield, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Separator } from "@/shared/components/ui/separator";
import { inviteMember } from "../actions/invite-member";
import { removeMember } from "../actions/remove-member";

const inviteSchema = z.object({
  email: z.string().email("E-mail inválido"),
  role: z.enum(["ADMIN", "MEMBER"]),
});

type InviteData = z.infer<typeof inviteSchema>;

interface Member {
  id: string;
  role: string;
  user: { id: string; name: string; email: string; image: string | null };
}

interface MembersListProps {
  organizationId: string;
  members: Member[];
  currentUserId: string;
}

export function MembersList({
  organizationId,
  members,
  currentUserId,
}: MembersListProps) {
  const [isPending, startTransition] = useTransition();
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InviteData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { role: "MEMBER" },
  });

  function onInvite(data: InviteData) {
    setInviteError(null);
    setInviteSuccess(false);
    startTransition(async () => {
      const result = await inviteMember(organizationId, data);
      if (result?.error) {
        setInviteError(result.error);
      } else {
        setInviteSuccess(true);
        reset();
      }
    });
  }

  function handleRemove(memberId: string) {
    startTransition(async () => {
      await removeMember(memberId, currentUserId);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membros da equipe</CardTitle>
        <CardDescription>
          Gerencie quem tem acesso à sua organização
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Lista de membros */}
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="size-9 shrink-0">
                  <AvatarFallback>
                    {member.user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {member.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {member.role === "ADMIN" ? (
                    <Shield className="size-3" aria-hidden />
                  ) : (
                    <User className="size-3" aria-hidden />
                  )}
                  {member.role === "ADMIN" ? "Admin" : "Membro"}
                </div>

                {member.user.id !== currentUserId && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        aria-label={`Remover ${member.user.name}`}
                      >
                        <UserMinus className="size-4" aria-hidden />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover membro</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover{" "}
                          <strong>{member.user.name}</strong> da organização?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemove(member.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Convidar novo membro */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Convidar membro</p>

          {inviteError && (
            <div
              role="alert"
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {inviteError}
            </div>
          )}
          {inviteSuccess && (
            <div
              role="status"
              className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-600"
            >
              Membro adicionado com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit(onInvite)} className="flex gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="invite-email" className="sr-only">
                E-mail
              </Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="email@exemplo.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Select
              defaultValue="MEMBER"
              onValueChange={(v) => setValue("role", v as "ADMIN" | "MEMBER")}
            >
              <SelectTrigger className="w-28 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">Membro</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" disabled={isPending} className="shrink-0">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                "Convidar"
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
