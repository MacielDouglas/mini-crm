"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/utils";
import { GithubIcon } from "../../../shared/components/icons/github-icon";

export default function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
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
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="max-w-300 mx-auto w-full flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
          <div className="flex items-center gap-3 text-base font-bold ">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="var(--color-primary)" />
              <path
                d="M8 20V10l6 5 6-5v10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="14" cy="9" r="2" fill="white" />
            </svg>
            NexusCRM
          </div>
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
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Alternar tema"
                className="w-9 h-9 rounded-xl"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm" className="rounded-xl" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button
            size="sm"
            className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-4"
            asChild
          >
            <a
              href="https://github.com/MacielDouglas/mini-crm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon width={15} height={15} />
              Ver no GitHub
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
