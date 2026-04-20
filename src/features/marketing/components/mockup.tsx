"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

const reveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 28,
      stiffness: 160,
      delay: 0.1,
    },
  },
};

export default function Mockup() {
  const { ref, controls } = useScrollReveal();

  const leads = [
    {
      name: "Ana Beatriz",
      company: "TechCorp",
      score: 87,
      value: "R$45k",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "Carlos M.",
      company: "StartupX",
      score: 61,
      value: "R$18k",
      color: "text-amber-500 dark:text-amber-400",
    },
    {
      name: "Fernanda S.",
      company: "Grupo Alpha",
      score: 92,
      value: "R$80k",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "Ricardo L.",
      company: "Beta Ltd.",
      score: 74,
      value: "R$32k",
      color: "text-amber-500 dark:text-amber-400",
    },
  ];
  const cols = ["Prospecção", "Qualificação", "Proposta", "Fechado"];

  return (
    <motion.div
      ref={ref}
      variants={reveal}
      initial="hidden"
      animate={controls}
      className="max-w-300 mx-auto px-6 pb-[clamp(4rem,8vw,6rem)]"
    >
      <div className="rounded-3xl border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Window bar */}
        <div className="h-11 bg-muted border-b border-border flex items-center px-5 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-3 h-5 w-45 rounded-lg bg-background/60 border border-border flex items-center justify-center">
            <span className="text-[10px] text-muted-foreground">
              nexuscrm.vercel.app
            </span>
          </div>
        </div>

        <div className="p-5 grid grid-cols-[200px_1fr] gap-4 min-h-85 max-sm:grid-cols-1">
          {/* Sidebar */}
          <div className="bg-muted rounded-2xl p-3 flex flex-col gap-1">
            <div className="flex items-center gap-2 p-2 mb-2">
              <div className="w-7 h-7 rounded-xl bg-primary flex items-center justify-center shadow-sm shadow-primary/30">
                <svg width="12" height="12" viewBox="0 0 28 28" fill="none">
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
              <span className="text-sm font-bold">NexusCRM</span>
            </div>
            {[
              ["Pipeline", true],
              ["Leads", false],
              ["Dashboard", false],
              ["IA", false],
            ].map(([label, active]) => (
              <div
                key={String(label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex flex-col gap-3">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-2">
              {[
                ["48", "Leads ativos", "↑ 12%"],
                ["R$142k", "Valor no funil", "↑ 8%"],
                ["34%", "Conversão", "↑ 3pp"],
              ].map(([v, l, d]) => (
                <div key={l} className="bg-muted rounded-2xl p-3">
                  <div className="text-base font-bold tabular-nums">{v}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {l}
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {d}
                  </div>
                </div>
              ))}
            </div>

            {/* Kanban header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Pipeline de Vendas</span>
              <span className="bg-primary/15 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                IA ATIVA
              </span>
            </div>

            {/* Kanban columns */}
            <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
              {cols.map((col, i) => (
                <div key={col} className="bg-muted rounded-2xl p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-2 flex justify-between items-center">
                    <span>{col}</span>
                    <span className="bg-accent text-muted-foreground px-1.5 rounded-full">
                      {[4, 3, 2, 5][i]}
                    </span>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-2">
                    <div className="text-[11px] font-semibold">
                      {leads[i].name}
                    </div>
                    <div className="text-[10px] text-muted-foreground mb-1.5">
                      {leads[i].company}
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-[10px] font-bold ${leads[i].color}`}
                      >
                        ⬤ {leads[i].score}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {leads[i].value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
