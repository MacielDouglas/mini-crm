"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { GithubIcon } from "../../../shared/components/icons/github-icon";

export function Hero() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = "87%";
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-[clamp(100px,15vw,160px)] pb-[clamp(4rem,10vw,6rem)] px-6 text-center overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(900px,80vw)] h-[min(600px,60vw)] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-240 mx-auto">
        <Badge
          variant="outline"
          className="mb-6 gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Projeto Open Source
        </Badge>

        <h1 className="font-heading text-[clamp(2.8rem,1rem+6vw,6rem)] font-normal leading-[1.1] tracking-tight text-foreground mb-6">
          CRM inteligente para
          <br />
          <span className="italic text-primary">fechar mais negócios</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-[56ch] mx-auto mb-10 leading-relaxed">
          Pipeline Kanban, timeline de interações e IA que pontua seus leads
          automaticamente — tudo num sistema moderno, rápido e 100% responsivo.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button size="lg" asChild>
            <a
              href="https://github.com/seu-usuario/mini-crm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon width={16} height={16} />
              Ver no GitHub
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#features">
              Explorar funcionalidades
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
          {[
            ["Next.js 15", "Framework"],
            ["Groq AI", "Lead Scoring"],
            ["PostgreSQL", "Full-text Search"],
            ["100%", "Responsivo"],
          ].map(([val, label], i, arr) => (
            <div key={label} className="flex items-center gap-8">
              <div className="text-center">
                <span className="block text-xl font-bold text-foreground">
                  {val}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  {label}
                </span>
              </div>
              {i < arr.length - 1 && <div className="w-px h-10 bg-border" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
