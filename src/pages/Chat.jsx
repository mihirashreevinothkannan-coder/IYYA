import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAiResponse } from '../utils/ai';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Neural link established. How may I assist you?' }
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
    
    const aiText = await getAiResponse(userMsg.text);
    
    setIsLoading(false);
    setMessages((prev) => [...prev, { id: Date.now()+1, sender: 'bot', text: aiText }]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-16 pb-24 h-full flex flex-col"
    >
      <h1 className="text-3xl font-extrabold text-white mb-2 px-6">Terminal Chat</h1>
      <p className="text-slate-400 mb-6 px-6 text-sm">Direct text link to Gemini Core.</p>
      
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-6 pb-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-3xl p-5 shadow-lg backdrop-blur-md border ${
                msg.sender === 'user' 
                  ? 'bg-blue-600/20 border-blue-500/30 text-white rounded-tr-sm' 
                  : 'bg-white/5 border-white/5 text-slate-200 rounded-tl-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2 opacity-50">
                  {msg.sender === 'bot' ? <Bot size={14} className="text-emerald-400" /> : <User size={14} className="text-blue-400"/>}
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {msg.sender === 'bot' ? 'System AI' : 'User'}
                  </span>
                </div>
                <p className="text-base leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start px-2">
             <div className="bg-white/5 border border-white/5 rounded-3xl rounded-tl-sm p-5 flex gap-1.5 items-center w-24 justify-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </motion.div>
        )}
      </div>
      
      <form onSubmit={handleSend} className="relative mt-auto px-6">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Initialize command..."
            className="w-full pl-6 pr-16 py-5 text-base border border-white/10 rounded-2xl focus:border-emerald-500/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 bg-black/40 text-white placeholder-slate-600 shadow-inner transition-all"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            disabled={isLoading}
          >
            <Send size={18} className={`ml-0.5 ${isLoading ? 'opacity-50' : ''}`} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
