import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import CinematicBackground from '../components/CinematicBackground';
import { ArrowLeft, ExternalLink, Tv2, Radio } from 'lucide-react';

const STREAMS = [
  { label: 'Stream 1', info: 'HINDI', url: 'https://gplinks.co/vPTCI', color: '#E50914' },
  { label: 'Stream 2', info: 'ENGLISH', url: 'https://gplinks.co/MOriU', color: '#00A8E1' },
  { label: 'Stream 3', info: 'OTHER', url: 'https://gplinks.co/vPTCI', color: '#6B4DE6' },
];

export default function Live() {
  return (
    <div className="min-h-screen bg-deep">
      <Head>
        <title>Live Matches — FlixBase</title>
        <meta name="description" content="Watch live cricket matches on FlixBase" />
      </Head>
      <CinematicBackground />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* Back */}
        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} className="mb-8">
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
          {/* IPL Logo */}
          <motion.div className="relative inline-flex items-center justify-center mb-5">
            {/* Rotating border ring */}
            <motion.div className="absolute inset-0 rounded-2xl"
              style={{ background: 'conic-gradient(from 0deg, #cc0000, #ff4444, #e8c87a, #cc0000)', padding: '2px', borderRadius: '18px' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            />
            {/* Glow pulse */}
            <motion.div className="absolute inset-0 rounded-2xl"
              style={{ background: 'rgba(200,0,0,0.3)', filter: 'blur(16px)', zIndex: 0 }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
        <motion.img
              src="https://1000logos.net/wp-content/uploads/2022/08/IPL-sponsorship-Logo-2022.png"
              alt="IPL"
              className="relative z-10"
              style={{ width: '160px', height: '120px', objectFit: 'cover', borderRadius: '16px', border: '2px solid rgba(200,0,0,0.5)' }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Live badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            />
            <span className="text-xs font-semibold tracking-[3px] uppercase text-red-400">Live Now</span>
          </div>

          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl mb-2"
            style={{ fontFamily:'Cinzel,serif',
              background:'linear-gradient(135deg,#ff6666,#cc0000)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              filter:'drop-shadow(0 0 20px rgba(201,168,76,0.3))' }}>
            IPL 2026 Live
          </h1>
          <p className="text-xs" style={{ color:'#6a6a5a' }}>
            Click any stream below to watch
          </p>
          <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.4, duration:1 }}
            className="divider-gold w-24 mx-auto mt-3" />
        </motion.div>

        {/* Stream links */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          className="p-6 rounded-2xl space-y-4"
          style={{ background:'rgba(14,14,22,0.8)', border:'1px solid rgba(201,168,76,0.15)', backdropFilter:'blur(20px)' }}>

          <div className="flex items-center gap-2 mb-2">
            <Radio size={13} style={{ color:'#c9a84c' }} />
            <span className="section-tag">Watch Streams</span>
          </div>

          {STREAMS.map((s, i) => (
            <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 + i*0.1 }}
              whileHover={{ scale:1.02, x:4 }} whileTap={{ scale:0.98 }}
              className="flex items-center gap-4 p-4 rounded-xl transition-all"
              style={{ background:`${s.color}10`, border:`1px solid ${s.color}30`, textDecoration:'none',
                boxShadow:`0 4px 20px ${s.color}10` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:`${s.color}20`, border:`1px solid ${s.color}40` }}>
                <Tv2 size={18} style={{ color:s.color }} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color:s.color }}>{s.label}</div>
                <div className="text-[11px] mt-0.5" style={{ color:'#6a6a5a' }}>{s.info}</div>
              </div>
              <ExternalLink size={14} style={{ color:s.color, opacity:0.6 }} />
            </motion.a>
          ))}

          <p className="text-[10px] text-center mt-2" style={{ color:'#3a3a2a' }}>
            If one stream doesn&apos;t work, try another
          </p>
        </motion.div>
      </div>
    </div>
  );
}
