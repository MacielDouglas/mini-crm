import {
  NextIcon,
  TypescriptIcon,
  PrismaIcon,
  NeonIcon,
  BunIcon,
  VercelIcon,
  TailwindIcon,
  ShadcnIcon,
  GroqIcon,
  GithubActionsIcon,
  PostgresqlIcon,
} from "@/shared/components/icons";
import type { SVGProps } from "react";

type StackItem = {
  name: string;
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
  url?: string;
};

const stack: StackItem[] = [
  { name: "Next.js 15", icon: <NextIcon width={16} height={16} /> },
  { name: "TypeScript", icon: <TypescriptIcon width={16} height={16} /> },
  { name: "Prisma ORM", icon: <PrismaIcon width={16} height={16} /> },
  { name: "PostgresSQL", icon: <PostgresqlIcon width={16} height={16} /> },
  // { name: "Prisma ORM", icon: <PrismaIcon width={16} height={16} /> },
  { name: "Bun", icon: <BunIcon width={16} height={16} /> },
  { name: "Neon DB", icon: <NeonIcon width={16} height={16} /> },
  { name: "Vercel", icon: <VercelIcon width={16} height={16} /> },
  { name: "Tailwind CSS", icon: <TailwindIcon width={16} height={16} /> },
  { name: "Shadcn/ui", icon: <ShadcnIcon width={16} height={16} /> },
  { name: "Groq AI", icon: <GroqIcon width={16} height={16} /> },
  {
    name: "Github Actions",
    icon: <GithubActionsIcon width={16} height={16} />,
  },
];

export default function StackSection() {
  return (
    <section
      id="stack"
      className="py-[clamp(4rem,8vw,6rem)] px-6 border-t border-border"
    >
      <div className="max-w-300 mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Stack Técnica
        </p>
        <h2 className="font-heading text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-normal leading-[1.15] tracking-tight mb-10">
          Construído com as
          <br />
          melhores ferramentas
        </h2>

        <div className="flex flex-wrap gap-3">
          {/* Ícones SVG locais */}
          {stack.map(({ name, icon }) => (
            <div
              key={name}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-default"
            >
              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                {icon}
              </span>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
