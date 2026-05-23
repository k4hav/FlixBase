import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import CinematicBackground from '../components/CinematicBackground';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';

const SHARE_PLATFORMS = [
  {
    name: 'WhatsApp',
    color: '#25D366',
    icon: '💬',
    url: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + ' ' + u)}`,
    message: 'Share on WhatsApp',
  },
  {
    name: 'Telegram',
    color: '#229ED9',
    icon: '✈️',
    url: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
    message: 'Share on Telegram',
  },
  {
    name: 'Facebook',
    color: '#1877F2',
    icon: '📘',
    url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    message: 'Share on Facebook',
  },
  {
    name: 'Twitter / X',
    color: '#1DA1F2',
    icon: '🐦',
    url: (u, t) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
    message: 'Share on Twitter',
  },
  {
    name: 'Instagram',
    color: '#E1306C',
    icon: '📸',
    url: () => `https://www.instagram.com/`,
    message: 'Share on Instagram',
    note: '(Copy link & share in story)',
  },
  {
    name: 'Reddit',
    color: '#FF4500',
    icon: '🔴',
    url: (u, t) => `https://reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
    message: 'Share on Reddit',
  },
  {
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: '💼',
    url: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
    message: 'Share on LinkedIn',
  },
  {
    name: 'Copy Link',
    color: '#c9a84c',
    icon: '🔗',
    url: null,
    message: 'Copy Link',
  },
];

const SITE_URL = 'https://flix-base.vercel.app';
const SHARE_TEXT = '🎬 Check out FlixBase — Watch movies, series & anime with download links! Free forever.';

export default function Support() {
  const handleShare = (p) => {
    if (p.url === null) {
      navigator.clipboard?.writeText(SITE_URL);
      alert('Link copied! 🔗');
      return;
    }
    window.open(p.url(SITE_URL, SHARE_TEXT), '_blank');
  };

  return (
    <div className="min-h-screen bg-deep">
      <Head><title>Support Us — FlixBase</title></Head>
      <CinematicBackground />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* Back */}
        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} className="mb-6">
          <Link href="/">
            <motion.div whileHover={{ x:-3 }} className="inline-flex items-center gap-1.5 text-xs transition-colors"
              style={{ color:'#6a6a5a' }}
              onMouseEnter={e=>e.currentTarget.style.color='#c9a84c'}
              onMouseLeave={e=>e.currentTarget.style.color='#6a6a5a'}>
              <ArrowLeft size={13} /> Back
            </motion.div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-8">
          <motion.div
            animate={{ scale:[1,1.12,1] }}
            transition={{ repeat:Infinity, duration:2.5, ease:'easeInOut' }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)' }}>
            <Heart size={28} fill="#c9a84c" style={{ color:'#c9a84c' }} />
          </motion.div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl mb-3"
            style={{ fontFamily:'Cinzel,serif',
              background:'linear-gradient(135deg,#f5e4a8,#c9a84c)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Support Us
          </h1>
          <div className="divider-gold w-20 mx-auto mb-4" />
          <p className="text-sm leading-relaxed" style={{ color:'#8a8778' }}>
            FlixBase is completely <span style={{ color:'#c9a84c' }}>free</span> and will always be.
          </p>
        </motion.div>

        {/* Support card */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="p-6 rounded-2xl mb-6 text-center relative overflow-hidden"
          style={{ background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)' }}>
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background:'linear-gradient(105deg,transparent 30%,rgba(201,168,76,0.06) 50%,transparent 70%)' }}
            animate={{ x:['-100%','200%'] }}
            transition={{ repeat:Infinity, duration:4, ease:'easeInOut', repeatDelay:2 }}
          />
          <Share2 size={28} className="mx-auto mb-3" style={{ color:'#c9a84c' }} />
          <h2 className="font-cinzel font-semibold text-lg mb-2" style={{ fontFamily:'Cinzel,serif', color:'#e8c87a' }}>
            For Now — Just Share! 🚀
          </h2>
          <p className="text-xs leading-relaxed" style={{ color:'#8a8060' }}>
            The best way to support FlixBase right now is to <span style={{ color:'#e8c87a' }}>share it with your friends and family</span>.
            Share it on WhatsApp groups, Telegram, Instagram stories — every share helps us grow!
          </p>
        </motion.div>

        {/* Share buttons */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          className="p-6 rounded-2xl"
          style={{ background:'rgba(14,14,22,0.8)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(20px)' }}>

          <div className="section-tag mb-4 flex items-center gap-2">
            <Share2 size={11} /> Share FlixBase
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SHARE_PLATFORMS.map((p, i) => (
              <motion.button key={i}
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: 0.25 + i*0.05 }}
                whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.96 }}
                onClick={() => handleShare(p)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium text-left relative overflow-hidden"
                style={{ background:`${p.color}12`, border:`1px solid ${p.color}30`, color:p.color, cursor:'pointer' }}>
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background:`linear-gradient(105deg,transparent 30%,${p.color}10 50%,transparent 70%)` }}
                  animate={{ x:['-100%','200%'] }}
                  transition={{ repeat:Infinity, duration:3, ease:'easeInOut', repeatDelay: 1 + i*0.3 }}
                />
                <span className="text-base flex-shrink-0">{p.icon}</span>
                <div className="relative z-10">
                  <div className="font-semibold">{p.name}</div>
                  {p.note && <div className="text-[9px] opacity-60 mt-0.5">{p.note}</div>}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Share URL box */}
          <div className="mt-4 p-3 rounded-xl flex items-center gap-2"
            style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-xs flex-1 truncate" style={{ color:'#6a6a5a' }}>{SITE_URL}</span>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => { navigator.clipboard?.writeText(SITE_URL); alert('Copied! 🔗'); }}
              className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0"
              style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.25)', color:'#c9a84c' }}>
              Copy
            </motion.button>
          </div>
        </motion.div>

        {/* Thank you */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          className="text-center mt-6">
          <p className="text-xs" style={{ color:'#4a4a3a' }}>
            Thank you for being part of FlixBase ❤️
          </p>
        </motion.div>
      </div>
    </div>
  );
}
