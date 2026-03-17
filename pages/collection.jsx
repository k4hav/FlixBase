import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CinematicBackground from '../components/CinematicBackground';
import { useCollection } from '../hooks/useCollection';
import { Heart, Trash2, Film, ArrowRight, Star, BookOpen } from 'lucide-react';

export default function Collection() {
  const { collection, removeFromCollection, clearCollection, loaded } = useCollection();
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="min-h-screen bg-deep">
      <CinematicBackground />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-1/4 top-1/3 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(201,168,76,0.2)', filter: 'blur(8px)' }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
                <div className="relative w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.28)' }}>
                  <Heart size={18} style={{ color: '#c9a84c' }} />
                </div>
              </div>
              <div>
                <h1 className="font-cinzel font-bold text-2xl tracking-widest"
                  style={{ fontFamily: 'Cinzel,serif',
                    background: 'linear-gradient(135deg,#f5e4a8,#c9a84c)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  My Collection
                </h1>
                <p className="text-xs mt-0.5" style={{ color: '#4a4a3a' }}>
                  Saved in your browser · {collection.length} title{collection.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {collection.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs"
                style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', color: '#e57373' }}>
                <Trash2 size={12} /> Clear All
              </motion.button>
            )}
          </div>

          {/* Info banner */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl text-xs"
            style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <BookOpen size={13} style={{ color: '#c9a84c', flexShrink: 0, marginTop: 1 }} />
            <span style={{ color: '#6a6a5a' }}>
              Your collection is saved in <span style={{ color: '#c9a84c' }}>this browser only</span> — it stays even after you close the tab.
              Heart any movie to add it here.
            </span>
          </motion.div>
        </motion.div>

        {/* Confirm clear modal */}
        <AnimatePresence>
          {confirmClear && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              style={{ background: 'rgba(4,4,13,0.85)', backdropFilter: 'blur(10px)' }}
              onClick={() => setConfirmClear(false)}>
              <motion.div initial={{ scale: 0.88, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88 }}
                onClick={e => e.stopPropagation()}
                className="max-w-sm w-full p-6 rounded-2xl text-center"
                style={{ background: 'rgba(14,14,22,0.95)', border: '1px solid rgba(192,57,43,0.3)' }}>
                <Trash2 size={36} className="mx-auto mb-3" style={{ color: '#e57373' }} />
                <h3 className="font-cinzel text-base mb-2" style={{ fontFamily: 'Cinzel,serif', color: '#f0eee8' }}>Clear collection?</h3>
                <p className="text-xs mb-6" style={{ color: '#6a6a5a' }}>All {collection.length} saved titles will be removed.</p>
                <div className="flex gap-3 justify-center">
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => { clearCollection(); setConfirmClear(false); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
                    style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.35)', color: '#e57373' }}>
                    <Trash2 size={13} /> Clear All
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => setConfirmClear(false)}
                    className="btn-ghost px-5 py-2.5 rounded-xl text-sm">Cancel</motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {loaded && collection.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-24">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <Heart size={32} style={{ color: 'rgba(201,168,76,0.4)' }} />
            </motion.div>
            <h3 className="font-cinzel text-xl mb-2" style={{ fontFamily: 'Cinzel,serif', color: '#6a6a5a' }}>
              Nothing saved yet
            </h3>
            <p className="text-sm mb-6" style={{ color: '#4a4a3a' }}>
              Heart any movie or series to save it here.
            </p>
            <Link href="/">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm">
                <Film size={14} /> Browse Library <ArrowRight size={13} />
              </motion.div>
            </Link>
          </motion.div>
        )}

        {/* Collection grid */}
        {loaded && collection.length > 0 && (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <AnimatePresence>
              {collection.map((movie, i) => (
                <motion.div key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  layout
                >
                  <div className="group relative rounded-xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg,rgba(26,26,40,0.9),rgba(15,15,22,0.95))',
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    }}>

                    {/* Remove button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCollection(movie.id)}
                      className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(192,57,43,0.8)', backdropFilter: 'blur(4px)' }}
                      title="Remove from collection"
                    >
                      <Trash2 size={11} color="#fff" />
                    </motion.button>

                    {/* Saved heart badge */}
                    <div className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)' }}>
                      <Heart size={10} fill="#c9a84c" style={{ color: '#c9a84c' }} />
                    </div>

                    <Link href={`/movies/${movie.id}`}>
                      <div className="cursor-pointer">
                        <div className="relative aspect-[2/3] overflow-hidden">
                          {movie.poster_url ? (
                            <img src={movie.poster_url} alt={movie.title} loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                            />
                          ) : null}
                          <div className="w-full h-full bg-[#13131e] items-center justify-center"
                            style={{ display: movie.poster_url ? 'none' : 'flex' }}>
                            <Film size={28} style={{ color: '#4a4a3a' }} />
                          </div>
                          <div className="absolute inset-0 poster-fade" />
                          {movie.type && (
                            <div className="absolute bottom-2 left-2 z-10">
                              <span className={`badge ${movie.type==='Series'?'badge-blue':movie.type==='Anime'?'badge-purple':'badge-muted'}`}>
                                {movie.type}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-3">
                          <h3 className="font-medium text-sm leading-snug mb-1 line-clamp-2"
                            style={{ color: '#e8e4d8' }}>
                            {movie.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px]" style={{ color: '#6a6a5a' }}>
                              {movie.year}{movie.language ? ` · ${movie.language}` : ''}
                            </span>
                            {movie.rating && (
                              <span className="flex items-center gap-0.5 text-[11px]" style={{ color: '#c9a84c' }}>
                                <Star size={9} fill="currentColor" />{movie.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
