import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY não definida no .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiFlash = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.4, // mais determinístico para análise de negócios
    maxOutputTokens: 1024,
  },
});

export const geminiFlashThinking = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp",
  generationConfig: {
    temperature: 0.6,
    maxOutputTokens: 2048,
  },
});
