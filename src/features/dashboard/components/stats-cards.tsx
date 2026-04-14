import { Users, TrendingUp, DollarSign, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface StatsCardsProps {
  totalLeads: number;
  wonLeads: number;
  conversionRate: number;
  pipelineValue: number;
}

export function StatsCards({
  totalLeads,
  wonLeads,
  conversionRate,
  pipelineValue,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Leads Ativos",
      value: totalLeads,
      icon: Users,
      description: "no pipeline atual",
      format: "number",
    },
    {
      title: "Leads Ganhos",
      value: wonLeads,
      icon: Target,
      description: "negócios fechados",
      format: "number",
    },
    {
      title: "Taxa de Conversão",
      value: conversionRate,
      icon: TrendingUp,
      description: "do total de leads",
      format: "percent",
    },
    {
      title: "Valor do Pipeline",
      value: pipelineValue,
      icon: DollarSign,
      description: "valor estimado total",
      format: "currency",
    },
  ];

  function formatValue(value: number, format: string) {
    if (format === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        notation: "compact",
      }).format(value);
    }
    if (format === "percent") return `${value}%`;
    return value.toLocaleString("pt-BR");
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums">
              {formatValue(stat.value, stat.format)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
