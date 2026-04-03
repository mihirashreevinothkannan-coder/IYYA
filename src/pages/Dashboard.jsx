import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Settings, Activity } from 'lucide-react';
import { getAiResponse } from '../utils/ai';

export default function Dashboard() {
  const [userName, setUserName] = useState('Friend');
  const [isListening, setIsListening] = useState(false);
  const [feedbackText, setFeedbackText] = useState("Tap to speak");
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setFeedbackText("Listening globally...");
      };

      recognition.onresult = async (event) => {
        setIsListening(false);
        const transcript = event.results[0][0].transcript;
        setFeedbackText(`Analyzing: "${transcript}"`);
        
        try {
          const aiText = await getAiResponse(transcript);
          setFeedbackText(aiText);
          speak(aiText);
        } catch (error) {
          console.error(error);
          setFeedbackText("Neural link disrupted. Try again.");
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setFeedbackText("Signal lost.");
      };

      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    } else {
      setFeedbackText("Browser incompatible with Voice Engine.");
    }
  }, []);

  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0; 
    utterance.pitch = 1.1; 
    synthRef.current.speak(utterance);
  };

  const toggleListen = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      synthRef.current?.cancel(); 
      try { recognitionRef.current.start(); } catch(e) {}
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col h-full pt-16 pb-32"
    >
      <header className="mb-12 text-center px-4 flex-none">
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Iyya <span className="text-blue-500">Core</span></h1>
        <p className="text-lg text-slate-400 font-medium">Welcome back, {userName}.</p>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center -mt-8">
        
        <div className="relative mb-12">
          {/* Advanced Glow Animations */}
          {isListening && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-500 rounded-full blur-2xl pointer-events-none"
              />
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 bg-indigo-500 rounded-full blur-xl pointer-events-none"
              />
            </>
          )}
          
          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListen}
            className={`relative z-10 w-40 h-40 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${
              isListening ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-blue-500/50' : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            {isListening ? <Activity size={64} className="animate-pulse" /> : <Mic size={64} className="text-slate-300" />}
          </motion.button>
        </div>
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-center max-w-sm w-full mx-4 shadow-xl">
           <p className={`text-lg font-medium transition-all ${isListening ? 'text-blue-400' : 'text-slate-300'}`}>
            {feedbackText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
