import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { addMovie } from '../lib/supabase';
import CinematicBackground from '../components/CinematicBackground';
import { Film, Plus, Trash2, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';

const PLATFORMS = [
  { name: 'Telegram',     color: '#229ED9' },
  { name: 'Google Drive', color: '#4285F4' },
  { name: 'Mega.nz',      color: '#D9272E' },
  { name: 'MediaFire',    color: '#1B82E4' },
  { name: 'Filmyzilla',   color: '#e05c3a' },
  { name: 'Filmywap',     color: '#c0392b' },
  { name: '1Fichier',     color: '#55a05b' },
  { name: 'YouTube',      color: '#FF0000' },
  { name: 'Custom',       color: '#c9a84c' },
];

const EMPTY = { title:'', year:'', type:'Movie', language:'', genre:'', rating:'', poster_url:'', overview:'', uploaded_by:'', featured:false };

export default function Submit() {
  const [form,    setForm]    = useState(EMPTY);
  const [links, setLinks] = useState([]);
  const [watchLinks, setWatchLinks] = useState([]);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const addLink    = () => setLinks(l => [...l, { label:'', info:'', url:'', color:'#c9a84c' }]);
  const setLink    = (i, k, v) => setLinks(l => l.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const removeLink = i => setLinks(l => l.filter((_, idx) => idx !== i));
  const applyPlatform = (i, p) => setLinks(l => l.map((x, idx) => idx === i ? { ...x, label: p.name, color: p.color } : x));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await addMovie({ ...form, links: links.filter(l => l.url) });
      setSuccess(true);
      setForm(EMPTY);
      setLinks([]);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="min-h-screen bg-deep flex items-center justify-center">
      <CinematicBackground />
      <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
        className="relative z-10 text-center px-6 max-w-md">
        <motion.div animate={{ scale:[1,1.15,1] }} transition={{ repeat:Infinity, duration:2 }}>
          <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color:'#c9a84c' }} />
        </motion.div>
        <h2 className="font-cinzel text-2xl mb-3" style={{ fontFamily:'Cinzel,serif', color:'#e8c87a' }}>Movie Added!</h2>
        <p className="text-sm mb-6" style={{ color:'#8a8778' }}>
          {form.uploaded_by
            ? `Thank you ${form.uploaded_by || ''}! Your movie has been added to the library.`
            : 'Your movie has been added to the library.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <motion.div whileHover={{ scale:1.03 }} className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
              <Film size={14} /> Browse Library
            </motion.div>
          </Link>
          <motion.button whileHover={{ scale:1.03 }} onClick={() => setSuccess(false)}
            className="btn-ghost flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
            <Plus size={14} /> Add Another
          </motion.button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-deep">
      <CinematicBackground />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} className="mb-6">
          <Link href="/">
            <motion.div whileHover={{ x:-3 }} className="inline-flex items-center gap-1.5 text-xs transition-colors"
              style={{ color:'#6a6a5a' }}
              onMouseEnter={e=>e.currentTarget.style.color='#c9a84c'}
              onMouseLeave={e=>e.currentTarget.style.color='#6a6a5a'}>
              <ArrowLeft size={13} /> Back to Library
            </motion.div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} className="mb-8">
          <h1 className="font-cinzel font-semibold mb-1.5"
            style={{ fontFamily:'Cinzel,serif', fontSize:'1.6rem', letterSpacing:'0.08em',
              background:'linear-gradient(135deg,#f5e4a8,#c9a84c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Add a Movie
          </h1>
          <p className="text-xs" style={{ color:'#6a6a5a' }}>
            Share a movie or series with the community. Only Title is required — everything else is optional.
          </p>
          <div className="divider-gold w-20 mt-3" />
        </motion.div>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="space-y-5 p-6 rounded-2xl"
          style={{ background:'rgba(20,20,30,0.6)', border:'1px solid rgba(201,168,76,0.12)', backdropFilter:'blur(20px)' }}>

          {/* Uploader name — prominent */}
          <div className="p-4 rounded-xl" style={{ background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.15)' }}>
            <label className="block text-[11px] font-semibold mb-1.5 tracking-[2px] uppercase" style={{ color:'#c9a84c' }}>
              Your Name — so we can credit you ✦
            </label>
            <input className="input-dark w-full px-3 py-2 rounded-lg text-sm"
              value={form.uploaded_by} onChange={e => set('uploaded_by', e.target.value)}
              placeholder="e.g. Keshav, Rahul, Anonymous..." />
            <p className="text-[10px] mt-1.5" style={{ color:'#4a4a3a' }}>
              Will show as "Uploaded by {form.uploaded_by || 'you'}" on the movie page
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>
              Title <span style={{ color:'#e05c3a' }}>*</span>
            </label>
            <input className={`input-dark w-full px-3 py-2 rounded-lg text-sm ${errors.title ? 'border-red-500/40' : ''}`}
              value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="e.g. Pushpa 2, Attack on Titan S4..." />
            {errors.title && <p className="text-red-400/80 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Year <span style={{ color:'#4a4a3a' }}>optional</span></label>
              <input className="input-dark w-full px-3 py-2 rounded-lg text-sm" value={form.year} onChange={e => set('year', e.target.value)} placeholder="2024" />
            </div>
            <div>
              <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Type <span style={{ color:'#4a4a3a' }}>optional</span></label>
              <select className="input-dark w-full px-3 py-2 rounded-lg text-sm cursor-pointer" value={form.type} onChange={e => set('type', e.target.value)}
                style={{ background:'rgba(255,255,255,0.03)' }}>
                {['Movie','Series','Anime','Documentary','Short Film'].map(t =>
                  <option key={t} value={t} style={{ background:'#0f0f16' }}>{t}</option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Language <span style={{ color:'#4a4a3a' }}>optional</span></label>
              <input className="input-dark w-full px-3 py-2 rounded-lg text-sm" value={form.language} onChange={e => set('language', e.target.value)} placeholder="Hindi, English, Japanese..." />
            </div>
            <div>
              <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Genre <span style={{ color:'#4a4a3a' }}>optional</span></label>
              <input className="input-dark w-full px-3 py-2 rounded-lg text-sm" value={form.genre} onChange={e => set('genre', e.target.value)} placeholder="Action, Romance, Thriller..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Rating <span style={{ color:'#4a4a3a' }}>optional</span></label>
              <input className="input-dark w-full px-3 py-2 rounded-lg text-sm" value={form.rating} onChange={e => set('rating', e.target.value)} placeholder="8.5 out of 10" />
            </div>
            <div />
          </div>

          <div>
            <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Poster Image URL <span style={{ color:'#4a4a3a' }}>optional</span></label>
            <input className="input-dark w-full px-3 py-2 rounded-lg text-sm" value={form.poster_url} onChange={e => set('poster_url', e.target.value)} placeholder="https://...jpg" />
            {form.poster_url && (
              <div className="mt-2 flex gap-2 items-center">
                <img src={form.poster_url} alt="preview" className="w-10 h-14 object-cover rounded-lg"
                  style={{ border:'1px solid rgba(201,168,76,0.2)' }} onError={e => e.target.style.display='none'} />
                <span className="text-[10px]" style={{ color:'#6a6a5a' }}>Poster preview</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Overview <span style={{ color:'#4a4a3a' }}>optional</span></label>
            <textarea className="input-dark w-full px-3 py-2 rounded-lg text-sm resize-none" rows={3}
              value={form.overview} onChange={e => set('overview', e.target.value)}
              placeholder="Short plot description..." />
          </div>

     {/* Watch Online Links */}
<div>
  <div className="flex items-center justify-between mb-3">
    <div>
      <span className="text-[10px] font-medium tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Watch Online Links </span>
      <span className="text-[10px]" style={{ color:'#3a3a2a' }}>optional</span>
    </div>
    <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
      onClick={() => setWatchLinks(l=>[...l,{label:'',url:''}])}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
      style={{ background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.3)', color:'#60a5fa' }}>
      <Plus size={11} /> Add Link
    </motion.button>
  </div>
  <AnimatePresence>
    {watchLinks.map((link, i) => (
      <motion.div key={i}
        initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, height:0 }}
        className="mb-3 p-3 rounded-xl"
        style={{ background:'rgba(59,130,246,0.04)', border:'1px solid rgba(59,130,246,0.15)' }}>
        <div className="flex gap-2 items-center flex-wrap">
          <input className="input-dark flex-1 min-w-[120px] px-2.5 py-1.5 rounded-lg text-xs"
            value={link.label}
            onChange={e => setWatchLinks(l=>l.map((x,idx)=>idx===i?{...x,label:e.target.value}:x))}
            placeholder="Label (e.g. Watch HD)" />
          <input className="input-dark flex-[2] min-w-[150px] px-2.5 py-1.5 rounded-lg text-xs"
            value={link.url}
            onChange={e => setWatchLinks(l=>l.map((x,idx)=>idx===i?{...x,url:e.target.value}:x))}
            placeholder="Stream URL" />
          <button onClick={() => setWatchLinks(l=>l.filter((_,idx)=>idx!==i))}
            style={{ color:'#e05c3a44' }}
            onMouseEnter={e=>e.currentTarget.style.color='#e05c3a'}
            onMouseLeave={e=>e.currentTarget.style.color='#e05c3a44'}>
            <Trash2 size={14} />
          </button>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
  {watchLinks.length === 0 && (
    <div className="text-center py-3 rounded-xl text-xs"
      style={{ color:'#3a3a2a', border:'1px dashed rgba(59,130,246,0.12)' }}>
      No watch links yet — click Add Link above
    </div>
  )}
</div>
        
          {/* Download Links */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-medium tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>Download Links </span>
                <span className="text-[10px]" style={{ color:'#4a4a3a' }}>optional</span>
              </div>
              <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={addLink}
                className="btn-primary flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs">
                <Plus size={11} /> Add Link
              </motion.button>
            </div>

            <AnimatePresence>
              {links.map((link, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, height:0 }}
                  className="mb-3 p-3 rounded-xl space-y-2.5"
                  style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)' }}>

                  {/* Platform presets */}
                  <div className="flex flex-wrap gap-1.5">
                    {PLATFORMS.map(p => (
                      <button key={p.name} onClick={() => applyPlatform(i, p)}
                        className="text-[10px] px-2 py-0.5 rounded-md transition-all"
                        style={{
                          background: link.label === p.name ? p.color+'22' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${link.label === p.name ? p.color+'55' : 'rgba(255,255,255,0.07)'}`,
                          color: link.label === p.name ? p.color : '#6a6a5a',
                        }}>
                        {p.name}
                      </button>
                    ))}
                  </div>

                  {/* Info field — e.g. Season 1 Ep 1, 1080p, 4K */}
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase mb-1" style={{ color:'#4a4a3a' }}>
                      Link Info — what is this link? (e.g. 1080p HD, Season 1 Ep 1-12, 4K, 480p)
                    </label>
                    <input className="input-dark w-full px-2.5 py-1.5 rounded-lg text-xs"
                      value={link.info || ''} onChange={e => setLink(i, 'info', e.target.value)}
                      placeholder="e.g.  1080p HD  /  Season 1 Episode 1  /  4K HDR  /  480p" />
                  </div>

                  <div className="flex gap-2 items-center flex-wrap">
                    <input className="input-dark flex-1 min-w-[90px] px-2.5 py-1.5 rounded-lg text-xs"
                      value={link.label} onChange={e => setLink(i, 'label', e.target.value)}
                      placeholder="Platform name" />
                    <input className="input-dark flex-[2] min-w-[130px] px-2.5 py-1.5 rounded-lg text-xs"
                      value={link.url} onChange={e => setLink(i, 'url', e.target.value)}
                      placeholder="Download or watch URL" />
                    <input type="color" value={link.color || '#c9a84c'} onChange={e => setLink(i, 'color', e.target.value)}
                      className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0" />
                    <button onClick={() => removeLink(i)} style={{ color:'#e05c3a44' }}
                      onMouseEnter={e => e.currentTarget.style.color='#e05c3a'}
                      onMouseLeave={e => e.currentTarget.style.color='#e05c3a44'}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {links.length === 0 && (
              <div className="text-center py-4 rounded-xl text-xs" style={{ color:'#4a4a3a', border:'1px dashed rgba(255,255,255,0.06)' }}>
                No download links yet — click Add Link above
              </div>
            )}
          </div>

          {errors.submit && <p className="text-red-400/80 text-xs">{errors.submit}</p>}

          <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
            onClick={handleSubmit} disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium">
            {loading
              ? <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1, ease:'linear' }}><Film size={16}/></motion.div>
              : <Save size={16} />}
            {loading ? 'Adding to Library...' : 'Add to FlixBase Library'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
