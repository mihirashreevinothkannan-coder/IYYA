import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { Search, Music, Video, Play, X } from 'lucide-react';

export default function Media() {
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' or 'spotify'
  const [searchUrl, setSearchUrl] = useState('');
  const [currentMedia, setCurrentMedia] = useState('https://www.youtube.com/watch?v=ScMzIvxBSi4'); // default calming video

  const handlePlay = (e) => {
    e.preventDefault();
    if (searchUrl) {
      setCurrentMedia(searchUrl);
      setSearchUrl('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-16 pb-32 h-full flex flex-col"
    >
      <h1 className="text-3xl font-extrabold text-white mb-2 px-6">Entertainment</h1>
      <p className="text-slate-400 mb-8 px-6 text-sm">Play your favorite music and videos instantly.</p>
      
      {/* Custom Tabs */}
      <div className="flex gap-4 px-6 mb-8">
        <button 
          onClick={() => setActiveTab('youtube')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all ${
            activeTab === 'youtube' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Video size={20} /> YouTube
        </button>
        <button 
          onClick={() => setActiveTab('spotify')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all ${
            activeTab === 'spotify' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Music size={20} /> Spotify
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 flex flex-col">
        {/* Media Player Area */}
        <div className="w-full aspect-video bg-black/40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-8 relative group">
          {activeTab === 'youtube' ? (
            <ReactPlayer 
              url={currentMedia} 
              width="100%" 
              height="100%" 
              controls={true}
              playing={false}
              className="absolute top-0 left-0"
            />
          ) : (
            <iframe 
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="absolute top-0 left-0 bg-transparent"
            />
          )}
        </div>

        {/* Dynamic Search / Input */}
        {activeTab === 'youtube' && (
          <form onSubmit={handlePlay} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white mb-2">Play Custom Video</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchUrl}
                onChange={(e) => setSearchUrl(e.target.value)}
                placeholder="Paste YouTube Link here..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-white/10 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-400/20 bg-white/5 text-white placeholder-slate-500 transition-all font-medium"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg shadow-red-500/20 active:scale-95 transition-all"
            >
              <Play size={24} /> Play Now
            </button>
          </form>
        )}

        {activeTab === 'spotify' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center mt-auto mb-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Spotify Premium Connect</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The player above uses standard Spotify Free previews. For full access, the authentication module must be completed by registering a Spotify Developer Token.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
