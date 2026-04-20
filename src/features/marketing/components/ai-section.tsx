const aiItems = [
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

export default function AiSection() {
  return (
    <section
      id="ai"
      className="py-[clamp(64px,8vw,96px)] px-6 bg-card border-t border-border"
    >
      <div className="max-w-300 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Inteligência Artificial
          </p>
          <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-normal text-foreground leading-[1.15] tracking-[-0.01em] mb-5">
            IA que trabalha
            <br />
            enquanto você vende
          </h2>
          <p className="text-base text-muted-foreground max-w-[52ch] leading-[1.75]">
            Alimentado pelo Groq (Llama 3.3 70B) — rápido, gratuito e integrado
            diretamente no fluxo de trabalho.
          </p>

          <div className="flex flex-col gap-5 mt-8">
            {aiItems.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Lead Score
            </span>
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
              GROQ AI
            </span>
          </div>

          <div className="p-5">
            <div className="flex items-end gap-3 mb-4">
              <span className="font-display text-[clamp(3rem,6vw,4.5rem)] font-normal text-primary leading-none">
                87
              </span>
              <div className="mb-2">
                <div className="text-xs text-muted-foreground mb-1">
                  Pontuação de propensão
                </div>
                <div className="text-[10px] text-green-500 font-semibold">
                  ● Lead Quente
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-full h-2 overflow-hidden mb-5">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "87%" }}
              />
            </div>

            <div className="text-xs text-muted-foreground leading-[1.7] px-4 py-3 bg-muted rounded-md mb-4">
              Lead com perfil decisor (CTO), empresa de médio porte com budget
              confirmado e 3 interações recentes. Alto engajamento.
            </div>

            <div className="flex gap-3 items-start bg-green-500/10 border border-green-500/20 rounded-md px-4 py-3">
              <svg
                className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <div>
                <strong className="block text-xs text-foreground mb-1">
                  Próxima ação sugerida
                </strong>
                <p className="text-xs text-muted-foreground leading-[1.6]">
                  Agende demonstração técnica. Lead demonstrou interesse em
                  integração com ERP — prepare caso de uso específico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
