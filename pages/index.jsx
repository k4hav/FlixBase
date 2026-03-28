import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { getMovies } from '../lib/supabase';
import CinematicBackground from '../components/CinematicBackground';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { Film, Inbox, ChevronLeft, ChevronRight, Download, Send } from 'lucide-react';

const PER_PAGE = 20;

export default function Home({ movies: initial }) {
  const [movies,  setMovies]  = useState(initial || []);
  const [query,   setQuery]   = useState('');
  const [filter,  setFilter]  = useState('All');
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(!initial);

  useEffect(() => {
    if (!initial) getMovies().then(d => { setMovies(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  // Reset to page 1 when filter or search changes
  useEffect(() => { setPage(1); }, [query, filter]);

  const types = ['All', 'Movie', 'Series', 'Anime', 'Documentary'];

  const filtered = movies.filter(m => {
    const q = query.toLowerCase();
    const mQ = !q || m.title?.toLowerCase().includes(q) || m.genre?.toLowerCase().includes(q) || m.language?.toLowerCase().includes(q);
    const mT = filter === 'All' || m.type === filter;
    return mQ && mT;
  });

  const noResult   = query && filtered.length === 0;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (page >= totalPages - 3) return [1, '...', totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages];
    return [1, '...', page-1, page, page+1, '...', totalPages];
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const changePage = (p) => {
    setPage(p);
    setTimeout(() => {
      document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <>
      <Head>
        <title>FlixBase — Discover movies, series & anime, find download links, and request your favourites</title>
        <meta name="description" content="Discover movies, web series & anime. Find download links and request your favourites — all in one place." />
        <meta property="og:title" content="FlixBase — Discover movies, series & anime" />
        <meta property="og:description" content="Discover movies, web series & anime. Find download links and request your favourites." />
        <link rel="canonical" href="https://flix-base.vercel.app" />
      </Head>

      <div className="min-h-screen bg-deep">
        <CinematicBackground />

        {/* ══ HERO ══ */}
        <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-10 overflow-hidden">
          <div className="orb absolute -top-40 left-10 w-[400px] h-[400px]" style={{ background: 'rgba(201,168,76,0.07)' }} />
          <div className="orb absolute top-0 right-0 w-[300px] h-[300px]" style={{ background: 'rgba(100,80,200,0.05)' }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center w-full max-w-2xl mx-auto"
          >
            {/* FLIXBASE animated logo */}
            <motion.div className="mb-3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.8 }}>
              <motion.h1
                className="font-cinzel font-bold tracking-[0.2em] leading-none select-none"
                style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                  background: 'linear-gradient(135deg, #f5e4a8 0%, #c9a84c 40%, #e8c87a 65%, #a07828 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.4))',
                }}
                animate={{ filter: [
                  'drop-shadow(0 0 20px rgba(201,168,76,0.3))',
                  'drop-shadow(0 0 45px rgba(201,168,76,0.6))',
                  'drop-shadow(0 0 20px rgba(201,168,76,0.3))',
                ]}}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                FLIXBASE
              </motion.h1>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                className="divider-gold w-48 mx-auto mt-2" />
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm font-light mb-5 leading-relaxed"
              style={{ color: '#8a8778', maxWidth: '440px', margin: '0.5rem auto 1.2rem' }}>
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

            {/* Live Matches banner */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="mt-5">
              <Link href="/live">
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(201,168,76,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl text-xs font-medium relative overflow-hidden cursor-pointer"
                  style={{ background: 'rgba(200,0,0,0.12)', border: '1px solid rgba(220,0,0,0.4)', color: '#ff4444' }}
                >
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(245,228,168,0.12) 50%,transparent 70%)' }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 1.5 }}
                  />
                  <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: '#ef4444' }}
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />

                   <span className="relative z-10 font-semibold">Watch IPL 2026 Live →</span>
                 
                </motion.div>
              </Link>
            </motion.div>

            {/* Telegram join banner */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              className="mt-3">
              <motion.a
                href="https://t.me/+n3etNnm3RxI5NGZl"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(34,158,217,0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-medium relative overflow-hidden"
                style={{ background: 'rgba(34,158,217,0.1)', border: '1px solid rgba(34,158,217,0.3)', color: '#4fc3f7' }}
              >
                {/* Shimmer */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(79,195,247,0.15) 50%,transparent 70%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 2 }}
                />
                <Send size={13} />
                <span className="relative z-10">Join our Telegram Channel for updates &amp; new movies</span>
                <span className="relative z-10 text-[10px] opacity-60">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ ALL TITLES ══ */}
        <section id="explore" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <Download size={13} style={{ color: '#c9a84c' }} />
            <span className="section-tag">{filter === 'All' ? 'All Titles' : filter}</span>
            <div className="flex-1 divider-soft" />
            <span className="text-[11px]" style={{ color: '#6a6a5a' }}>
              {filtered.length} titles
              {totalPages > 1 && <span style={{ color: '#4a4a3a' }}> · page {page}/{totalPages}</span>}
            </span>
          </div>

          {/* Loading skeletons */}
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

          {/* Movie Grid */}
          {!loading && !noResult && (
            <>
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
                <AnimatePresence>
                  {paginated.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
                </AnimatePresence>
              </motion.div>

              {/* ══ PAGINATION ══ */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 flex-wrap"
                >
                  {/* Prev */}
                  <motion.button
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    whileHover={page !== 1 ? { scale: 1.05 } : {}}
                    whileTap={page !== 1 ? { scale: 0.95 } : {}}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                    style={page === 1
                      ? { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#3a3a2a', cursor: 'not-allowed' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#b8b4a8', cursor: 'pointer' }
                    }
                  >
                    <ChevronLeft size={14} /> Prev
                  </motion.button>

                  {/* Page numbers */}
                  {getPageNumbers().map((p, i) => (
                    <motion.button
                      key={i}
                      onClick={() => p !== '...' && changePage(p)}
                      whileHover={p !== '...' ? { scale: 1.08 } : {}}
                      whileTap={p !== '...' ? { scale: 0.93 } : {}}
                      className="w-9 h-9 rounded-xl text-xs font-medium transition-all flex items-center justify-center"
                      style={p === page
                        ? { background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.45)', color: '#e8c87a',
                            boxShadow: '0 0 16px rgba(201,168,76,0.15)', cursor: 'default' }
                        : p === '...'
                          ? { background: 'transparent', border: 'none', color: '#4a4a3a', cursor: 'default' }
                          : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#8a8778', cursor: 'pointer' }
                      }
                    >
                      {p}
                    </motion.button>
                  ))}

                  {/* Next */}
                  <motion.button
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages}
                    whileHover={page !== totalPages ? { scale: 1.05 } : {}}
                    whileTap={page !== totalPages ? { scale: 0.95 } : {}}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                    style={page === totalPages
                      ? { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#3a3a2a', cursor: 'not-allowed' }
                      : { background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', cursor: 'pointer' }
                    }
                  >
                    Next <ChevronRight size={14} />
                  </motion.button>
                </motion.div>
              )}
            </>
          )}

          {/* Empty state */}
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

export async function getStaticProps() {
  try {
    const movies = await getMovies();
    return { props: { movies }, revalidate: 60 };
  } catch {
    return { props: { movies: [] }, revalidate: 60 };
  }
}
