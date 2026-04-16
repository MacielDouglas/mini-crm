export default function Mockup() {
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
      color: "text-amber-600 dark:text-amber-400",
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
      color: "text-amber-600 dark:text-amber-400",
    },
  ];
  const cols = ["Prospecção", "Qualificação", "Proposta", "Fechado"];

  return (
    <div className="max-w-300 mx-auto px-6 pb-[clamp(4rem,8vw,6rem)]">
      <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Window bar */}
        <div className="h-11 bg-muted border-b border-border flex items-center px-5 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        <div className="p-5 grid grid-cols-[200px_1fr] gap-4 min-h-85 max-sm:grid-cols-1">
          {/* Sidebar */}
          <div className="bg-muted rounded-xl p-3 flex flex-col gap-1">
            <div className="flex items-center gap-2 p-2 mb-2">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
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
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}
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
                <div key={l} className="bg-muted rounded-lg p-3">
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

            {/* Kanban */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Pipeline de Vendas</span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                IA ATIVA
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
              {cols.map((col, i) => (
                <div key={col} className="bg-muted rounded-lg p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-2 flex justify-between">
                    {col}{" "}
                    <span className="bg-accent text-muted-foreground px-1.5 rounded-full">
                      {i === 0 ? 4 : i === 1 ? 3 : i === 2 ? 2 : 5}
                    </span>
                  </div>
                  <div className="bg-card border border-border rounded p-2">
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
    </div>
  );
}
