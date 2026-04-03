const SYSTEM_PROMPT = `
You are a caring, highly empathetic, and simple-to-understand virtual assistant for an elderly person.
Your name is Iyya. 
Keep your responses very short, clear, and easy to read (max 2 sentences). 
Do not use technical jargon. 
Always be polite, patient, and warm. 
If they ask you to perform an action (like calling someone or playing a video), say something confirming and helpful.
`;

export const getAiResponse = async (userMessage) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return "I'm having trouble connecting right now, dear. Please set the API key.";

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: { text: SYSTEM_PROMPT }
        },
        contents: [
          { parts: [{ text: userMessage }] }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
        console.error("AI API Error:", data);
        return "I'm having a little trouble connecting to my brain right now.";
    }
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, I'm having a little trouble thinking right now. Please try again.";
  }
};
