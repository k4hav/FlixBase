import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, X, Film, Check } from 'lucide-react';

const OFFICIAL_PLATFORMS = [
  { name: 'Netflix',            color: '#E50914', url: 'https://www.netflix.com/search?q=' },
  { name: 'Amazon Prime Video', color: '#00A8E1', url: 'https://www.primevideo.com/search/ref=atv_nb_sr?phrase=' },
  { name: 'JioHotstar',         color: '#1F80E0', url: 'https://www.hotstar.com/in/search?q=' },
  { name: 'JioCinema',          color: '#6B4DE6', url: 'https://www.jiocinema.com/search/' },
  { name: 'SonyLIV',            color: '#0057A8', url: 'https://www.sonyliv.com/search/' },
  { name: 'ZEE5',               color: '#7B2FBE', url: 'https://www.zee5.com/search?q=' },
  { name: 'YouTube',            color: '#FF0000', url: 'https://www.youtube.com/results?search_query=' },
  { name: 'MX Player',          color: '#FF6C00', url: 'https://www.mxplayer.in/search?query=' },
  { name: 'Apple TV+',          color: '#888888', url: 'https://tv.apple.com/search?term=' },
  { name: 'Disney+',            color: '#113CCF', url: 'https://www.disneyplus.com/search/' },
  { name: 'Other',              color: '#c9a84c', url: '' },
];

const PLATFORMS = [
  { name: 'Filmyzilla',   color: '#e05c3a' },
  { name: 'Filmywap',     color: '#c0392b' },
  { name: 'Telegram',     color: '#229ED9' },
  { name: 'Drive',        color: '#4285F4' },
  { name: 'Mega.nz',      color: '#D9272E' },
  { name: 'MediaFire',    color: '#1B82E4' },
  { name: '1Fichier',     color: '#55a05b' },
  { name: 'Netflix',      color: '#E50914' },
  { name: 'Amazon Prime', color: '#00A8E1' },
  { name: 'JioCinema',    color: '#6B4DE6' },
  { name: 'YouTube',      color: '#FF0000' },
  { name: 'Custom',       color: '#c9a84c' },
];

const EMPTY = { title:'', year:'', type:'Movie', language:'', genre:'', rating:'', poster_url:'', overview:'', featured:false, platforms:[], otherPlatform:'' };

export default function AddMovieForm({ initial=null, onSave, onCancel, loading=false }) {
  const [form, setForm]         = useState(initial || EMPTY);
  const [links, setLinks]       = useState(initial?.links || []);
  const [errors, setErrors]     = useState({});
  const [showOther, setShowOther] = useState(false);

  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:''})); };

  const togglePlatform = (p) => {
    if (p.name === 'Other') { setShowOther(s => !s); return; }
    const curr = form.platforms || [];
    const exists = curr.find(x => x.name === p.name);
    set('platforms', exists ? curr.filter(x => x.name !== p.name) : [...curr, { name: p.name, color: p.color, url: p.url }]);
  };
  const isPlatformSelected = (name) => (form.platforms || []).some(x => x.name === name);

  const addOtherPlatform = () => {
    const name = form.otherPlatform?.trim();
    if (!name) return;
    const curr = form.platforms || [];
    if (!curr.find(x => x.name === name)) {
      set('platforms', [...curr, { name, color: '#c9a84c', url: '' }]);
    }
    set('otherPlatform', '');
    setShowOther(false);
  };

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
    onSave({ ...form, links: links.filter(l=>l.url), platforms: form.platforms || [] });
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

      {/* Official Streaming Platforms */}
      <div>
        <label className="block text-[10px] font-medium mb-2 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>
          Available On — <span style={{ color:'#4a4a3a', letterSpacing:0 }}>select official platforms</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {OFFICIAL_PLATFORMS.map(p => {
            const selected = p.name === 'Other' ? showOther : isPlatformSelected(p.name);
            return (
              <motion.button key={p.name} type="button"
                onClick={() => togglePlatform(p)}
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.96 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: selected ? p.color+'22' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected ? p.color+'55' : 'rgba(255,255,255,0.08)'}`,
                  color: selected ? p.color : '#6a6a5a',
                }}>
                {selected && <Check size={10} />}
                {p.name}
              </motion.button>
            );
          })}
        </div>

        {/* Other platform input */}
        <AnimatePresence>
          {showOther && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
              className="flex gap-2 mt-2">
              <input
                className="input-dark flex-1 px-3 py-2 rounded-lg text-sm"
                value={form.otherPlatform || ''}
                onChange={e => set('otherPlatform', e.target.value)}
                placeholder="Platform name (e.g. Mubi, Voot, Aha...)"
                onKeyDown={e => e.key === 'Enter' && addOtherPlatform()}
              />
              <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                onClick={addOtherPlatform}
                className="btn-primary px-4 py-2 rounded-lg text-xs">
                Add
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show selected platforms */}
        {(form.platforms || []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(form.platforms || []).map((p, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px]"
                style={{ background: p.color+'18', border:`1px solid ${p.color}35`, color: p.color }}>
                {p.name}
                <button onClick={() => set('platforms', form.platforms.filter((_,idx)=>idx!==i))}
                  className="opacity-50 hover:opacity-100 ml-0.5">×</button>
              </span>
            ))}
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
