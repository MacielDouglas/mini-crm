"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Kanban,
  UserCheck,
  Settings,
} from "lucide-react";
import { cn } from "@/shared/utils/utils";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Leads", href: "/dashboard/leads", icon: Users },
  { title: "Pipeline", href: "/dashboard/pipeline", icon: Kanban },
  { title: "Clientes", href: "/dashboard/customers", icon: UserCheck },
  { title: "Config", href: "/dashboard/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t h-16 flex items-center"
      aria-label="Navegação principal"
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon className="size-5 shrink-0" aria-hidden="true" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
