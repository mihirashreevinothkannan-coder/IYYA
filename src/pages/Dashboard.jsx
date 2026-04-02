import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Youtube, MessageCircle, Play } from 'lucide-react';

export default function Dashboard() {
  const [userName, setUserName] = useState('Friend');
  const [isListening, setIsListening] = useState(false);
  const [feedbackText, setFeedbackText] = useState("Tap the microphone to speak");

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name);
  }, []);

  const toggleListen = () => {
    if (!isListening) {
      setIsListening(true);
      setFeedbackText("Listening... (e.g. 'Call Mary' or 'Play Music')");
      
      // Mock listening timeout
      setTimeout(() => {
        setIsListening(false);
        setFeedbackText("I'm sorry, I didn't catch that. Please try again.");
      }, 5000);
    } else {
      setIsListening(false);
      setFeedbackText("Tap the microphone to speak");
    }
  };

  return (
    <div className="flex flex-col h-full pt-12 pb-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Hello, {userName}!</h1>
        <p className="text-xl text-slate-600 font-medium">How can I help you today?</p>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Central glowing microphone */}
        <div className="relative mb-8">
          {isListening && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-blue-400 rounded-full blur-xl"
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListen}
            className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center text-white shadow-2xl transition-colors ${
              isListening ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {isListening ? <MicOff size={64} /> : <Mic size={64} />}
          </motion.button>
        </div>
        
        <p className="text-xl font-medium text-slate-700 h-16 text-center max-w-xs transition-all">
          {feedbackText}
        </p>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-md active:bg-slate-50 transition-colors">
          <Youtube className="text-red-500 mb-2" size={36} />
          <span className="text-lg font-semibold">Watch Video</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-md active:bg-slate-50 transition-colors">
          <MessageCircle className="text-green-500 mb-2" size={36} />
          <span className="text-lg font-semibold">WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
