import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import CinematicBackground from '../components/CinematicBackground';
import SearchBar from '../components/SearchBar';
import { Gamepad2, Smartphone, Download, Star, ExternalLink, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Games() {
  const [items,   setItems]   = useState([]);
  const [query,   setQuery]   = useState('');
  const [filter,  setFilter]  = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('games').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);

  const types = ['All', 'Game', 'Modded App'];
  const filtered = items.filter(m => {
    const q = query.toLowerCase();
    const mQ = !q || m.title?.toLowerCase().includes(q) || m.category?.toLowerCase().includes(q);
    const mT = filter === 'All' || m.type === filter;
    return mQ && mT;
  });

  return (
    <div className="min-h-screen bg-deep">
      <Head>
        <title>Games & Modded Apps — FlixBase</title>
      </Head>
      <CinematicBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.3)' }}>
              <Gamepad2 size={22} style={{ color:'#a78bfa' }} />
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.25)' }}>
              <Smartphone size={22} style={{ color:'#4ade80' }} />
            </div>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl mb-2"
            style={{ fontFamily:'Cinzel,serif',
              background:'linear-gradient(135deg,#a78bfa,#4ade80)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Games & Modded Apps
          </h1>
          <div className="hero-line w-24 mx-auto mt-3 mb-6" />
          <div className="max-w-lg mx-auto">
            <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')}
              placeholder="Search games or apps..." />
          </div>
        </motion.div>

        <Link href="/submit-game">
  <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium mt-4"
    style={{ background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)', color:'#a78bfa' }}>
    <Plus size={13} /> Add Game / App
  </motion.div>
</Link>

        {/* Filter tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {types.map(t => (
            <motion.button key={t} onClick={() => setFilter(t)}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={filter === t
                ? { background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.4)', color:'#a78bfa' }
                : { background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', color:'#6a6a5a' }
              }>{t}</motion.button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_,i) => <div key={i} className="shimmer aspect-[3/4] rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm mb-2" style={{ color:'#6a6a5a' }}>Nothing found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <Link href={`/games/${item.id}`}>
              <Link href={`/games/${item.id}`}>
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.05 }}
                className="rounded-xl overflow-hidden group"
                style={{ background:'rgba(15,15,24,0.9)', border:'1px solid rgba(255,255,255,0.07)',
                  boxShadow:'0 4px 24px rgba(0,0,0,0.4)' }}>
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {item.cover_url ? (
                    <img src={item.cover_url} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"
                      style={{ background: item.type === 'Game' ? 'rgba(139,92,246,0.1)' : 'rgba(34,197,94,0.08)' }}>
                      {item.type === 'Game'
                        ? <Gamepad2 size={40} style={{ color:'rgba(167,139,250,0.4)' }} />
                        : <Smartphone size={40} style={{ color:'rgba(74,222,128,0.4)' }} />
                      }
                    </div>
                  )}
                  <div className="absolute inset-0 poster-fade" />
                  {/* Type badge */}
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wider"
                      style={item.type === 'Game'
                        ? { background:'rgba(139,92,246,0.2)', border:'1px solid rgba(139,92,246,0.4)', color:'#a78bfa' }
                        : { background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)', color:'#4ade80' }
                      }>{item.type}</span>
                  </div>
                  {/* Version badge */}
                  {item.version && (
                    <div className="absolute bottom-2 left-2">
                      <span className="text-[10px] px-2 py-0.5 rounded"
                        style={{ background:'rgba(0,0,0,0.7)', color:'#c9a84c', border:'1px solid rgba(201,168,76,0.2)' }}>
                        v{item.version}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-medium text-sm text-[#e8e4d8] line-clamp-1 mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px]" style={{ color:'#6a6a5a' }}>{item.category || item.type}</span>
                    {item.rating && (
                      <span className="flex items-center gap-0.5 text-[10px]" style={{ color:'#c9a84c' }}>
                        <Star size={8} fill="currentColor" />{item.rating}
                      </span>
                    )}
                  </div>
                  {/* Download links */}
                  {item.links && item.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.links.map((l, li) => (
                        <motion.a key={li} href={l.url} target="_blank" rel="noopener noreferrer"
                          whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium"
                          style={{
                            background: item.type==='Game' ? 'rgba(139,92,246,0.12)' : 'rgba(34,197,94,0.1)',
                            border: item.type==='Game' ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(34,197,94,0.25)',
                            color: item.type==='Game' ? '#a78bfa' : '#4ade80',
                            textDecoration:'none',
                          }}>
                          <Download size={9} />
                          {l.label || 'Download'}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
                  </Link>
         
           ))}
        
          </div>
        )}
      </div>
    </div>
  );
}
