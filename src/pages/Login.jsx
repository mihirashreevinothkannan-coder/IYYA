import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-sm text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30 rotate-12">
           <Fingerprint className="text-white -rotate-12" size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Iyya Secure</h1>
        <p className="text-slate-400 mb-10 text-lg">Authenticate to continue.</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Access Designation..."
              className="w-full px-6 py-5 text-center text-lg border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 bg-black/40 text-white placeholder-slate-600 shadow-inner transition-all font-medium"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full py-5 text-lg font-bold text-white bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-500 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            Initialize Environment
          </button>
        </form>
      </motion.div>
    </div>
  );
}
