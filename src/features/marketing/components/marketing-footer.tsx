export function MarketingFooter() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="max-w-300 mx-auto flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-2 font-bold text-sm text-foreground">
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" className="fill-primary" />
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

        <p className="text-xs text-muted-foreground">
          Projeto open source — Next.js · Prisma · Groq AI
        </p>

        <div className="flex gap-6">
          <a
            href="https://github.com/MacielDouglas/mini-crm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentação
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Licença MIT
          </a>
        </div>
      </div>
    </footer>
  );
}
