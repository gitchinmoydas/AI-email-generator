import { GoogleGenAI } from "@google/genai";

export const generateEmailTemplate = async (purpose, name, tone) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing");
  }

  // ✅ Explicitly pass API key (prevents ADC lookup)
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const prompt = `
Write a short, customer-friendly email.

Purpose: ${purpose}
Recipient Name: ${name}
Tone: ${tone}

Keep it concise and professional.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("🔥 GEMINI GENAI ERROR:", error.message || error);
    throw error;
  }
};
