import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-300 mx-auto flex items-center justify-between gap-6 flex-wrap">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 28 28" fill="none">
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
          NexusCRM
        </Link>
        <p className="text-xs text-muted-foreground">
          Projeto open source — Next.js · Prisma · Groq AI
        </p>
        <div className="flex gap-6">
          {[
            ["https://github.com/seu-usuario/mini-crm", "GitHub"],
            ["#", "Documentação"],
            ["#", "Licença MIT"],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
