import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getMovies, addMovie, updateMovie, deleteMovie, fulfillRequest, getRequests } from '../lib/supabase';
import AddMovieForm from '../components/AddMovieForm';
import CinematicBackground from '../components/CinematicBackground';
import { Plus, Pencil, Trash2, ArrowLeft, Shield, Film, CheckCircle2, Clock } from 'lucide-react';

export default function Admin() {
  const router  = useRouter();
  const [movies,   setMovies]   = useState([]);
  const [requests, setRequests] = useState([]);
  const [tab,      setTab]      = useState('movies');
  const [editing,  setEditing]  = useState(null);
  const [adding,   setAdding]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg,      setMsg]      = useState('');

  useEffect(() => {
    Promise.all([getMovies(), getRequests()])
      .then(([m, r]) => { setMovies(m); setRequests(r); })
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    if (router.query.edit) {
      const m = movies.find(x => x.id === router.query.edit);
      if (m) setEditing(m);
    }
  }, [router.query.edit, movies]);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      const m = await addMovie(data);
      setMovies(prev => [m, ...prev]);
      setAdding(false);
      flash('Movie added successfully!');
    } catch(e) { flash('Error: ' + e.message); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      const m = await updateMovie(editing.id, data);
      setMovies(prev => prev.map(x => x.id === m.id ? m : x));
      setEditing(null);
      flash('Movie updated!');
    } catch(e) { flash('Error: ' + e.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteMovie(id);
      setMovies(prev => prev.filter(x => x.id !== id));
      flash('Deleted.');
    } catch(e) { flash('Error: ' + e.message); }
  };

  const handleFulfill = async (id) => {
    try {
      const r = await fulfillRequest(id);
      setRequests(prev => prev.map(x => x.id === r.id ? r : x));
      flash('Marked as fulfilled!');
    } catch(e) { flash('Error: ' + e.message); }
  };

  return (
    <div className="min-h-screen bg-grid">
      <CinematicBackground />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Link href="/" data-hover>
            <motion.div whileHover={{ x: -4 }} className="inline-flex items-center gap-2 text-[#6b6b8a] hover:text-[#c9a84c] transition-colors text-sm mb-4">
              <ArrowLeft size={16} /> Back to Explore
            </motion.div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center">
              <Shield size={18} className="text-[#c9a84c]" />
            </div>
            <div>
              <h1 className="font-cinzel font-bold text-2xl text-[#e8e6f0] tracking-widest" style={{ fontFamily: 'Orbitron, monospace' }}>
                ADMIN PANEL
              </h1>
              <p className="text-[#6b6b8a] text-xs mt-0.5">Manage movies, series and requests</p>
            </div>
          </div>
        </motion.div>

        {/* Flash message */}
        <AnimatePresence>
          {msg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c' }}
            >
              {msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'movies',   label: 'Movies',   icon: Film,         count: movies.length       },
            { id: 'requests', label: 'Requests', icon: Clock,        count: requests.filter(r=>!r.fulfilled).length },
          ].map(({ id, label, icon: Icon, count }) => (
            <motion.button
              key={id}
              onClick={() => setTab(id)}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === id
                  ? 'bg-[rgba(201,168,76,0.1)] text-[#c9a84c] border border-[rgba(201,168,76,0.25)]'
                  : 'bg-white/[0.03] text-[#6b6b8a] border border-white/[0.08] hover:text-[#e8e6f0]'
              }`}
              data-hover
            >
              <Icon size={15} />
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab===id?'bg-[rgba(201,168,76,0.2)] text-[#c9a84c]':'bg-white/[0.06] text-[#6b6b8a]'}`}>{count}</span>
            </motion.button>
          ))}
        </div>

        {/* ── Movies Tab ── */}
        {tab === 'movies' && (
          <div>
            <div className="flex justify-end mb-4">
              <motion.button
                onClick={() => { setAdding(true); setEditing(null); }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                data-hover
              >
                <Plus size={16} /> Add New Movie
              </motion.button>
            </div>

            {/* Add form */}
            <AnimatePresence>
              {adding && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-6 rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[rgba(13,13,26,0.8)]">
                    <div className="text-[11px] uppercase tracking-[3px] text-[#c9a84c] mb-5">New Movie</div>
                    <AddMovieForm onSave={handleAdd} onCancel={() => setAdding(false)} loading={loading} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Edit form */}
            <AnimatePresence>
              {editing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-6 rounded-2xl border border-[rgba(255,0,128,0.2)] bg-[rgba(13,13,26,0.8)]">
                    <div className="text-[11px] uppercase tracking-[3px] text-[#ff0080] mb-5">Editing: {editing.title}</div>
                    <AddMovieForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} loading={loading} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Movies list */}
            {fetching ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="shimmer h-16 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {movies.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-[rgba(13,13,26,0.5)] hover:border-white/[0.12] transition-colors"
                  >
                    {m.poster_url ? (
                      <img src={m.poster_url} alt={m.title} className="w-10 h-14 object-cover rounded-lg flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-14 bg-[#131325] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Film size={16} className="text-[#6b6b8a]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#e8e6f0] text-sm truncate">{m.title}</div>
                      <div className="text-[#6b6b8a] text-xs mt-0.5">{m.year} · {m.type} · {(m.links||[]).length} links</div>
                    </div>
                    {m.featured && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full hidden sm:block"
                        style={{ background: 'rgba(255,0,128,0.1)', border: '1px solid rgba(255,0,128,0.25)', color: '#ff0080' }}>
                        Featured
                      </span>
                    )}
                    <div className="flex gap-2 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => { setEditing(m); setAdding(false); }}
                        className="btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                        data-hover
                      >
                        <Pencil size={12} /> Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(m.id, m.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors text-red-400/60 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 hover:bg-red-400/5"
                        data-hover
                      >
                        <Trash2 size={12} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Requests Tab ── */}
        {tab === 'requests' && (
          <div className="space-y-3">
            {fetching ? (
              [...Array(3)].map((_, i) => <div key={i} className="shimmer h-20 rounded-xl" />)
            ) : requests.length === 0 ? (
              <div className="text-center py-16 text-[#6b6b8a]">No requests yet.</div>
            ) : (
              requests.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.07] bg-[rgba(13,13,26,0.5)]"
                  style={r.fulfilled ? { opacity: 0.5 } : {}}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[#e8e6f0] text-sm">{r.title}</span>
                      {r.fulfilled && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: '#c9a84c' }}>
                          Added ✓
                        </span>
                      )}
                    </div>
                    <div className="text-[#6b6b8a] text-xs mt-1">by {r.requested_by || 'Anonymous'}</div>
                    {r.note && <div className="text-[#8888a0] text-xs mt-1.5 leading-relaxed">{r.note}</div>}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gold-glow font-cinzel" style={{ fontFamily: 'Orbitron, monospace' }}>{r.votes}</div>
                      <div className="text-[10px] text-[#6b6b8a] uppercase tracking-wider">votes</div>
                    </div>
                    {!r.fulfilled && (
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => handleFulfill(r.id)}
                        className="btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                        data-hover
                      >
                        <CheckCircle2 size={13} /> Mark Added
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
