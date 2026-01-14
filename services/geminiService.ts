import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeShiftImage = async (base64Image: string): Promise<Partial<{
  normalWorkDays: number;
  overnightWorkDays: number;
  compLeaveDays: number;
  extraLeaveDays: number;
}>> => {
  try {
    // Ensure clean base64 string
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
          { text: "Analyze this work shift schedule image. I need you to count the days. Return a JSON object with these exact keys and integer values: 'normalWorkDays' (count of normal/day shifts), 'overnightWorkDays' (count of overnight/night shifts), 'compLeaveDays' (count of compensation leave), 'extraLeaveDays' (count of extra leave). If you cannot find a specific type, set it to 0. Do not wrap in markdown code blocks." }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return {};
    
    // Clean potential markdown just in case
    const cleanText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
};