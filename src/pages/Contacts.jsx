import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CONTACTS = [
  { id: 1, name: 'Sarah (Daughter)', type: 'daughter', color: 'bg-pink-100' },
  { id: 2, name: 'John (Son)', type: 'son', color: 'bg-blue-100' },
  { id: 3, name: 'Dr. Smith', type: 'doctor', color: 'bg-green-100' },
];

export default function Contacts() {
  const handleCall = (name) => {
    alert(`Calling ${name}...`);
  };

  const handleMessage = (name) => {
    alert(`Opening WhatsApp for ${name}...`);
  };

  return (
    <div className="pt-16 pb-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 px-2">Family & Friends</h1>
      
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-2 pb-10">
        {MOCK_CONTACTS.map((contact) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={contact.id} 
            className={`flex items-center p-4 rounded-3xl shadow-sm border border-slate-200 bg-white/80 backdrop-blur-sm`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-slate-700 ${contact.color} mr-4`}>
              {contact.name[0]}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800">{contact.name}</h2>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleMessage(contact.name)}
                className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <MessageCircle size={24} />
              </button>
              <button 
                onClick={() => handleCall(contact.name)}
                className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <Phone size={24} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
