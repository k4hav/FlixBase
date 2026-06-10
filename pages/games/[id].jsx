import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { supabase } from '../../lib/supabase';
import CinematicBackground from '../../components/CinematicBackground';
import { ArrowLeft, Download, ExternalLink, Gamepad2, Smartphone, Star, Shield, Zap } from 'lucide-react';

export default function GameDetail({ game }) {
  if (!game) return (
    <div className="min-h-screen flex items-center justify-center bg-deep">
      <CinematicBackground />
      <div className="text-center z-10">
        <h1 className="font-cinzel text-xl mb-4" style={{ fontFamily:'Cinzel,serif', color:'#a78bfa' }}>Not Found</h1>
        <Link href="/games"><span className="btn-ghost px-4 py-2 rounded-lg text-sm inline-block cursor-pointer">← Back</span></Link>
      </div>
    </div>
  );

  const links = Array.isArray(game.links) ? game.links : [];
  const isGame = game.type === 'Game';
  const themeColor = isGame ? '#a78bfa' : '#4ade80';
  const themeBg = isGame ? 'rgba(139,92,246,0.15)' : 'rgba(34,197,94,0.12)';
  const themeBorder = isGame ? 'rgba(139,92,246,0.3)' : 'rgba(34,197,94,0.25)';

  return (
    <div className="min-h-screen bg-deep">
      <Head>
        <title>{game.title} — FlixBase Games</title>
        <meta name="description" content={game.overview || `Download ${game.title} for free on FlixBase`} />
      </Head>
      <CinematicBackground />

      {/* Ambient bg from cover */}
      {game.cover_url && (
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{ backgroundImage:`url(${game.cover_url})`, backgroundSize:'cover',
            backgroundPosition:'center', filter:'blur(80px) saturate(0.2)', opacity:0.08 }} />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-20">

        {/* Back */}
        <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} className="mb-8">
          <Link href="/games">
            <motion.div whileHover={{ x:-3 }} className="inline-flex items-center gap-1.5 text-xs transition-colors"
              style={{ color:'#6a6a5a' }}
              onMouseEnter={e=>e.currentTarget.style.color=themeColor}
              onMouseLeave={e=>e.currentTarget.style.color='#6a6a5a'}>
              <ArrowLeft size={13} /> Back to Games
            </motion.div>
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

          {/* Cover */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            className="flex-shrink-0 w-full md:w-52">

            <div className="relative rounded-2xl overflow-hidden"
              style={{ border:`1px solid ${themeBorder}`, boxShadow:`0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${themeColor}15` }}>
              {game.cover_url ? (
                <img src={game.cover_url} alt={game.title} className="w-full aspect-[3/4] object-cover" />
              ) : (
                <div className="w-full aspect-[3/4] flex items-center justify-center" style={{ background: themeBg }}>
                  {isGame
                    ? <Gamepad2 size={56} style={{ color: themeColor, opacity:0.5 }} />
                    : <Smartphone size={56} style={{ color: themeColor, opacity:0.5 }} />
                  }
                </div>
              )}
              {/* Glow overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ boxShadow:`inset 0 0 40px ${themeColor}10` }} />
            </div>

            {/* Meta */}
            <div className="mt-4 space-y-2">
              {[
                ['Type',     game.type],
                ['Category', game.category],
                ['Version',  game.version ? `v${game.version}` : null],
              ].filter(([,v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-wider" style={{ color:'#4a4a3a' }}>{k}</span>
                  <span className="text-xs" style={{ color:'#b8b4a8' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Features if modded */}
            {!isGame && (
              <div className="mt-4 p-3 rounded-xl" style={{ background: themeBg, border:`1px solid ${themeBorder}` }}>
                <div className="text-[9px] uppercase tracking-widest mb-2" style={{ color: themeColor }}>Mod Features</div>
                <div className="space-y-1.5">
                  {['Unlocked Premium', 'No Ads', 'Free Download', 'Safe & Verified'].map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px]" style={{ color:'#b8b4a8' }}>
                      <Shield size={9} style={{ color: themeColor }} /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>

              {/* Type badge */}
              <span className="inline-block mb-3 text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-widest"
                style={{ background: themeBg, border:`1px solid ${themeBorder}`, color: themeColor }}>
                {isGame ? '🎮 Game' : '📱 Modded App'}
              </span>

              {/* Title */}
              <h1 className="font-cinzel font-bold leading-tight mb-3"
                style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(1.5rem,4vw,2.4rem)',
                  color: themeColor,
                  textShadow: `0 0 30px ${themeColor}40`,
                  filter: `drop-shadow(0 0 20px ${themeColor}30)` }}>
                {game.title}
              </h1>

              {/* Rating + Version */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                {game.rating && (
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_,i) => (
                      <Star key={i} size={14}
                        fill={i < Math.round(parseFloat(game.rating)/2) ? themeColor : 'none'}
                        style={{ color: i < Math.round(parseFloat(game.rating)/2) ? themeColor : 'rgba(255,255,255,0.12)' }} />
                    ))}
                    <span className="text-lg font-bold ml-1" style={{ color: themeColor, fontFamily:'Cinzel,serif' }}>
                      {game.rating}
                    </span>
                    <span className="text-xs" style={{ color:'#4a4a3a' }}>/10</span>
                  </div>
                )}
                {game.version && (
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
                    style={{ background: themeBg, border:`1px solid ${themeBorder}`, color: themeColor }}>
                    <Zap size={10} className="inline mr-1" />v{game.version}
                  </span>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {game.category && <span className="badge badge-muted">{game.category}</span>}
                {game.type && (
                  <span className="badge" style={{ background: themeBg, border:`1px solid ${themeBorder}`, color: themeColor }}>
                    {game.type}
                  </span>
                )}
              </div>

              {/* Overview */}
              {game.overview && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="mb-8">
                  <div className="section-tag mb-2">Description</div>
                  <p className="text-sm leading-relaxed" style={{ color:'#a8a49a' }}>{game.overview}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Download Links */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
              <div className="section-tag mb-4 flex items-center gap-2">
                <Download size={11} /> Download Links
              </div>

              {links.length === 0 ? (
                <p className="text-sm italic" style={{ color:'#4a4a3a' }}>No download links added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {links.map((l, i) => (
                    <motion.a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                      transition={{ delay: 0.3 + i*0.06 }}
                      whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}
                      className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold"
                      style={{
                        background: `${themeColor}18`,
                        border: `1px solid ${themeColor}40`,
                        color: themeColor,
                        textDecoration:'none',
                        boxShadow: `0 4px 20px ${themeColor}15`,
                      }}>
                      <Download size={14} />
                      {l.label || 'Download'}
                      <ExternalLink size={11} style={{ opacity:0.6 }} />
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Warning for modded */}
            {!isGame && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
                className="mt-6 p-4 rounded-xl"
                style={{ background:'rgba(234,179,8,0.05)', border:'1px solid rgba(234,179,8,0.15)' }}>
                <p className="text-[11px] leading-relaxed" style={{ color:'#8a8060' }}>
                  ⚠️ <span style={{ color:'#fbbf24' }}>Disclaimer:</span> This is a modded APK. Install at your own risk.
                  We are not responsible for any issues. Always scan before installing.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await supabase.from('games').select('id');
    return {
      paths: (data || []).map(g => ({ params: { id: g.id } })),
      fallback: 'blocking',
    };
  } catch { return { paths:[], fallback:'blocking' }; }
}

export async function getStaticProps({ params }) {
  try {
    const { data: game } = await supabase.from('games').select('*').eq('id', params.id).single();
    if (!game) return { notFound: true };
    return { props: { game }, revalidate: 60 };
  } catch { return { notFound: true }; }
}
