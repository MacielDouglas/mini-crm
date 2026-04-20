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
import type { NavItem } from "@/shared/types/nav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Leads", href: "/dashboard/leads", icon: Users },
  { title: "Pipeline", href: "/dashboard/pipeline", icon: Kanban },
  { title: "Clientes", href: "/dashboard/customers", icon: UserCheck },
  { title: "Configurações", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-16 lg:w-60 border-r bg-card h-dvh sticky top-0 shrink-0 transition-all duration-300"
      aria-label="Navegação principal"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-4 border-b shrink-0">
        <div className="flex items-center gap-2.5 font-bold text-base">
          <div className="w-8 h-8 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path
                d="M8 20V10l6 5 6-5v10"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="14" cy="9" r="2" fill="white" />
            </svg>
          </div>
          <p className="hidden lg:block">NexusCRM</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1" aria-label="Menu">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-2.5 text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="size-5 shrink-0" aria-hidden="true" />
                    <span className="hidden lg:block">{item.title}</span>
                    {item.badge ? (
                      <span className="hidden lg:flex ml-auto size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
