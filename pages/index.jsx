import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getMovies } from '../lib/supabase';
import CinematicBackground from '../components/CinematicBackground';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { Film, Inbox, TrendingUp, ChevronRight, Download } from 'lucide-react';

export default function Home({ movies: initial }) {
  const [movies,  setMovies]  = useState(initial || []);
  const [query,   setQuery]   = useState('');
  const [filter,  setFilter]  = useState('All');
  const [loading, setLoading] = useState(!initial);

  useEffect(() => {
    if (!initial) getMovies().then(d => { setMovies(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const types    = ['All', 'Movie', 'Series', 'Documentary'];
  const featured = movies.filter(m => m.featured);

  const filtered = movies.filter(m => {
    const q = query.toLowerCase();
    const mQ = !q || m.title?.toLowerCase().includes(q) || m.genre?.toLowerCase().includes(q) || m.language?.toLowerCase().includes(q);
    const mT = filter === 'All' || m.type === filter;
    return mQ && mT;
  });

  const noResult = query && filtered.length === 0;

  return (
    <div className="min-h-screen bg-deep">
      <CinematicBackground />

      {/* ══ HERO — compact, elegant ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-14 overflow-hidden">
        {/* Ambient orbs */}
        <div className="orb absolute -top-60 left-0 w-[500px] h-[500px]" style={{ background: 'rgba(201,168,76,0.07)' }} />
        <div className="orb absolute bottom-0 right-0 w-[400px] h-[400px]" style={{ background: 'rgba(100,80,200,0.05)' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-2xl mx-auto"
        >
          {/* Genre pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-[3px] uppercase"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', color: '#c9a84c' }}
          >
            <Film size={10} /> Movies · Series · Downloads
          </motion.div>

          {/* Main headline — elegant, not huge */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-cinzel mb-3"
            style={{
              fontFamily: 'Cinzel, serif', fontWeight: 600,
              fontSize: 'clamp(2rem, 6vw, 3.8rem)',
              letterSpacing: '0.12em', lineHeight: 1.2,
              background: 'linear-gradient(135deg, #f5e4a8 0%, #c9a84c 50%, #e8c87a 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 20px rgba(201,168,76,0.3))',
            }}
          >
            Your Cinematic Universe
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-sm font-light mb-8 leading-relaxed"
            style={{ color: '#8a8880', maxWidth: '480px', margin: '0 auto 2rem' }}
          >
            Discover movies &amp; series, find download links, and request your favourites — all in one place.
          </motion.p>

          {/* Divider */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 1 }}
            className="divider-gold w-32 mx-auto mb-8"
          />

          {/* Search bar — prominent */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="max-w-lg mx-auto mb-6">
            <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3 flex-wrap">
            <a href="#explore">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
                <Film size={14} /> Browse Library
              </motion.div>
            </a>
            <Link href="/requests">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-ghost flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
                <Inbox size={14} /> Request a Movie <ChevronRight size={13} />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: '#4a4a3a' }}>
          <span className="text-[9px] tracking-[4px] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-6" style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />
        </motion.div>
      </section>

      {/* ══ FEATURED ══ */}
      {featured.length > 0 && (
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-center gap-3 mb-6">
            <TrendingUp size={14} style={{ color: '#c9a84c' }} />
            <span className="section-tag">Featured</span>
            <div className="flex-1 divider-gold" />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featured.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
          </div>
        </section>
      )}

      {/* ══ ALL TITLES ══ */}
      <section id="explore" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-5">
          <Download size={14} style={{ color: '#c9a84c' }} />
          <span className="section-tag">All Titles</span>
          <div className="flex-1 divider-soft" />
          <span className="text-[11px]" style={{ color: '#6a6a5a' }}>{movies.length} titles</span>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {types.map(t => (
            <motion.button key={t} onClick={() => setFilter(t)}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={filter === t
                ? { background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.28)', color: '#c9a84c' }
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#6a6a5a' }
              }
            >{t}</motion.button>
          ))}
        </div>

        {/* Skeletons */}
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

        {/* No results */}
        <AnimatePresence>
          {!loading && noResult && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="font-cinzel text-lg mb-2" style={{ fontFamily: 'Cinzel, serif', color: '#c9a84c' }}>
                Not in the library
              </h3>
              <p className="text-sm mb-1" style={{ color: '#6a6a5a' }}>
                &ldquo;<span style={{ color: '#b8b4a8' }}>{query}</span>&rdquo; isn&apos;t added yet.
              </p>
              <p className="text-xs mb-6" style={{ color: '#4a4a3a' }}>You can request it below.</p>
              <Link href="/requests">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
                  <Inbox size={14} /> Request This Movie
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {!loading && !noResult && (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <AnimatePresence>
              {filtered.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm mb-4" style={{ color: '#6a6a5a' }}>No movies added yet.</p>
            <Link href="/admin">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
                <Film size={14} /> Add First Movie
              </motion.div>
            </Link>
          </div>
        )}
      </section>
    </div>
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
