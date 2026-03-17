import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getMovies, addMovie, updateMovie, deleteMovie, fulfillRequest, getRequests } from '../lib/supabase';
import AddMovieForm from '../components/AddMovieForm';
import CinematicBackground from '../components/CinematicBackground';
import { Plus, Pencil, Trash2, ArrowLeft, Shield, Film, CheckCircle2, Clock, X } from 'lucide-react';

export default function Admin() {
  const router   = useRouter();
  const [movies,   setMovies]   = useState([]);
  const [requests, setRequests] = useState([]);
  const [tab,      setTab]      = useState('movies');
  const [editing,  setEditing]  = useState(null);
  const [adding,   setAdding]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg,      setMsg]      = useState('');
  // Confirm delete modal
  const [confirmDelete, setConfirmDelete] = useState(null); // movie object

  useEffect(() => {
    Promise.all([getMovies(), getRequests()])
      .then(([m, r]) => { setMovies(m); setRequests(r); })
      .finally(() => setFetching(false));
  }, []);

  // Auto-open edit form if ?edit=id in URL
  useEffect(() => {
    if (router.query.edit && movies.length > 0) {
      const m = movies.find(x => x.id === router.query.edit);
      if (m) { setEditing(m); setAdding(false); setTab('movies'); }
    }
  }, [router.query.edit, movies]);

  const flash = (text, good = true) => {
    setMsg({ text, good });
    setTimeout(() => setMsg(''), 3500);
  };

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      const m = await addMovie(data);
      setMovies(prev => [m, ...prev]);
      setAdding(false);
      flash('Movie added successfully!');
    } catch (e) { flash('Error: ' + e.message, false); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      const m = await updateMovie(editing.id, data);
      setMovies(prev => prev.map(x => x.id === m.id ? m : x));
      setEditing(null);
      router.replace('/admin', undefined, { shallow: true });
      flash('Movie updated!');
    } catch (e) { flash('Error: ' + e.message, false); }
    finally { setLoading(false); }
  };

  const handleDelete = async (movie) => {
    setConfirmDelete(null);
    try {
      await deleteMovie(movie.id);
      setMovies(prev => prev.filter(x => x.id !== movie.id));
      if (editing?.id === movie.id) setEditing(null);
      flash('Deleted.');
    } catch (e) { flash('Error: ' + e.message, false); }
  };

  const handleFulfill = async (id) => {
    try {
      const r = await fulfillRequest(id);
      setRequests(prev => prev.map(x => x.id === r.id ? r : x));
      flash('Marked as fulfilled!');
    } catch (e) { flash('Error: ' + e.message, false); }
  };

  return (
    <div className="min-h-screen bg-deep">
      <CinematicBackground />

      {/* ── Confirm Delete Modal ── */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(4,4,13,0.85)', backdropFilter: 'blur(10px)' }}
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-sm w-full p-6 rounded-2xl text-center"
              style={{ background: 'rgba(14,14,22,0.95)', border: '1px solid rgba(192,57,43,0.3)' }}
            >
              {/* Red glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: '0 0 40px rgba(192,57,43,0.1) inset' }} />

              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)' }}>
                <Trash2 size={20} style={{ color: '#e57373' }} />
              </div>

              <h3 className="font-cinzel font-semibold text-base mb-2"
                style={{ fontFamily: 'Cinzel,serif', color: '#f0eee8' }}>Delete Movie?</h3>
              <p className="text-sm mb-1" style={{ color: '#8a8778' }}>
                <span style={{ color: '#e8c87a' }}>{confirmDelete.title}</span>
              </p>
              <p className="text-xs mb-6" style={{ color: '#4a4a3a' }}>This cannot be undone.</p>

              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => handleDelete(confirmDelete)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
                  style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.35)', color: '#e57373' }}>
                  <Trash2 size={14} /> Yes, Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setConfirmDelete(null)}
                  className="btn-ghost flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
                  <X size={14} /> Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-20">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <motion.div whileHover={{ x: -3 }} className="inline-flex items-center gap-1.5 text-xs mb-4 transition-colors"
              style={{ color: '#6a6a5a' }}
              onMouseEnter={e => e.currentTarget.style.color='#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.color='#6a6a5a'}>
              <ArrowLeft size={13} /> Back to Library
            </motion.div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(201,168,76,0.2)', filter: 'blur(8px)' }}
                animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2.5 }} />
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
                <Shield size={17} style={{ color: '#c9a84c' }} />
              </div>
            </div>
            <div>
              <h1 className="font-cinzel font-bold text-xl tracking-widest"
                style={{ fontFamily: 'Cinzel,serif', color: '#e8c87a' }}>Admin Panel</h1>
              <p className="text-[11px] mt-0.5" style={{ color: '#4a4a3a' }}>Manage movies and requests</p>
            </div>
          </div>
        </motion.div>

        {/* Flash msg */}
        <AnimatePresence>
          {msg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-5 px-4 py-3 rounded-xl text-sm"
              style={msg.good
                ? { background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c' }
                : { background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', color: '#e57373' }
              }>
              {msg.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex gap-2 mb-7">
          {[
            { id: 'movies',   label: 'Movies',   icon: Film,  count: movies.length },
            { id: 'requests', label: 'Requests', icon: Clock, count: requests.filter(r=>!r.fulfilled).length },
          ].map(({ id, label, icon: Icon, count }) => (
            <motion.button key={id} onClick={() => setTab(id)}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={tab === id
                ? { color: '#c9a84c', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.22)' }
                : { color: '#6a6a5a', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }
              }>
              <Icon size={14} /> {label}
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={tab===id?{background:'rgba(201,168,76,0.18)',color:'#c9a84c'}:{background:'rgba(255,255,255,0.05)',color:'#6a6a5a'}}>
                {count}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── MOVIES TAB ── */}
        {tab === 'movies' && (
          <div>
            <div className="flex justify-end mb-4">
              <motion.button onClick={() => { setAdding(true); setEditing(null); }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium">
                <Plus size={15} /> Add New Movie
              </motion.button>
            </div>

            {/* Add form */}
            <AnimatePresence>
              {adding && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                  className="mb-6 overflow-hidden">
                  <div className="p-6 rounded-2xl" style={{ background:'rgba(14,14,22,0.85)', border:'1px solid rgba(201,168,76,0.15)' }}>
                    <div className="section-tag mb-5">New Movie</div>
                    <AddMovieForm onSave={handleAdd} onCancel={() => setAdding(false)} loading={loading} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Edit form */}
            <AnimatePresence>
              {editing && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                  className="mb-6 overflow-hidden">
                  <div className="p-6 rounded-2xl" style={{ background:'rgba(14,14,22,0.85)', border:'1px solid rgba(201,168,76,0.2)' }}>
                    <div className="flex items-center justify-between mb-5">
                      <div className="section-tag" style={{ color:'#e8c87a' }}>Editing: {editing.title}</div>
                      {/* Delete button inside edit form */}
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setConfirmDelete(editing)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                        style={{ background:'rgba(192,57,43,0.1)', border:'1px solid rgba(192,57,43,0.25)', color:'#e57373' }}>
                        <Trash2 size={12} /> Delete this Movie
                      </motion.button>
                    </div>
                    <AddMovieForm
                      initial={editing}
                      onSave={handleUpdate}
                      onCancel={() => { setEditing(null); router.replace('/admin', undefined, { shallow:true }); }}
                      loading={loading}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Movies list */}
            {fetching ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => <div key={i} className="shimmer h-16 rounded-xl" />)}
              </div>
            ) : movies.length === 0 ? (
              <div className="text-center py-16 text-sm" style={{ color:'#4a4a3a' }}>No movies yet.</div>
            ) : (
              <div className="space-y-3">
                {movies.map((m, i) => (
                  <motion.div key={m.id}
                    initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.04 }}
                    className="flex items-center gap-4 p-4 rounded-xl transition-colors group"
                    style={{ background:'rgba(14,14,22,0.5)', border:'1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(201,168,76,0.15)'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'}
                  >
                    {m.poster_url
                      ? <img src={m.poster_url} alt={m.title} className="w-10 h-14 object-cover rounded-lg flex-shrink-0"
                          style={{ border:'1px solid rgba(255,255,255,0.08)' }} onError={e=>e.target.style.display='none'} />
                      : <div className="w-10 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background:'#131320' }}><Film size={14} style={{ color:'#4a4a3a' }} /></div>
                    }
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate" style={{ color:'#e8e4d8' }}>{m.title}</div>
                      <div className="text-xs mt-0.5" style={{ color:'#6a6a5a' }}>
                        {m.year} · {m.type} · {(m.links||[]).length} links
                        {m.uploaded_by && <span style={{ color:'#4a4a3a' }}> · by {m.uploaded_by}</span>}
                      </div>
                    </div>
                    {m.featured && (
                      <span className="badge badge-gold hidden sm:inline-block">Featured</span>
                    )}
                    <div className="flex gap-2 flex-shrink-0">
                      <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                        onClick={() => { setEditing(m); setAdding(false); }}
                        className="btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                        <Pencil size={11} /> Edit
                      </motion.button>
                      <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                        onClick={() => setConfirmDelete(m)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                        style={{ background:'rgba(192,57,43,0.08)', border:'1px solid rgba(192,57,43,0.2)', color:'#e57373' }}>
                        <Trash2 size={11} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── REQUESTS TAB ── */}
        {tab === 'requests' && (
          <div className="space-y-3">
            {fetching ? (
              [...Array(3)].map((_, i) => <div key={i} className="shimmer h-20 rounded-xl" />)
            ) : requests.length === 0 ? (
              <div className="text-center py-16 text-sm" style={{ color:'#4a4a3a' }}>No requests yet.</div>
            ) : (
              requests.map((r, i) => (
                <motion.div key={r.id}
                  initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background:'rgba(14,14,22,0.5)', border:'1px solid rgba(255,255,255,0.06)', opacity: r.fulfilled ? 0.5 : 1 }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm" style={{ color:'#e8e4d8' }}>{r.title}</span>
                      {r.fulfilled && (
                        <span className="badge badge-gold text-[10px]">Added ✓</span>
                      )}
                    </div>
                    <div className="text-xs mt-1" style={{ color:'#4a4a3a' }}>by {r.requested_by||'Anonymous'}</div>
                    {r.note && <div className="text-xs mt-1.5 leading-relaxed" style={{ color:'#6a6a5a' }}>{r.note}</div>}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color:'#c9a84c', fontFamily:'Cinzel,serif' }}>{r.votes}</div>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color:'#4a4a3a' }}>votes</div>
                    </div>
                    {!r.fulfilled && (
                      <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                        onClick={() => handleFulfill(r.id)}
                        className="btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs">
                        <CheckCircle2 size={12} /> Mark Added
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
