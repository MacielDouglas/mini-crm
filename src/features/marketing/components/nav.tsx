"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/utils";
import { GithubIcon } from "../../../shared/components/icons/github-icon";

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-300",
        scrolled && "bg-background/80 backdrop-blur-md border-b border-border",
      )}
    >
      <div className="max-w-300 mx-auto w-full flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-bold text-base">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
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
          NexusCRM
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            ["#features", "Funcionalidades"],
            ["#ai", "IA"],
            ["#stack", "Stack"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Alternar tema"
              className="w-9 h-9"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button size="sm" asChild>
            <a
              href="https://github.com/seu-usuario/mini-crm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon width={16} height={16} />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
