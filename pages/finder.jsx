import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import CinematicBackground from '../components/CinematicBackground';
import { Search, ArrowLeft, ExternalLink, Film } from 'lucide-react';

const SITES = [
  { name: '1337X',    color: '#e05c3a', icon: '🎬', url: q => `https://www.hypersonicmedia.workers.dev/1784808597872/popular-movies/?s=${encodeURIComponent(q)}` },
  { name: 'Filmywap',      color: '#c0392b', icon: '🎥', url: q => `https://www.filmywap.skin/?s=${encodeURIComponent(q)}` },
  { name: 'Vegamovies',    color: '#8b5cf6', icon: '🍿', url: q => `https://vegamovies.skin/?s=${encodeURIComponent(q)}` },
  { name: 'Bollyflix',     color: '#f59e0b', icon: '⭐', url: q => `https://bollyflix.skin/?s=${encodeURIComponent(q)}` },
  { name: 'HDHub4u',       color: '#3b82f6', icon: '📺', url: q => `https://hdhub4u.skin/?s=${encodeURIComponent(q)}` },
  { name: 'Movierulz',     color: '#10b981', icon: '🎞️', url: q => `https://www.movierulz.tc/?s=${encodeURIComponent(q)}` },
  { name: 'Tamilrockers',  color: '#ef4444', icon: '🔥', url: q => `https://www.tamilrockers.fm/?s=${encodeURIComponent(q)}` },
  { name: 'Kuttymovies',   color: '#06b6d4', icon: '💎', url: q => `https://www.kuttymovies.app/?s=${encodeURIComponent(q)}` },
  { name: '1337x',         color: '#f97316', icon: '🧲', url: q => `https://1337x.to/search/${encodeURIComponent(q)}/1/` },
  { name: 'YTS',           color: '#22c55e', icon: '🎦', url: q => `https://yts.mx/browse-movies/${encodeURIComponent(q)}` },
  { name: 'Telegram',      color: '#229ED9', icon: '✈️', url: q => `https://t.me/s/FlixBaseBot?q=${encodeURIComponent(q)}` },
  { name: 'Google',        color: '#4285F4', icon: '🔍', url: q => `https://www.google.com/search?q=${encodeURIComponent(q + ' download free')}` },
];

export default function Finder() {
  const [query,    setQuery]    = useState('');
  const [searched, setSearched] = useState('');
  const [clicked,  setClicked]  = useState({});

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearched(query.trim());
    setClicked({});
  };

  const handleSiteClick = (site) => {
    setClicked(c => ({ ...c, [site.name]: true }));
    window.open(site.url(searched), '_blank');
  };

  return (
    <div className="min-h-screen bg-deep">
      <Head>
        <title>Movie Finder — FlixBase</title>
        <meta name="description" content="Find any movie on multiple sites at once" />
      </Head>
      <CinematicBackground />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* Back */}
        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} className="mb-6">
          <Link href="/">
            <motion.div whileHover={{ x:-3 }} className="inline-flex items-center gap-1.5 text-xs transition-colors"
              style={{ color:'#6a6a5a' }}
              onMouseEnter={e=>e.currentTarget.style.color='#c9a84c'}
              onMouseLeave={e=>e.currentTarget.style.color='#6a6a5a'}>
              <ArrowLeft size={13} /> Back to Library
            </motion.div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.25)' }}>
            <Search size={24} style={{ color:'#c9a84c' }} />
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl mb-2"
            style={{ fontFamily:'Cinzel,serif',
              background:'linear-gradient(135deg,#f5e4a8,#c9a84c)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Movie Finder
          </h1>
          <p className="text-xs leading-relaxed max-w-md mx-auto" style={{ color:'#6a6a5a' }}>
            Type any movie name and search across multiple sites at once.
            Click any site button to find it there directly.
          </p>
          <div className="divider-gold w-20 mx-auto mt-3" />
        </motion.div>

        {/* Search Box */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                className="input-dark w-full px-4 py-3.5 rounded-xl text-sm pr-4"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Enter movie or series name..."
                autoFocus
              />
            </div>
            <motion.button
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              onClick={handleSearch}
              className="btn-primary flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold flex-shrink-0">
              <Search size={16} /> Search
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {searched && (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>

              {/* Searching for */}
              <div className="flex items-center gap-3 mb-5">
                <Film size={14} style={{ color:'#c9a84c' }} />
                <span className="section-tag">Results for</span>
                <span className="text-sm font-semibold" style={{ color:'#e8c87a' }}>"{searched}"</span>
                <div className="flex-1 divider-soft" />
              </div>

              {/* Site buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SITES.map((site, i) => (
                  <motion.button key={site.name}
                    initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.96 }}
                    onClick={() => handleSiteClick(site)}
                    className="relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-left overflow-hidden transition-all"
                    style={{
                      background: clicked[site.name] ? `${site.color}22` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${clicked[site.name] ? site.color + '50' : 'rgba(255,255,255,0.08)'}`,
                      color: clicked[site.name] ? site.color : '#b8b4a8',
                    }}>
                    {/* Shimmer */}
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background:`linear-gradient(105deg,transparent 30%,${site.color}08 50%,transparent 70%)` }}
                      animate={{ x:['-100%','200%'] }}
                      transition={{ repeat:Infinity, duration:3, ease:'easeInOut', repeatDelay: 1 + i*0.2 }}
                    />
                    <span className="text-lg flex-shrink-0">{site.icon}</span>
                    <div className="flex-1 min-w-0 relative z-10">
                      <div className="font-semibold text-xs truncate">{site.name}</div>
                      {clicked[site.name] && (
                        <div className="text-[9px] mt-0.5" style={{ color: site.color, opacity:0.8 }}>Opened ✓</div>
                      )}
                    </div>
                    <ExternalLink size={12} className="relative z-10 flex-shrink-0" style={{ opacity:0.5 }} />
                  </motion.button>
                ))}
              </div>

              {/* Search all button */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
                className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  onClick={() => SITES.forEach((s, i) => setTimeout(() => handleSiteClick(s), i * 300))}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold"
                  style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.25)', color:'#c9a84c' }}>
                  🚀 Open All Sites at Once
                </motion.button>
                <p className="text-[10px] mt-2" style={{ color:'#3a3a2a' }}>
                  Will open {SITES.length} tabs — make sure popups are allowed
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!searched && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
            className="text-center py-8">
            <p className="text-xs" style={{ color:'#4a4a3a' }}>
              Type a movie name above and press Search or Enter
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}