import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for the assistant
const SYSTEM_INSTRUCTION = `You are ShiftMaster AI, a helpful assistant for a work hour calculation app.
The user is likely a Taiwanese worker (police, fire, or civil servant) calculating overtime (超勤).
The rules are roughly:
- Normal work day adds 20 hours.
- Overnight work day adds 12 hours.
- Compensatory leave adds 12 hours (deducted elsewhere).
- Extra leave adds 0 hours.
- Hourly wage is typically around 182-200 TWD.
- There is a monthly cap for overtime pay (e.g., 19,000 TWD).

When analyzing images, look for shift tables, numbers, and salary slips.
When answering, be concise, helpful, and polite. Use Traditional Chinese (zh-TW).
`;

export const generateTextResponse = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[],
  useThinking: boolean = false
): Promise<string> => {
  try {
    const modelId = 'gemini-3-pro-preview';
    
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
    };

    if (useThinking) {
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    // Convert history to format expected by Chat (if we were using chat session), 
    // but here we are doing single turn for simplicity or maintaining own history context if needed.
    // For robust chat, we usually use ai.chats.create, but to support the specific "Thinking" toggle 
    // per message easily without complex session management, we'll use generateContent with history as context string or construct the messages manually.
    
    // However, the best practice for chat with history is ai.chats.create.
    // Let's use ai.models.generateContent for single turn deeply thinking or just standard chat via generateContent with message history if we manually manage it.
    // Given the request constraints and structure, let's use generateContent and pass the previous context as part of the content if needed, 
    // OR just use a chat session.
    // NOTE: 'thinkingConfig' is a generateContent config.

    // Let's stick to generateContent to ensure we can swap configs easily.
    const contents = [
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: prompt }] }
    ];

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: config
    });

    return response.text || "No response generated.";

  } catch (error) {
    console.error("Gemini Text Error:", error);
    return "抱歉，AI 暫時無法回應，請稍後再試。";
  }
};

export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming JPEG for simplicity from camera/upload
              data: base64Image
            }
          },
          {
            text: prompt || "請幫我分析這張圖片中的排班表或數據。"
          }
        ]
      },
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, // Use thinking for image analysis too as it might be complex
      }
    });

    return response.text || "無法分析圖片。";
  } catch (error) {
    console.error("Gemini Image Error:", error);
    return "圖片分析失敗，請確認 API Key 或網路連線。";
  }
};