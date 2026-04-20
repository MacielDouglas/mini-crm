"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { GithubIcon } from "@/shared/components/icons/github-icon";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 26, stiffness: 180 },
  },
};

export function Hero() {
  return (
    <section className="relative pt-[clamp(100px,15vw,160px)] pb-[clamp(4rem,10vw,6rem)] px-6 text-center overflow-hidden">
      {/* Dot pattern */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-60" />

      {/* Radial mask sobre o pattern para fade nas bordas */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--color-background)_100%)]" />

      {/* Glow central */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[min(700px,80vw)] h-[min(500px,50vw)] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-240 mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 border border-primary/30 bg-primary/8 backdrop-blur-sm rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Projeto Open Source
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="font-heading text-[clamp(3rem,1rem+7vw,7.5rem)] font-normal leading-[1.05] tracking-tight text-foreground mb-8"
        >
          CRM inteligente para <br className="hidden sm:block" />
          <span className="italic text-primary">fechar mais negócios</span>
        </motion.h1>

        {/* Descrição */}
        <motion.p
          variants={item}
          className="text-base text-muted-foreground max-w-[52ch] mx-auto mb-10 leading-relaxed"
        >
          Pipeline Kanban, timeline de interações e IA que pontua seus leads
          automaticamente — tudo num sistema moderno, rápido e 100% responsivo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <Button
            size="lg"
            className="rounded-2xl gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 px-6"
            asChild
          >
            <a
              href="https://github.com/seu-usuario/mini-crm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon width={16} height={16} />
              Ver no GitHub
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl gap-2 border-border/60 px-6"
            asChild
          >
            <a href="#features">
              Explorar funcionalidades
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-8 mt-16 flex-wrap"
        >
          {[
            ["Next.js 15", "Framework"],
            ["Groq AI", "Lead Scoring"],
            ["PostgreSQL", "Full-text Search"],
            ["100%", "Responsivo"],
          ].map(([val, label], i, arr) => (
            <div key={label} className="flex items-center gap-8">
              <div className="text-center">
                <span className="block text-xl font-bold text-foreground tabular-nums">
                  {val}
                </span>
                <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
                  {label}
                </span>
              </div>
              {i < arr.length - 1 && <div className="w-px h-10 bg-border" />}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
