import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Phone, MessageSquare, HelpCircle, AlertTriangle } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';
import Login from './pages/Login';
import EmergencyButton from './components/EmergencyButton';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFDAB9] via-[#ADD8E6] to-[#E6E6FA] bg-animated-gradient">
        {/* Soft overlay to make content more readable */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-0 pointer-events-none"></div>
        
        {/* Main Content Area */}
        <div className="relative z-10 w-full min-h-screen flex flex-col max-w-md mx-auto shadow-2xl bg-white/60">
          <EmergencyButton />
          
          <main className="flex-1 overflow-y-auto pb-24 pt-4 px-4">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </main>
          
          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <ul className="flex justify-between items-center px-2">
              <li>
                <Link to="/dashboard" className="flex flex-col items-center p-2 text-slate-500 hover:text-blue-600 transition-colors">
                  <Mic size={28} />
                  <span className="text-xs font-medium mt-1">Voice</span>
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="flex flex-col items-center p-2 text-slate-500 hover:text-pink-500 transition-colors">
                  <Phone size={28} />
                  <span className="text-xs font-medium mt-1">Family</span>
                </Link>
              </li>
              <li>
                <Link to="/chat" className="flex flex-col items-center p-2 text-slate-500 hover:text-green-600 transition-colors">
                  <HelpCircle size={28} />
                  <span className="text-xs font-medium mt-1">Help</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Router>
  );
}
