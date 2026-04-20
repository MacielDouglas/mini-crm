import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-300 mx-auto flex items-center justify-between gap-6 flex-wrap">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
          <div className="flex items-center gap-3 text-base font-bold ">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="var(--color-primary)" />
              <path
                d="M8 20V10l6 5 6-5v10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="14" cy="9" r="2" fill="white" />
            </svg>
            NexusCRM
          </div>
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
