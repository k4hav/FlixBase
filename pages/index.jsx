import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { getMovies } from '../lib/supabase';
import CinematicBackground from '../components/CinematicBackground';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { Film, Inbox, TrendingUp, Sparkles, Download } from 'lucide-react';

export default function Home({ movies: initial }) {
  const [movies,  setMovies]  = useState(initial || []);
  const [query,   setQuery]   = useState('');
  const [filter,  setFilter]  = useState('All');
  const [loading, setLoading] = useState(!initial);

  useEffect(() => {
    if (!initial) getMovies().then(d => { setMovies(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const types    = ['All', 'Movie', 'Series', 'Anime', 'Documentary'];
  const featured = movies.filter(m => m.featured);
  const animeList = movies.filter(m => m.type === 'Anime');

  const filtered = movies.filter(m => {
    const q = query.toLowerCase();
    const mQ = !q || m.title?.toLowerCase().includes(q) || m.genre?.toLowerCase().includes(q) || m.language?.toLowerCase().includes(q);
    const mT = filter === 'All' || m.type === filter;
    return mQ && mT;
  });

  const noResult = query && filtered.length === 0;

  return (
    <>
      <Head>
        <title>FlixBase — Discover movies, series & anime, find download links, and request your favourites</title>
        <meta name="description" content="Discover movies, series & anime. Find download links, request your favourites — all in one place. Free movie streaming hub." />
        <meta property="og:title" content="FlixBase — Discover movies, series & anime, find download links, and request your favourites" />
        <meta property="og:description" content="Discover movies, series & anime. Find download links and request your favourites." />
        <link rel="canonical" href="https://flix-base.vercel.app" />
      </Head>

      <div className="min-h-screen bg-deep">
        <CinematicBackground />

        {/* ══ HERO ══ */}
        <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-10 overflow-hidden">
          <div className="orb absolute -top-40 left-10 w-[400px] h-[400px]" style={{ background: 'rgba(201,168,76,0.07)' }} />
          <div className="orb absolute top-0 right-0 w-[300px] h-[300px]" style={{ background: 'rgba(100,80,200,0.05)' }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center w-full max-w-2xl mx-auto"
          >
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-[3px] uppercase"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', color: '#c9a84c' }}
            >
              <Film size={10} /> Movies · Series · Downloads
            </motion.div>

            {/* Big animated FLIXBASE */}
            <motion.div className="mb-3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
              <motion.h1
                className="font-cinzel font-bold tracking-[0.2em] leading-none select-none"
                style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}
              >
                {'FLIXBASE'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    animate={{
                      color: ['#c9a84c', '#f5e4a8', '#e8c87a', '#c9a84c'],
                      textShadow: [
                        '0 0 10px rgba(201,168,76,0.1)',
                        '0 0 30px rgba(201,168,76,0.8), 0 0 60px rgba(201,168,76,0.3)',
                        '0 0 10px rgba(201,168,76,0.1)',
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 4, delay: i * 0.15, ease: 'easeInOut' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                className="divider-gold w-48 mx-auto mt-2"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm font-light mb-5 leading-relaxed"
              style={{ color: '#8a8778', maxWidth: '440px', margin: '0.5rem auto 1.2rem' }}
            >
              Your Cinematic Universe — Discover movies, series &amp; anime, find download links, and request your favourites — all in one place.
            </motion.p>

            {/* Search */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="max-w-lg mx-auto mb-4">
              <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />
            </motion.div>

            {/* Filter tabs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 flex-wrap mb-5">
              {types.map(t => (
                <motion.button key={t} onClick={() => setFilter(t)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={filter === t
                    ? { background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#e8c87a' }
                    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#6a6a5a' }
                  }>
                  {t}{t === 'Anime' && <span className="ml-1" style={{ fontSize: '10px' }}>✦</span>}
                </motion.button>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/submit">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary flex items-center gap-2 px-5 py-2 rounded-xl text-xs">
                  <Film size={13} /> Add a Movie
                </motion.div>
              </Link>
              <Link href="/requests">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="btn-ghost flex items-center gap-2 px-5 py-2 rounded-xl text-xs">
                  <Inbox size={13} /> Request a Movie
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </section>

       
        {/* ══ ALL TITLES ══ */}
        <section id="explore" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="flex items-center gap-3 mb-5">
            <Download size={13} style={{ color: '#c9a84c' }} />
            <span className="section-tag">{filter === 'All' ? 'All Titles' : filter}</span>
            <div className="flex-1 divider-soft" />
            <span className="text-[11px]" style={{ color: '#6a6a5a' }}>{filtered.length} titles</span>
          </div>

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i}>
                  <div className="shimmer aspect-[2/3] rounded-xl mb-2" />
                  <div className="shimmer h-2.5 rounded w-3/4 mb-1.5" />
                  <div className="shimmer h-2 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          <AnimatePresence>
            {!loading && noResult && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-center py-16">
                <div className="text-4xl mb-4">🎬</div>
                <h3 className="font-cinzel text-base mb-2" style={{ fontFamily: 'Cinzel,serif', color: '#c9a84c' }}>Not in the library</h3>
                <p className="text-sm mb-1" style={{ color: '#6a6a5a' }}>
                  &ldquo;<span style={{ color: '#b8b4a8' }}>{query}</span>&rdquo; isn&apos;t added yet.
                </p>
                <p className="text-xs mb-5" style={{ color: '#4a4a3a' }}>Request it or add it yourself!</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Link href="/requests">
                    <motion.div whileHover={{ scale: 1.03 }} className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs">
                      <Inbox size={13} /> Request It
                    </motion.div>
                  </Link>
                  <Link href="/submit">
                    <motion.div whileHover={{ scale: 1.03 }} className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs">
                      <Film size={13} /> Add It
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && !noResult && (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <AnimatePresence>
                {filtered.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && movies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm mb-4" style={{ color: '#6a6a5a' }}>No movies added yet.</p>
              <Link href="/submit">
                <motion.div whileHover={{ scale: 1.03 }} className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
                  <Film size={14} /> Add First Movie
                </motion.div>
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function SectionHeader({ icon: Icon, label, color = '#c9a84c', accentColor }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      className="flex items-center gap-3 mb-6">
      <Icon size={14} style={{ color }} />
      <span className="section-tag" style={{ color }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${accentColor || 'rgba(201,168,76,0.35)'}, transparent)` }} />
    </motion.div>
  );
}

export async function getStaticProps() {
  try {
    const movies = await getMovies();
    return { props: { movies }, revalidate: 60 };
  } catch {
    return { props: { movies: [] }, revalidate: 60 };
  }
}
