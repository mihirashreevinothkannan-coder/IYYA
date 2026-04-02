import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
// Note: In a production app, the AI call should be proxied through a backend
// to avoid exposing the API key in the browser.
let ai = null;

try {
  ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
} catch (error) {
  console.error("Failed to initialize GenAI", error);
}

const SYSTEM_PROMPT = `
You are a caring, highly empathetic, and simple-to-understand virtual assistant for an elderly person.
Your name is Iyya. 
Keep your responses very short, clear, and easy to read. 
Do not use technical jargon. 
Always be polite, patient, and warm. 
If they ask you to perform an action (like calling someone or playing a video), say something confirming and helpful.
`;

export const getAiResponse = async (userMessage) => {
  if (!ai) return "I'm having trouble connecting right now, dear. Let's try again later.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, I'm having a little trouble thinking right now. Please try again.";
  }
};
