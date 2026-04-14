import { UserMenu } from "@/features/auth/components/user-menu";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">
      <h1 className="text-lg font-semibold">{title}</h1>
      <UserMenu />
    </header>
  );
}
