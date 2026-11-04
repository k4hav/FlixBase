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
   <title>{movie.title} {movie.year || ''} Free Download — Watch {movie.language || 'Hindi'} {movie.type || 'Movie'} Online | FlixBase</title>
<meta name="keywords" content={`${movie.title} download, ${movie.title} free download, ${movie.title} ${movie.year || ''} download, watch ${movie.title} online free, ${movie.title} ${movie.language || 'hindi'} download, ${movie.title} 1080p download, ${movie.title} 4k download, ${movie.title} 720p, ${movie.genre || ''} movies download free`} />
    <meta name="description" content={`Download ${movie.title} ${movie.year || ''} in 4K, 1080p, 720p. ${movie.overview || `Watch ${movie.title} online or download for free on FlixBase.`}`} />
    <meta name="keywords" content={`${movie.title} download, ${movie.title} ${movie.year || ''}, ${movie.title} ${movie.language || 'hindi'}, ${movie.title} 1080p, ${movie.title} 4k, ${movie.genre || ''} movies download`} />
    <meta property="og:title" content={movie.title + ' — FlixBase'} />
    <meta property="og:description" content={movie.overview || 'Watch and download on FlixBase'} />
    {movie.poster_url && <meta property="og:image" content={movie.poster_url} />}
    </Head>

    {/* Download button styles — spinning light border + spotlight + 3D tilt */}
    <style jsx global>{`
      @keyframes dl-ring { 0% { transform: scale(0.8); opacity: 0.7; } 100% { transform: scale(1.7); opacity: 0; } }
      @keyframes dl-bounce { 0%,100% { transform: translateY(-1px); } 50% { transform: translateY(3px); } }
      @keyframes dl-rise { 0% { transform: translateY(8px) scale(0.5); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(-26px) scale(1); opacity: 0; } }
      @keyframes dl-swipe { 0% { transform: translateX(-160%) skewX(-22deg); } 60%,100% { transform: translateX(380%) skewX(-22deg); } }
      @keyframes dl-chip { 0% { background-position: -150% 0; } 100% { background-position: 250% 0; } }

      .dl-btn {
        --c: #ffd277;
        position: relative;
        display: inline-flex;
        padding: 1.5px;
        border-radius: 18px;
        text-decoration: none;
        cursor: pointer;
        transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
        transition: transform 0.25s ease-out, box-shadow 0.4s, background 0.4s;
        background: linear-gradient(135deg, color-mix(in srgb, var(--c) 35%, transparent), rgba(255,210,119,0.10) 50%, color-mix(in srgb, var(--c) 35%, transparent));
        isolation: isolate;
      }
      .dl-btn:hover {
        background: linear-gradient(135deg, color-mix(in srgb, var(--c) 80%, transparent), rgba(255,210,119,0.25) 50%, color-mix(in srgb, var(--c) 80%, transparent));
        box-shadow: 0 6px 22px color-mix(in srgb, var(--c) 18%, transparent);
      }

      .dl-btn-inner {
        position: relative;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 20px 12px 14px;
        border-radius: 16.5px;
        overflow: hidden;
        background:
          radial-gradient(170px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--c) 14%, transparent), transparent 70%),
          linear-gradient(135deg, #0e0e1e, #07070f);
      }

      /* light swipe: slanted band, plays only on hover (no reverse sweep) */
      .dl-btn-inner::after {
        content: '';
        position: absolute;
        top: -20%;
        bottom: -20%;
        left: 0;
        width: 38%;
        pointer-events: none;
        opacity: 0;
        transform: translateX(-160%) skewX(-22deg);
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.10) 55%, transparent);
      }
      .dl-btn:hover .dl-btn-inner::after { opacity: 1; animation: dl-swipe 4.5s ease-in-out infinite; }

      /* icon bubble */
      .dl-ic {
        position: relative;
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--c);
        background: color-mix(in srgb, var(--c) 14%, transparent);
        border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
        box-shadow: 0 0 10px color-mix(in srgb, var(--c) 18%, transparent);
      }
      .dl-ic::after {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: 50%;
        border: 1px solid var(--c);
        opacity: 0;
        animation: dl-ring 2s ease-out infinite;
      }
      .dl-btn:hover .dl-ic svg { animation: dl-bounce 0.7s ease-in-out infinite; }

      .dl-label { font-size: 14px; font-weight: 600; letter-spacing: 0.02em; color: var(--c); display: flex; align-items: center; gap: 7px; }
      .dl-label svg { opacity: 0.55; transition: transform 0.3s, opacity 0.3s; }
      .dl-btn:hover .dl-label svg { transform: translate(3px,-3px); opacity: 1; }

      .dl-chip {
        display: inline-block;
        margin-top: 5px;
        padding: 3px 8px;
        font-size: 10px;
        line-height: 1.35;
        border-radius: 7px;
        color: #d9c58a;
        border: 1px solid rgba(255,210,119,0.14);
        background:
          linear-gradient(100deg, transparent 30%, rgba(255,210,119,0.22) 50%, transparent 70%) no-repeat,
          rgba(255,210,119,0.06);
        background-size: 60% 100%, 100% 100%;
        background-position: -150% 0, 0 0;
      }
      .dl-btn:hover .dl-chip { animation: dl-chip 1.6s ease-in-out infinite; }

      /* floating sparks */
      .dl-spark {
        position: absolute;
        bottom: 10px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--c);
        box-shadow: 0 0 8px var(--c);
        opacity: 0;
        pointer-events: none;
      }
      .dl-btn:hover .dl-spark { animation: dl-rise 1.4s ease-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .dl-ic::after { animation: none !important; }
      }
    `}</style>

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

      {/* Trailer */}
{movie.trailer_url && (
  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18 }} className="mb-6">
    <div className="section-tag mb-3 flex items-center gap-2">
      <Film size={11} /> Official Trailer
    </div>
    <motion.a href={movie.trailer_url} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold"
      style={{ background:'rgba(255,0,0,0.1)', border:'1px solid rgba(255,0,0,0.3)', color:'#f87171', textDecoration:'none' }}>
      ▶ Watch Trailer
      <ExternalLink size={11} style={{ opacity:0.6 }} />
    </motion.a>
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


        {/* Watch Online */}
{movie.watch_links && Array.isArray(movie.watch_links) && movie.watch_links.length > 0 && (
  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22 }} className="mb-6">
    <div className="section-tag mb-3 flex items-center gap-2">
      <Tv2 size={11} /> Watch Online
    </div>
    <div className="flex flex-wrap gap-3">
      {movie.watch_links.map((l, i) => (
      <motion.a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
          whileTap={{ scale:0.95 }}
          className="relative flex items-center gap-3 px-7 py-3.5 rounded-2xl text-sm font-bold overflow-hidden group"
          style={{ textDecoration:'none', cursor:'pointer', pointerEvents:'all', color:'#fff', minWidth:'200px', justifyContent:'center' }}
        >
          {/* Base dark bg */}
          <div className="absolute inset-0 rounded-2xl" style={{ background:'#0a0a1a' }} />

        

          {/* Inner dark overlay */}
          <div className="absolute inset-[1.5px] rounded-2xl" style={{ background:'linear-gradient(135deg,#0f0f2a,#0a0a1a)' }} />

     

          {/* Shimmer */}
          <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.12) 50%,transparent 70%)' }}
            animate={{ x:['-100%','200%'] }}
            transition={{ repeat:Infinity, duration:2.2, ease:'easeInOut', repeatDelay:0.8 }}
          />

          {/* Play icon animated */}
          <motion.div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.3)' }}
            animate={{ scale:[1,1.2,1], boxShadow:['0 0 0px rgba(99,102,241,0)','0 0 16px rgba(99,102,241,0.8)','0 0 0px rgba(99,102,241,0)'] }}
            transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
          >
            <span style={{ fontSize:'10px', marginLeft:'1px' }}>▶</span>
          </motion.div>

          <span className="relative z-10 tracking-wide">{l.label || 'Watch Online'}</span>
          <ExternalLink size={12} className="relative z-10" style={{ opacity:0.7 }} />
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
                <motion.div key={i}
                initial={{ opacity:0, y:28, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }}
                transition={{ type:'spring', stiffness:140, damping:16, delay:0.35 + i*0.08 }}
                whileTap={{ scale:0.95 }}>
                <a href={l.url} target="_blank" rel="noopener noreferrer"
                className="dl-btn"
                style={{ '--c': l.color || '#ffd277' }}
                onMouseMove={e => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  const x = e.clientX - r.left, y = e.clientY - r.top;
                  el.style.setProperty('--mx', x + 'px');
                  el.style.setProperty('--my', y + 'px');
                  el.style.setProperty('--ry', ((x / r.width - 0.5) * 10) + 'deg');
                  el.style.setProperty('--rx', (-(y / r.height - 0.5) * 10) + 'deg');
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.setProperty('--rx', '0deg');
                  el.style.setProperty('--ry', '0deg');
                }}>
                <div className="dl-btn-inner">
                <span className="dl-spark" style={{ left:'26px', animationDelay:'0s' }} />
                <span className="dl-spark" style={{ left:'38px', animationDelay:'0.45s' }} />
                <span className="dl-spark" style={{ left:'18px', animationDelay:'0.9s' }} />
                <div className="dl-ic"><Download size={17} /></div>
                <div className="min-w-0">
                <div className="dl-label">
                {l.label||'Download'}
                <ExternalLink size={11} />
                </div>
                {l.info && <span className="dl-chip">{l.info}</span>}
                </div>
                </div>
                </a>
                </motion.div>
              ))}
              </div>
            )
          }
          </motion.div>
       {/* How to Download */}
<motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }} className="mt-6">
  <motion.a
    href="https://drive.google.com/drive/folders/1s-llW3hYo3-4pK6U2XR3M5bJEakbHDjI"
    target="_blank" rel="noopener noreferrer"
    whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
    className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-xs font-semibold relative overflow-hidden"
    style={{ textDecoration:'none', color:'#fff', background:'transparent' }}
  >
    {/* Animated dashed border */}
    <motion.div className="absolute inset-0 rounded-2xl"
      style={{ border:'1.5px dashed rgba(220,38,38,0.6)', borderRadius:'16px' }}
      animate={{ rotate: 360 }}
      transition={{ repeat:Infinity, duration:8, ease:'linear' }}
    />
    {/* Dark bg */}
    <div className="absolute inset-0 rounded-2xl" style={{ background:'rgba(8,8,20,0.9)' }} />
    {/* Glow */}
    <motion.div className="absolute inset-0 rounded-2xl"
      style={{ background:'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.15) 0%, transparent 70%)' }}
      animate={{ opacity:[0.4,1,0.4] }}
      transition={{ repeat:Infinity, duration:2.5, ease:'easeInOut' }}
    />
    {/* Light swipe */}
    <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ background:'linear-gradient(105deg,transparent 25%,rgba(255,255,255,0.12) 50%,transparent 75%)' }}
      animate={{ x:['-150%','200%'] }}
      transition={{ repeat:Infinity, duration:2, ease:'easeInOut', repeatDelay:1.5 }}
    />
    {/* Question mark icon */}
    <div className="relative z-10 w-7 h-7 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
      style={{ background:'rgba(220,38,38,0.2)', border:'1px solid rgba(220,38,38,0.4)', color:'#f87171' }}>
      ?
    </div>
    <div className="relative z-10 text-left">
      <div className="text-[11px] font-bold" style={{ color:'#f87171' }}>How to Download</div>
      <div className="text-[9px] mt-0.5" style={{ color:'#6a6a8a' }}>Watch video tutorial →</div>
    </div>
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
