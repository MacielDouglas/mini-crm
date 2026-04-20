import Link from "next/link";
import { Home } from "lucide-react";
import { UserMenu } from "@/features/auth/components/user-menu";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 shrink-0 w-full">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Voltar para Home"
          title="Voltar para Home"
        >
          <Home className="w-4 h-4" />
        </Link>

        <div className="w-px h-5 bg-border" />

        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <UserMenu />
    </header>
  );
}
