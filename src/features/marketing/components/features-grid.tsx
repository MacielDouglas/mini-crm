const features = [
  {
    title: "Pipeline Kanban",
    desc: "Arraste leads entre etapas do funil. Visualize o volume e o valor de cada fase em tempo real, sem recarregar a página.",
    d: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  },
  {
    title: "Timeline de Interações",
    desc: "Registre notas, reuniões e e-mails. O histórico completo de cada cliente em ordem cronológica, sempre acessível.",
    d: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  },
  {
    title: "Busca Full-Text",
    desc: "Pesquisa avançada com índice PostgreSQL. Encontre qualquer lead por nome, empresa, cargo ou nota em milissegundos.",
    d: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  },
  {
    title: "Dashboard com KPIs",
    desc: "Taxa de conversão por etapa, ticket médio, leads por origem. Métricas que mostram onde o funil está vazando.",
    d: "M18 20V10M12 20V4M6 20v-6",
  },
  {
    title: "Exportação CSV/PDF",
    desc: "Exporte qualquer lista de leads ou relatório com um clique. Compatível com Excel, Google Sheets e ferramentas de BI.",
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  },
  {
    title: "Multi-usuário",
    desc: "Autenticação completa com convite de membros. Controle de acesso por organização — cada time vê apenas seus dados.",
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-[clamp(64px,8vw,96px)] px-6">
      <div className="max-w-300 mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Funcionalidades
        </p>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-normal text-foreground leading-[1.15] tracking-[-0.01em] mb-5">
          Tudo que uma equipe
          <br />
          de vendas precisa
        </h2>
        <p className="text-base text-muted-foreground max-w-[52ch] leading-[1.75]">
          Do primeiro contato ao fechamento — com IA que aprende com cada
          interação e sugere o próximo passo certo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-xl p-7 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-md text-primary mb-5">
                <svg
                  className="w-4.5 h-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d={f.d} />
                </svg>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
