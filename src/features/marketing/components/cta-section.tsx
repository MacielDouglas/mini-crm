export default function CtaSection() {
  return (
    <section className="py-[clamp(64px,8vw,96px)] px-6 text-center">
      <div className="max-w-300 mx-auto">
        <div className="relative bg-card border border-border rounded-2xl px-8 py-[clamp(40px,6vw,80px)] max-w-175 mx-auto overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.6_0.118_184.704/0.08)_0%,transparent_60%)] pointer-events-none" />

          <h2 className="relative font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-normal text-foreground tracking-[-0.01em] mb-4">
            Pronto para explorar o código?
          </h2>

          <p className="relative text-base text-muted-foreground mb-8 max-w-[46ch] mx-auto">
            Projeto open source com arquitetura limpa, multi-tenant e pronto
            para produção. Fork, clone e rode em minutos.
          </p>

          <div className="relative flex justify-center gap-4 flex-wrap">
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
              Ver funcionalidades
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
