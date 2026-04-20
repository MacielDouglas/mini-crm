export function Hero() {
  return (
    <section className="relative pt-[clamp(100px,15vw,160px)] pb-[clamp(64px,10vw,96px)] px-6 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[clamp(400px,80vw,900px)] h-[clamp(300px,60vw,700px)] rounded-full bg-primary/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-240 mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-xs font-semibold px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Projeto Open Source
        </div>

        <h1 className="font-display text-[clamp(2.8rem,1rem+6vw,6rem)] font-normal text-foreground leading-[1.1] tracking-[-0.02em] mb-6">
          CRM inteligente
          <br />
          para fechar <em className="italic text-primary">mais negócios</em>
        </h1>

        <p className="text-[clamp(1.125rem,1rem+0.75vw,1.5rem)] text-muted-foreground max-w-[56ch] mx-auto mb-10 leading-[1.7]">
          Pipeline Kanban, timeline de interações e IA que pontua seus leads
          automaticamente — tudo num sistema moderno, rápido e 100% responsivo.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://github.com/MacielDouglas/mini-crm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Ver no GitHub
          </a>

          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-base font-semibold border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
          >
            Explorar funcionalidades
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
          {[
            { val: "Next.js 16", label: "Framework" },
            { val: "Groq AI", label: "Lead Scoring" },
            { val: "PostgreSQL", label: "Full-text Search" },
            { val: "100%", label: "Responsivo" },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-8">
              <div className="text-center">
                <span className="font-display text-[clamp(1.5rem,1.2rem+1.25vw,2.25rem)] font-normal text-foreground block">
                  {s.val}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-[0.08em]">
                  {s.label}
                </span>
              </div>
              {i < arr.length - 1 && <div className="w-px h-10 bg-border" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
