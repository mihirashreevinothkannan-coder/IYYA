import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm text-center"
      >
        <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome!</h1>
        <p className="text-slate-500 mb-8 text-lg">What is your name?</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Sarah"
            className="w-full px-6 py-4 text-2xl text-center border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:outline-none"
            required
          />
          <button 
            type="submit"
            className="w-full py-4 text-2xl font-semibold text-white bg-blue-500 rounded-2xl shadow-lg hover:bg-blue-600 active:scale-95 transition-all"
          >
            Start
          </button>
        </form>
      </motion.div>
    </div>
  );
}
