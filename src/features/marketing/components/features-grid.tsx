import {
  LayoutGrid,
  PenLine,
  Search,
  BarChart2,
  Download,
  Users,
} from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Pipeline Kanban",
    desc: "Arraste leads entre etapas do funil. Visualize volume e valor de cada fase em tempo real, sem recarregar a página.",
  },
  {
    icon: PenLine,
    title: "Timeline de Interações",
    desc: "Registre notas, reuniões e e-mails. O histórico completo de cada cliente em ordem cronológica, sempre acessível.",
  },
  {
    icon: Search,
    title: "Busca Full-Text",
    desc: "Pesquisa avançada com índice PostgreSQL. Encontre qualquer lead por nome, empresa, cargo ou nota em milissegundos.",
  },
  {
    icon: BarChart2,
    title: "Dashboard com KPIs",
    desc: "Taxa de conversão por etapa, ticket médio, leads por origem. Métricas que mostram onde o funil está vazando.",
  },
  {
    icon: Download,
    title: "Exportação CSV/PDF",
    desc: "Exporte qualquer lista de leads ou relatório com um clique. Compatível com Excel, Google Sheets e ferramentas de BI.",
  },
  {
    icon: Users,
    title: "Multi-usuário",
    desc: "Autenticação completa com convite de membros. Controle de acesso por organização — cada time vê apenas seus dados.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-[clamp(4rem,8vw,6rem)] px-6">
      <div className="max-w-300 mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Funcionalidades
        </p>
        <h2 className="font-heading text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-normal leading-[1.15] tracking-tight mb-5">
          Tudo que uma equipe
          <br />
          de vendas precisa
        </h2>
        <p className="text-base text-muted-foreground max-w-[52ch] leading-relaxed">
          Do primeiro contato ao fechamento — com IA que aprende com cada
          interação e sugere o próximo passo certo.
        </p>

        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-xl p-7 hover:shadow-md hover:border-primary/30 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
