import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Mic, Phone, Bot, PlayCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Media from './pages/Media';
import EmergencyButton from './components/EmergencyButton';

function Navigation() {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/10 backdrop-blur-xl border-t border-white/10 p-3 pb-8 rounded-t-[40px] z-50">
      <ul className="flex justify-around items-center px-4">
        <li>
          <Link to="/dashboard" className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/dashboard' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white'}`}>
            <Mic size={26} strokeWidth={location.pathname === '/dashboard' ? 2.5 : 2} />
            <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Voice</span>
          </Link>
        </li>
        <li>
          <Link to="/contacts" className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/contacts' ? 'bg-pink-500/20 text-pink-400' : 'text-slate-400 hover:text-white'}`}>
            <Phone size={26} strokeWidth={location.pathname === '/contacts' ? 2.5 : 2} />
            <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Connect</span>
          </Link>
        </li>
        <li>
          <Link to="/media" className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/media' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-white'}`}>
            <PlayCircle size={26} strokeWidth={location.pathname === '/media' ? 2.5 : 2} />
            <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Media</span>
          </Link>
        </li>
        <li>
          <Link to="/chat" className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/chat' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
            <Bot size={26} strokeWidth={location.pathname === '/chat' ? 2.5 : 2} />
            <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">AI Chat</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-sans selection:bg-purple-500/30">
        
        {/* Dynamic Premium Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-[40%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none mix-blend-screen" />
        
        {/* Main Application Container */}
        <div className="relative z-10 w-full min-h-screen flex flex-col max-w-md mx-auto bg-black/20 backdrop-blur-md shadow-2xl border-x border-white/5">
          <EmergencyButton />
          
          <main className="flex-1 overflow-x-hidden relative">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/media" element={<Media />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Navigation />
        </div>
      </div>
    </Router>
  );
}
