export default function Mockup() {
  const kpis = [
    { val: "48", label: "Leads ativos", delta: "↑ 12% mês" },
    { val: "R$142k", label: "Valor no funil", delta: "↑ 8% mês" },
    { val: "34%", label: "Taxa conversão", delta: "↑ 3pp mês" },
  ];

  const sidebarItems = [
    {
      label: "Pipeline",
      active: true,
      d: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    },
    {
      label: "Leads",
      active: false,
      d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    },
    { label: "Dashboard", active: false, d: "M18 20V10M12 20V4M6 20v-6" },
    {
      label: "IA",
      active: false,
      d: "M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14",
    },
  ];

  const kanban = [
    {
      stage: "Prospecção",
      count: 4,
      cards: [
        { name: "Ana Beatriz", co: "TechCorp", score: 87, val: "R$45k" },
        { name: "Carlos M.", co: "StartupX", score: 61, val: "R$18k" },
      ],
    },
    {
      stage: "Qualif.",
      count: 3,
      cards: [
        { name: "Fernanda S.", co: "Grupo Alpha", score: 92, val: "R$80k" },
      ],
    },
    {
      stage: "Proposta",
      count: 2,
      cards: [{ name: "Ricardo L.", co: "Beta Ltd.", score: 74, val: "R$32k" }],
    },
    {
      stage: "Fechado",
      count: 5,
      cards: [{ name: "Julia P.", co: "InovaS.A.", score: 95, val: "R$65k" }],
    },
  ];

  return (
    <div className="max-w-300 mx-auto px-6 pb-[clamp(64px,8vw,96px)]">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-11 bg-muted border-b border-border flex items-center px-5 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5 min-h-90">
          <div className="bg-background rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-2 mb-3">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M8 20V10l6 5 6-5v10"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold">NexusCRM</span>
            </div>

            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d={item.d} />
                </svg>
                {item.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              {kpis.map((k) => (
                <div key={k.label} className="bg-muted rounded-md px-4 py-3">
                  <div className="text-lg font-bold text-foreground tabular-nums">
                    {k.val}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                    {k.label}
                  </div>
                  <div className="text-[10px] text-green-500 font-semibold mt-0.5">
                    {k.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Pipeline de Vendas</span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                IA ATIVA
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kanban.map((col) => (
                <div key={col.stage} className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {col.stage}
                    </span>
                    <span className="bg-accent text-muted-foreground text-[9px] px-1.5 py-0.5 rounded-full">
                      {col.count}
                    </span>
                  </div>

                  {col.cards.map((card) => (
                    <div
                      key={card.name}
                      className="bg-card border border-border rounded-md p-3 mb-2 last:mb-0"
                    >
                      <div className="text-xs font-semibold text-foreground mb-1">
                        {card.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground mb-2">
                        {card.co}
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold ${
                            card.score >= 85
                              ? "text-green-500"
                              : card.score >= 65
                                ? "text-amber-500"
                                : "text-muted-foreground"
                          }`}
                        >
                          ⬤ {card.score}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {card.val}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
