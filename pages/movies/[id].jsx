import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { getMovies, getMovieById } from '../../lib/supabase';
import CinematicBackground from '../../components/CinematicBackground';
import { ArrowLeft, Star, Download, ExternalLink, Film, User, Tv2 } from 'lucide-react';

export default function MovieDetail({ movie }) {
  

  if (!movie) return (
    <div className="min-h-screen flex items-center justify-center bg-deep">
    <CinematicBackground />
    <div className="text-center z-10">
    <h1 className="font-cinzel text-xl mb-4" style={{ fontFamily:'Cinzel,serif', color:'#c9a84c' }}>Not Found</h1>
    <Link href="/"><span className="btn-ghost px-4 py-2 rounded-lg text-sm inline-block cursor-pointer">← Back</span></Link>
    </div>
    </div>
  );

  const links = Array.isArray(movie.links) ? movie.links : [];
  const stars = movie.rating ? Math.round(parseFloat(movie.rating) / 2) : 0;

  return (
    <div className="min-h-screen bg-deep">
    <Head>
    <title>{movie.title} {movie.year ? `(${movie.year})` : ''} Download — {movie.language || 'Hindi'} {movie.type || 'Movie'} | FlixBase</title>
    <meta name="description" content={`Download ${movie.title} ${movie.year || ''} in 4K, 1080p, 720p. ${movie.overview || `Watch ${movie.title} online or download for free on FlixBase.`}`} />
    <meta name="keywords" content={`${movie.title} download, ${movie.title} ${movie.year || ''}, ${movie.title} ${movie.language || 'hindi'}, ${movie.title} 1080p, ${movie.title} 4k, ${movie.genre || ''} movies download`} />
    <meta property="og:title" content={movie.title + ' — FlixBase'} />
    <meta property="og:description" content={movie.overview || 'Watch and download on FlixBase'} />
    {movie.poster_url && <meta property="og:image" content={movie.poster_url} />}
    </Head>

    <CinematicBackground />
    {movie.poster_url && (
      <div className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundImage:`url(${movie.poster_url})`, backgroundSize:'cover',
                          backgroundPosition:'center', filter:'blur(80px) saturate(0.2)', opacity:0.1 }} />
    )}

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-20">
    <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} className="mb-8">
    <Link href="/">
    <motion.div whileHover={{ x:-3 }} className="inline-flex items-center gap-1.5 text-xs transition-colors"
    style={{ color:'#6a6a5a' }}
    onMouseEnter={e=>e.currentTarget.style.color='#c9a84c'}
    onMouseLeave={e=>e.currentTarget.style.color='#6a6a5a'}>
    <ArrowLeft size={13} /> Back to Library
    </motion.div>
    </Link>
    </motion.div>

    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
    {/* Poster */}
    <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
    className="flex-shrink-0 w-full md:w-52">
    <div className="rounded-2xl overflow-hidden"
    style={{ border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 60px rgba(0,0,0,0.6)' }}>
    {movie.poster_url
      ? <img src={movie.poster_url} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
      : <div className="w-full aspect-[2/3] flex items-center justify-center" style={{ background:'#131320' }}>
      <Film size={40} style={{ color:'#6a6a5a' }} />
      </div>
    }
    </div>

    {movie.uploaded_by && (
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
      className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs"
      style={{ background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.15)' }}>
      <User size={12} style={{ color:'#c9a84c', flexShrink:0 }} />
      <div>
      <div className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color:'#4a4a3a' }}>Uploaded by</div>
      <div className="font-medium" style={{ color:'#e8c87a' }}>{movie.uploaded_by}</div>
      <div className="text-[9px] mt-0.5" style={{ color:'#4a4a3a' }}>Thanks for contributing! 🙌</div>
      </div>
      </motion.div>
    )}

    <div className="mt-3 space-y-1.5">
    {[['Type',movie.type],['Language',movie.language],['Year',movie.year],['Genre',movie.genre]]
      .filter(([,v])=>v).map(([k,v])=>(
        <div key={k} className="flex justify-between">
        <span className="text-[10px] uppercase tracking-wider" style={{ color:'#4a4a3a' }}>{k}</span>
        <span className="text-xs" style={{ color:'#b8b4a8' }}>{v}</span>
        </div>
      ))}
      </div>
      </motion.div>

      {/* Info */}
      <div className="flex-1 min-w-0">
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
      {movie.featured && <span className="inline-block mb-3 badge badge-gold">Featured</span>}
      <h1 className="font-cinzel font-semibold leading-tight mb-3"
      style={{ fontFamily:'Cinzel,serif', fontSize:'clamp(1.5rem,4vw,2.4rem)',
        letterSpacing:'0.05em', background:'linear-gradient(135deg,#f5e4a8,#c9a84c)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
          {movie.title}
          </h1>

          {movie.rating && (
            <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-0.5">
            {[...Array(5)].map((_,i)=>(
              <Star key={i} size={14} fill={i<stars?'#c9a84c':'none'}
              style={{ color:i<stars?'#c9a84c':'rgba(255,255,255,0.12)' }} />
            ))}
            </div>
            <span className="text-xl font-semibold" style={{ color:'#e8c87a', fontFamily:'Cinzel,serif' }}>{movie.rating}</span>
            <span className="text-xs" style={{ color:'#4a4a3a' }}>/10</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-5">
          {movie.type && <span className={`badge ${movie.type==='Anime'?'badge-purple':movie.type==='Series'?'badge-blue':'badge-muted'}`}>{movie.type}</span>}
          {movie.genre && <span className="badge badge-muted">{movie.genre}</span>}
          {movie.year && <span className="badge badge-muted">{movie.year}</span>}
          </div>

          {movie.overview && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="mb-6">
            <div className="section-tag mb-2">Overview</div>
            <p className="text-sm leading-relaxed" style={{ color:'#a8a49a' }}>{movie.overview}</p>
            </motion.div>
          )}
          </motion.div>

        {/* Watch Online */}
{movie.watch_links && Array.isArray(movie.watch_links) && movie.watch_links.length > 0 && (
  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22 }} className="mb-6">
    <div className="section-tag mb-3 flex items-center gap-2">
      <Tv2 size={11} /> Watch Online
    </div>
    <div className="flex flex-wrap gap-3">
      {movie.watch_links.map((l, i) => (
        <motion.a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
          style={{
            background:'rgba(59,130,246,0.12)',
            border:'1px solid rgba(59,130,246,0.35)',
            color:'#60a5fa',
            textDecoration:'none',
            boxShadow:'0 4px 20px rgba(59,130,246,0.1)',
          }}>
          ▶ {l.label || 'Watch Online'}
          <ExternalLink size={10} style={{ opacity:0.6 }} />
        </motion.a>
      ))}
    </div>
  </motion.div>
)}
{/* ── AVAILABLE ON ── */}
{movie.platforms && movie.platforms.length > 0 && (
  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }} className="mb-6">
    <div className="section-tag mb-3 flex items-center gap-2">
      <Tv2 size={11} /> Officially Available on
    </div>
    <div className="flex flex-wrap gap-2">
      {[
        { name:'Netflix',      color:'#E50914', url:'https://www.netflix.com/search?q=' },
        { name:'Amazon Prime Video', color:'#00A8E1', url:'https://www.primevideo.com/search/ref=atv_nb_sr?phrase=' },
        { name:'JioCinema',    color:'#6B4DE6', url:'https://www.jiocinema.com/search/' },
        { name:'JioHotstar',      color:'#1F80E0', url:'https://www.hotstar.com/in/search?q=' },
        { name:'YouTube',      color:'#FF0000', url:'https://www.youtube.com/results?search_query=' },
        { name:'SonyLIV',      color:'#0057A8', url:'https://www.sonyliv.com/search/' },
        { name:'ZEE5',         color:'#7B2FBE', url:'https://www.zee5.com/search?q=' },
        { name:'MX Player',    color:'#FF6C00', url:'https://www.mxplayer.in/search?query=' },
      ].filter(p => movie.platforms.includes(p.name)).map((p, i) => (
        <motion.a key={i}
          href={p.url + encodeURIComponent(movie.title)}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.96 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
          style={{
            background: p.color+'20',
            border: `1px solid ${p.color}50`,
            color: p.color,
            textDecoration: 'none',
            boxShadow: `0 4px 20px ${p.color}15`,
          }}>
          Watch on {p.name}
          <ExternalLink size={10} style={{ opacity:0.6 }} />
        </motion.a>
      ))}
    </div>
  </motion.div>
)}

          {/* ── DOWNLOAD LINKS (manual) ── */}
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}>
          <div className="section-tag mb-3 flex items-center gap-2">
          <Download size={11} /> Download Links
          </div>

          {links.length === 0
            ? <p className="text-sm italic" style={{ color:'#4a4a3a' }}>No download links added yet.</p>
            : (
              <div className="flex flex-wrap gap-3">
              {links.map((l, i) => (
                <motion.a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.35 + i*0.06 }}
                whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}
                className="flex flex-col gap-1 px-4 py-2.5 rounded-xl transition-all"
                style={{
                  background:`${l.color||'#c9a84c'}18`,
                  border:`1px solid ${l.color||'#c9a84c'}35`,
                  boxShadow:`0 4px 20px ${l.color||'#c9a84c'}10`,
                  textDecoration:'none',
                }}>
                <div className="flex items-center gap-2">
                <Download size={12} style={{ color:l.color||'#c9a84c' }} />
                <span className="text-sm font-medium" style={{ color:l.color||'#c9a84c' }}>
                {l.label||'Download'}
                </span>
                <ExternalLink size={10} style={{ color:l.color||'#c9a84c', opacity:0.5 }} />
                </div>
                {l.info && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded self-start"
                  style={{ background:`${l.color||'#c9a84c'}15`, color:l.color||'#c9a84c', opacity:0.8 }}>
                  {l.info}
                  </span>
                )}
                </motion.a>
              ))}
              </div>
            )
          }
          </motion.div>
        {/* How to Download */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} className="mt-6">
              <motion.a
                href="https://drive.google.com/drive/folders/1s-llW3hYo3-4pK6U2XR3M5bJEakbHDjI"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.03, boxShadow:'0 0 20px rgba(201,168,76,0.2)' }}
                whileTap={{ scale:0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium relative overflow-hidden"
                style={{ background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.3)', color:'#60a5fa', textDecoration:'none' }}
              >
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background:'linear-gradient(105deg,transparent 30%,rgba(245,228,168,0.1) 50%,transparent 70%)' }}
                  animate={{ x:['-100%','200%'] }}
                  transition={{ repeat:Infinity, duration:3, ease:'easeInOut', repeatDelay:2 }}
                />
                <span className="relative z-10">🎬 How to Download — Watch Tutorial</span>
              </motion.a>
            </motion.div>
          </div>
          </div>
          </div>
          </div>
  );
}

export async function getStaticPaths() {
  try {
    const movies = await getMovies();
    return { paths: movies.map(m=>({params:{id:m.id}})), fallback:'blocking' };
  } catch { return { paths:[], fallback:'blocking' }; }
}

export async function getStaticProps({ params }) {
  try {
    const movie = await getMovieById(params.id);
    return { props:{movie}, revalidate:60 };
  } catch { return { notFound:true }; }
}
