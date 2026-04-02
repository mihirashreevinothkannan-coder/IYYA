import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmergencyButton() {
  const handleEmergency = () => {
    // In a real app, this would trigger an immediate call or message
    alert("Emergency Mode Activated! Calling primary contact...");
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEmergency}
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-full shadow-lg border border-red-400"
      >
        <AlertTriangle size={24} />
        <span className="font-bold text-lg">Help!</span>
      </motion.button>
    </div>
  );
}
