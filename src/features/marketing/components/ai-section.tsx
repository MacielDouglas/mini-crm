"use client";

import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useScrollReveal } from "@/features/marketing/hooks/use-scroll-reveal";

const aiFeatures = [
  {
    title: "Lead Scoring automático",
    desc: "Score 0–100 baseado em cargo, empresa, valor estimado e histórico de interações. Sabe em segundos quem priorizar.",
  },
  {
    title: "Próxima ação sugerida",
    desc: 'Analisa o histórico e diz exatamente o que fazer: "Lead há 7 dias sem contato — envie follow-up com proposta atualizada."',
  },
  {
    title: "Resumo de cliente",
    desc: "Briefing em linguagem natural gerado antes de reuniões — contexto completo do relacionamento em dois parágrafos.",
  },
  {
    title: "Análise do pipeline",
    desc: "Lê o funil inteiro e explica em texto por que as conversões estão caindo e onde está o gargalo.",
  },
];

const sectionVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, damping: 28, stiffness: 200 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 20, scale: 0.97 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 26,
      stiffness: 160,
      delay: 0.2,
    },
  },
};

export default function AiSection() {
  const barRef = useRef<HTMLDivElement>(null);
  const { ref, controls } = useScrollReveal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && barRef.current) {
          barRef.current.style.width = "87%";
        }
      },
      { threshold: 0.3 },
    );
    if (barRef.current) observer.observe(barRef.current.parentElement!);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ai" className="py-[clamp(4rem,8vw,6rem)] px-6 bg-muted/30">
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        className="max-w-300 mx-auto grid grid-cols-2 gap-16 items-center max-md:grid-cols-1"
      >
        {/* Left */}
        <div>
          <motion.p
            variants={childVariants}
            className="text-xs font-bold uppercase tracking-widest text-primary mb-4"
          >
            Inteligência Artificial
          </motion.p>
          <motion.h2
            variants={childVariants}
            className="font-heading text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-normal leading-[1.15] tracking-tight mb-5"
          >
            IA que trabalha
            <br />
            enquanto você vende
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-base text-muted-foreground max-w-[52ch] leading-relaxed mb-8"
          >
            Alimentado pelo Groq (Llama 3.3 70B) — rápido, gratuito e integrado
            diretamente no fluxo de trabalho.
          </motion.p>
          <div className="flex flex-col gap-5">
            {aiFeatures.map(({ title, desc }) => (
              <motion.div
                key={title}
                variants={childVariants}
                className="flex gap-4 items-start"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold mb-1">{title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — Score card */}
        <motion.div
          variants={cardVariants}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl shadow-primary/8"
        >
          <div className="px-5 py-4 border-b border-border flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Lead Score
            </span>
            <span className="bg-primary/15 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-widest">
              GROQ AI
            </span>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-3 mb-4">
              <span className="font-heading text-[clamp(3rem,6vw,4.5rem)] leading-none text-primary">
                87
              </span>
              <div className="mb-2">
                <div className="text-xs text-muted-foreground">
                  Pontuação de propensão
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  ● Lead Quente
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-full h-2 mb-5 overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-primary rounded-full w-0 transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed bg-muted rounded-2xl p-3 mb-4">
              Lead com perfil decisor (CTO), empresa de médio porte com budget
              confirmado e 3 interações recentes. Alto engajamento.
            </div>
            <div className="flex gap-3 items-start bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-3">
              <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground block mb-0.5">
                  Próxima ação sugerida
                </strong>
                Agende demonstração técnica. Lead demonstrou interesse em
                integração com ERP — prepare caso de uso específico.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
