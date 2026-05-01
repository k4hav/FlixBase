import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, X, Film } from 'lucide-react';

const PLATFORMS = [
  { name: 'V-Cloud',  color: '#e05c3a' },
  { name: 'Hubcloud',    color: '#c0392b' },
  { name: 'Telegram',    color: '#229ED9' },
  { name: 'Drive',       color: '#4285F4' },
  { name: 'Mega.nz',     color: '#D9272E' },
  { name: 'MediaFire',   color: '#1B82E4' },
  { name: '1Fichier',    color: '#55a05b' },
  { name: 'Netflix',     color: '#E50914' },
  { name: 'Amazon Prime',color: '#00A8E1' },
  { name: 'GDflix',   color: '#6B4DE6' },
  { name: 'FLIXBASE',     color: '#FF0000' },
  { name: 'Custom',      color: '#c9a84c' },
];

const EMPTY = { title:'', year:'', type:'Movie', language:'', genre:'', rating:'', poster_url:'', overview:'', featured:false };

export default function AddMovieForm({ initial=null, onSave, onCancel, loading=false }) {
  const [form, setForm]     = useState(initial || EMPTY);
  const [links, setLinks] = useState(initial?.links || []);
  const [watchLinks, setWatchLinks] = useState(initial?.watch_links || []);
  const [watchLinks, setWatchLinks] = useState(initial?.watch_links || []);
  const [errors, setErrors] = useState({});

  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:''})); };

  const addLink = () => setLinks(l=>[...l,{label:'',url:'',color:'#c9a84c'}]);
  const setLink = (i,k,v) => setLinks(l=>l.map((x,idx)=>idx===i?{...x,[k]:v}:x));
  const removeLink = i => setLinks(l=>l.filter((_,idx)=>idx!==i));
  const applyPlatform = (i,p) => setLinks(l=>l.map((x,idx)=>idx===i?{...x,label:p.name,color:p.color}:x));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ ...form, links: links.filter(l=>l.url), platforms: form.platforms||[], watch_links: watchLinks.filter(l=>l.url) });
  };

  const F = (k, label, placeholder, opts={}) => (
    <div>
      <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase"
        style={{ color: '#6a6a5a' }}>
        {label} {opts.required && <span style={{ color: '#e05c3a' }}>*</span>}
        {!opts.required && <span style={{ color: '#4a4a3a', letterSpacing: 0 }}> — optional</span>}
      </label>
      <input className={`input-dark w-full px-3 py-2 rounded-lg text-sm ${errors[k]?'border-red-500/40':''}`}
        value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={placeholder} />
      {errors[k] && <p className="text-red-400/80 text-xs mt-1">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Title */}
      {F('title', 'Movie / Series Title', 'e.g. Pushpa 2: The Rule', { required: true })}

      {/* Row */}
      <div className="grid grid-cols-2 gap-3">
        {F('year', 'Year', '2024')}
        <div>
          <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color: '#6a6a5a' }}>
            Type — <span style={{ color: '#4a4a3a', letterSpacing: 0 }}>optional</span>
          </label>
          <select className="input-dark w-full px-3 py-2 rounded-lg text-sm cursor-pointer"
            value={form.type} onChange={e=>set('type',e.target.value)}
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            {['Movie','Series','Documentary','Short Film'].map(t=>
              <option key={t} value={t} style={{ background: '#0f0f16' }}>{t}</option>
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {F('language', 'Language', 'Hindi, English...')}
        {F('genre', 'Genre', 'Action, Drama...')}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {F('rating', 'Rating', '8.5  (out of 10)')}
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e=>set('featured',e.target.checked)}
              className="w-4 h-4 rounded accent-amber-400" />
            <span className="text-xs" style={{ color: '#b8b4a8' }}>Mark as Featured</span>
          </label>
        </div>
      </div>

      {F('poster_url', 'Poster Image URL', 'https://...jpg or paste any image link')}
      {form.poster_url && (
        <div className="flex gap-3 items-start">
          <img src={form.poster_url} alt="preview"
            className="w-14 h-20 object-cover rounded-lg border" style={{ borderColor: 'rgba(201,168,76,0.2)' }}
            onError={e=>e.target.style.display='none'} />
          <p className="text-[11px] mt-1" style={{ color: '#6a6a5a' }}>Poster preview</p>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color: '#6a6a5a' }}>
          Overview — <span style={{ color: '#4a4a3a', letterSpacing: 0 }}>optional</span>
        </label>
        <textarea className="input-dark w-full px-3 py-2 rounded-lg text-sm resize-none" rows={3}
          value={form.overview} onChange={e=>set('overview',e.target.value)}
          placeholder="Short plot description..." />
      </div>

      {/* Platform Availability */}
<div>
  <label className="block text-[10px] font-medium mb-2 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>
    Available On (select platforms)
  </label>
  <div className="flex flex-wrap gap-2">
    {[
      { name:'Netflix',      color:'#E50914' },
      { name:'Amazon Prime Video', color:'#00A8E1' },
      { name:'JioCinema',    color:'#6B4DE6' },
      { name:'JioHotstar',      color:'#1F80E0' },
      { name:'YouTube',      color:'#FF0000' },
      { name:'SonyLIV',      color:'#0057A8' },
      { name:'ZEE5',         color:'#7B2FBE' },
      { name:'MX Player',    color:'#FF6C00' },
    ].map(p => {
      const selected = (form.platforms || []).includes(p.name);
      return (
        <button key={p.name} type="button"
          onClick={() => {
            const curr = form.platforms || [];
            set('platforms', selected ? curr.filter(x => x !== p.name) : [...curr, p.name]);
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: selected ? p.color+'25' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${selected ? p.color+'60' : 'rgba(255,255,255,0.08)'}`,
            color: selected ? p.color : '#6a6a5a',
          }}>
          {selected ? '✓ ' : ''}{p.name}
        </button>
      );
    })}
  </div>
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
        className="mb-3 p-3 rounded-xl space-y-2"
        style={{ background:'rgba(59,130,246,0.04)', border:'1px solid rgba(59,130,246,0.15)' }}>
        <div className="flex gap-2 items-center flex-wrap">
          <input className="input-dark flex-1 min-w-[120px] px-2.5 py-1.5 rounded-lg text-xs"
            value={link.label}
            onChange={e => setWatchLinks(l=>l.map((x,idx)=>idx===i?{...x,label:e.target.value}:x))}
            placeholder="Label (e.g. Watch HD, Watch 1080p)" />
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
    <div className="text-center py-3 rounded-xl text-xs mb-2"
      style={{ color:'#3a3a2a', border:'1px dashed rgba(59,130,246,0.12)' }}>
      No watch links yet — click Add Link above
    </div>
  )}
</div>

      {/* Download Links */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] font-medium tracking-[2px] uppercase" style={{ color: '#6a6a5a' }}>
            Download Links — <span style={{ color: '#4a4a3a', letterSpacing: 0 }}>optional, add as many as you want</span>
          </label>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={addLink}
            className="btn-primary flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs">
            <Plus size={11} /> Add Link
          </motion.button>
        </div>

        <AnimatePresence>
          {links.map((link, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, height:0 }}
              className="mb-3 p-3 rounded-xl space-y-2"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>

              {/* Platform presets */}
              <div className="flex flex-wrap gap-1.5">
                {PLATFORMS.map(p=>(
                  <button key={p.name} onClick={()=>applyPlatform(i,p)}
                    className="text-[10px] px-2 py-0.5 rounded-md transition-all"
                    style={{
                      background: link.label===p.name ? p.color+'25' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${link.label===p.name ? p.color+'50' : 'rgba(255,255,255,0.07)'}`,
                      color: link.label===p.name ? p.color : '#6a6a5a',
                    }}>
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                <input className="input-dark flex-1 min-w-[100px] px-2.5 py-1.5 rounded-lg text-xs"
                  value={link.label} onChange={e=>setLink(i,'label',e.target.value)} placeholder="Label (e.g. 1080p HD)" />
                <input className="input-dark flex-[2] min-w-[140px] px-2.5 py-1.5 rounded-lg text-xs"
                  value={link.url} onChange={e=>setLink(i,'url',e.target.value)} placeholder="Download URL or page link" />
                <input type="color" value={link.color||'#c9a84c'} onChange={e=>setLink(i,'color',e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0" title="Color" />
                <button onClick={()=>removeLink(i)} className="transition-colors" style={{ color: '#e05c3a40' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#e05c3a'}
                  onMouseLeave={e=>e.currentTarget.style.color='#e05c3a40'}>
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {links.length === 0 && (
          <div className="text-center py-4 rounded-xl text-xs" style={{ color: '#4a4a3a', border: '1px dashed rgba(255,255,255,0.06)' }}>
            No download links yet — click "Add Link" above
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={handleSubmit} disabled={loading}
          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium">
          {loading
            ? <motion.div animate={{ rotate: 360 }} transition={{ repeat:Infinity, duration:1, ease:'linear' }}><Film size={15}/></motion.div>
            : <Save size={15} />}
          {loading ? 'Saving...' : (initial ? 'Save Changes' : 'Add Movie')}
        </motion.button>
        {onCancel && (
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={onCancel}
            className="btn-ghost flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm">
            <X size={15} /> Cancel
          </motion.button>
        )}
      </div>
    </div>
  );
}
