import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAiResponse } from '../utils/ai';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am Iyya, your assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    // Call AI
    const aiText = await getAiResponse(userMsg.text);
    
    setIsLoading(false);
    setMessages((prev) => [
      ...prev, 
      { id: Date.now()+1, sender: 'bot', text: aiText }
    ]);
  };

  return (
    <div className="pt-16 pb-20 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 px-2">Ask For Help</h1>
      
      <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-4 px-2">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-70">
                {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                <span className="text-xs font-medium">
                  {msg.sender === 'bot' ? 'Assistant' : 'You'}
                </span>
              </div>
              <p className="text-lg leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm w-20 flex gap-1 justify-center items-center">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSend} className="relative mt-auto px-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="w-full pl-6 pr-14 py-4 text-lg border-2 border-slate-200 rounded-full focus:border-blue-400 focus:outline-none shadow-sm"
        />
        <button 
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          <Send size={20} className={`ml-1 ${isLoading ? 'opacity-50' : ''}`} />
        </button>
      </form>
    </div>
  );
}
