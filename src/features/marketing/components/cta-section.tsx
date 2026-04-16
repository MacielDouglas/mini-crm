import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { GithubIcon } from "../../../shared/components/icons/github-icon";

export default function CtaSection() {
  return (
    <section className="py-[clamp(4rem,8vw,6rem)] px-6">
      <div className="max-w-175 mx-auto text-center">
        <div className="relative bg-card border border-border rounded-2xl p-[clamp(2.5rem,6vw,5rem)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.07)_0%,transparent_60%)] pointer-events-none" />
          <h2 className="font-heading text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-normal tracking-tight mb-4">
            Pronto para explorar o código?
          </h2>
          <p className="text-base text-muted-foreground mb-8 max-w-[46ch] mx-auto">
            Projeto open source com arquitetura limpa, multi-tenant e pronto
            para produção. Fork, clone e rode em minutos.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <a
                href="https://github.com/seu-usuario/mini-crm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon width={16} height={16} />
                Ver no GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">
                Ver funcionalidades
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
