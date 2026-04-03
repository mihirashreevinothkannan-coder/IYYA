import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, AlertCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contacts() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, payment
  const [paymentDone, setPaymentDone] = useState(false);

  // 1. Razorpay Native SDK Mock/Call
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setStatus('payment');
    
    // Check if Razorpay is loaded dynamically via index.html script
    if (window.Razorpay) {
      const options = {
        key: 'rzp_test_YourMockKey', // Safe mock key since this is client side dummy trigger
        amount: 50000, // 500.00
        currency: 'INR',
        name: 'Iyya Premium Services',
        description: 'Unlock Global Messaging',
        image: 'https://cdn-icons-png.flaticon.com/512/4712/4712015.png',
        handler: function (response) {
          // Payment Success
          setPaymentDone(true);
          setStatus('idle');
        },
        prefill: {
          name: 'Iyya User',
          contact: phoneNumber || '9999999999'
        },
        theme: {
          color: '#3B82F6'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert("Payment Cancelled.");
        setStatus('idle');
      });
      rzp.open();
    } else {
      // Fallback
      setTimeout(() => {
        setPaymentDone(true);
        setStatus('idle');
      }, 2000);
    }
  };

  const handleSystemCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleSendWhatsApp = async () => {
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:5000/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, message }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-16 pb-32 h-full flex flex-col"
    >
      <h1 className="text-3xl font-extrabold text-white mb-2 px-6">Secure Connect</h1>
      <p className="text-slate-400 mb-8 px-6 text-sm">Call or send WhatsApp messages securely to any global number.</p>
      
      <div className="flex-1 overflow-y-auto px-6">
        <form className="flex flex-col gap-6" onSubmit={paymentDone ? (e) => {e.preventDefault(); handleSendWhatsApp();} : handlePayment}>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-wider">Mobile Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full pl-12 pr-4 py-4 text-lg border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 bg-white/5 text-white placeholder-slate-600 transition-all font-medium shadow-inner"
                required
              />
            </div>
          </div>

          {/* New Call Action Array */}
          <div className="flex gap-4">
             <button
               type="button"
               disabled={!phoneNumber}
               onClick={handleSystemCall}
               className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl flex items-center justify-center gap-2 font-bold disabled:opacity-50 hover:bg-white/10 transition-colors"
             >
               <Phone size={18} className="text-green-400"/> Direct Call
             </button>
             <div className="flex-1 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center gap-2 font-bold cursor-default">
               <ShieldCheck size={18} /> Verified
             </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-wider">Message Content</label>
            <div className="relative group">
              <MessageCircle className="absolute left-4 top-6 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your WhatsApp message here..."
                rows="4"
                className="w-full pl-12 pr-4 py-4 text-lg border border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 bg-white/5 text-white placeholder-slate-600 transition-all font-medium shadow-inner resize-none"
                required
              />
            </div>
          </div>

          <div className="mt-4 pb-12">
            {!paymentDone ? (
              <button 
                type="submit"
                disabled={status === 'payment'}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg shadow-blue-500/25 active:scale-95 transition-all overflow-hidden relative"
              >
                {status === 'payment' ? (
                  <span className="flex items-center gap-2 animate-pulse">Initializing Gateway...</span>
                ) : (
                  <>
                    <CreditCard size={24} /> Pay ₹500 to Unlock Sending
                  </>
                )}
              </button>
            ) : (
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-4 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg active:scale-95 transition-all
                  ${status === 'success' ? 'bg-emerald-500 shadow-emerald-500/25' : 
                    status === 'error' ? 'bg-red-500 shadow-red-500/25' : 'bg-green-500 shadow-green-500/25'}
                `}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2 animate-pulse">Routing globally...</span>
                ) : status === 'success' ? (
                  <><CheckCircle2 size={24} /> Sent via Twilio!</>
                ) : status === 'error' ? (
                  <><AlertCircle size={24} /> API Error (Check Backend)</>
                ) : (
                  <><Send size={24} /> Submit WhatsApp Message</>
                )}
              </button>
            )}
            
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
              Secured by <ShieldCheck size={12}/> Razorpay & Twilio
            </p>
          </div>
          
        </form>
      </div>
    </motion.div>
  );
}
