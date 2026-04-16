import { groq } from "@/shared/lib/groq";

interface LeadData {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  jobTitle: string | null;
  source: string;
  value: unknown;
  notes: string | null;
  status: string;
  stage: { name: string };
  interactions: { type: string; title: string; occurredAt: Date }[];
}

interface ScoreResult {
  score: number; // 0-100
  reason: string; // justificativa resumida
  nextAction: string; // próxima ação sugerida
}

export async function scoreLeadWithAI(lead: LeadData): Promise<ScoreResult> {
  const prompt = `
Você é um especialista em vendas B2B. Analise o lead abaixo e retorne um JSON com score de qualidade.

LEAD:
- Nome: ${lead.name}
- Empresa: ${lead.company ?? "Não informado"}
- Cargo: ${lead.jobTitle ?? "Não informado"}
- Email: ${lead.email ?? "Não informado"}
- Origem: ${lead.source}
- Valor estimado: ${lead.value ? `R$ ${Number(lead.value).toLocaleString("pt-BR")}` : "Não informado"}
- Estágio atual: ${lead.stage.name}
- Status: ${lead.status}
- Notas: ${lead.notes ?? "Nenhuma"}
- Interações: ${lead.interactions.length} registradas

Retorne APENAS um JSON válido, sem markdown, neste formato exato:
{
  "score": <número de 0 a 100>,
  "reason": "<justificativa em 1-2 frases>",
  "nextAction": "<próxima ação recomendada em 1 frase>"
}

Critérios para o score:
- 80-100: Lead quente, empresa conhecida, cargo decisor, alto valor, engajamento recente
- 60-79: Bom potencial, algumas informações faltando ou pouco engajamento
- 40-59: Lead morno, poucas informações, origem incerta
- 0-39: Lead frio, sem empresa, sem valor estimado, sem engajamento
`;

  const result = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", // ou "qwen/qwen3-32b" para mais quota
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
    max_tokens: 1024,
  });
  const text = result.choices[0].message.content?.trim() ?? "";

  // Remove markdown se o modelo retornar com ```json
  const clean = text
    .replace(/^```json\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  const parsed: ScoreResult = JSON.parse(clean);

  // Valida e normaliza
  return {
    score: Math.min(100, Math.max(0, Math.round(parsed.score))),
    reason: parsed.reason ?? "",
    nextAction: parsed.nextAction ?? "",
  };
}
