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

const EMPTY = { title:'', year:'', type:'Movie', language:'', genre:'', rating:'', poster_url:'', overview:'', uploaded_by:'', featured:false, trailer_url:'' };

export default function Submit() {
  const [form,    setForm]    = useState(EMPTY);
  const [links, setLinks] = useState([]);
  const [watchLinks, setWatchLinks] = useState([]);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
const [searchResults, setSearchResults] = useState([]);
const [searching, setSearching]       = useState(false);
const [showResults, setShowResults]   = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

const searchTMDB = async (query) => {

const fillFromTMDB = async (item) => {
  setShowResults(false);
  setSearchQuery('');
  try {
    const res = await fetch(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=e09889cb`);
    const d = await res.json();
    setForm(f => ({ ...f,
      title:     d.Title || item.Title || '',
      year:      d.Year?.slice(0, 4) || '',
      poster_url: d.Poster !== 'N/A' ? d.Poster : '',
      rating:    d.imdbRating !== 'N/A' ? d.imdbRating : '',
      overview:  d.Plot !== 'N/A' ? d.Plot : '',
      genre:     d.Genre !== 'N/A' ? d.Genre.split(',')[0].trim() : '',
      language:  d.Language !== 'N/A' ? d.Language.split(',')[0].trim() : '',
      type:      d.Type === 'series' ? 'Series' : d.Type === 'movie' ? 'Movie' : 'Movie',
    }));
  } catch {}
};

  const addLink    = () => setLinks(l => [...l, { label:'', info:'', url:'', color:'#c9a84c' }]);
  const setLink    = (i, k, v) => setLinks(l => l.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const removeLink = i => setLinks(l => l.filter((_, idx) => idx !== i));
  const applyPlatform = (i, p) => setLinks(l => l.map((x, idx) => idx === i ? { ...x, label: p.name, color: p.color } : x));

const validate = () => {
  const errs = {};
  if (!form.title.trim())  errs.title = 'Title is required';
  if (!form.year?.trim())  errs.year  = 'Year is required';
  // language, genre, trailer_url — removed (optional)
  setErrors(errs);
  return Object.keys(errs).length === 0;
};
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await addMovie({ ...form, links: links.filter(l => l.url), watch_links: watchLinks.filter(l=>l.url) });
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

        {/* Notice Banner */}
<motion.div
  initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
  transition={{ delay:0.1 }}
  className="mb-6 p-4 rounded-xl relative overflow-hidden"
  style={{ background:'rgba(234,179,8,0.06)', border:'1px solid rgba(234,179,8,0.25)' }}
>
  <motion.div className="absolute inset-0 pointer-events-none"
    style={{ background:'linear-gradient(105deg,transparent 30%,rgba(234,179,8,0.06) 50%,transparent 70%)' }}
    animate={{ x:['-100%','200%'] }}
    transition={{ repeat:Infinity, duration:4, ease:'easeInOut', repeatDelay:3 }}
  />
  <div className="flex gap-3 items-start relative z-10">
    <span className="text-lg flex-shrink-0">⚠️</span>
    <div>
      <p className="text-xs font-semibold mb-1" style={{ color:'#fbbf24' }}>
        Dear Uploader — Please Read Before Adding
      </p>
      <p className="text-[11px] leading-relaxed" style={{ color:'#8a8060' }}>
        Please upload <span style={{ color:'#fbbf24' }}>valid working links only</span>. 
        Fake, broken, or spam links will be <span style={{ color:'#f87171' }}>permanently rejected</span> and 
        your uploads will be blocked. All submissions are <span style={{ color:'#fbbf24' }}>reviewed by admin</span> before appearing on the site.
        Thank you for contributing! 🙏
      </p>
    </div>
  </div>
</motion.div>
        
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
            Share a movie, series, anime or tv shows with the community.
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
{/* Title with TMDB Search */}
<div className="relative">
  <label className="block text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>
    Search Movie / Series <span style={{ color:'#e05c3a' }}>*</span>
  </label>

  {/* Search input */}
  <div className="relative">
    <input
      className="input-dark w-full px-3 py-2.5 rounded-lg text-sm pr-10"
      value={searchQuery || form.title}
      onChange={e => {
        const val = e.target.value;
        setSearchQuery(val);
        set('title', val);
        searchTMDB(val);
      }}
      placeholder="Type movie name — auto search krega..."
      onBlur={() => setTimeout(() => setShowResults(false), 200)}
      onFocus={() => searchResults.length > 0 && setShowResults(true)}
    />
    {searching && (
      <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1, ease:'linear' }}
        className="absolute right-3 top-1/2 -translate-y-1/2">
        <div className="w-4 h-4 border-2 rounded-full" style={{ borderColor:'#c9a84c', borderTopColor:'transparent' }} />
      </motion.div>
    )}
  </div>
  {errors.title && <p className="text-red-400/80 text-xs mt-1">{errors.title}</p>}

  {/* Search Results Dropdown */}
  <AnimatePresence>
    {showResults && searchResults.length > 0 && (
      <motion.div
        initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
        className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl overflow-hidden"
        style={{ background:'rgba(14,14,22,0.98)', border:'1px solid rgba(201,168,76,0.2)', backdropFilter:'blur(20px)', boxShadow:'0 20px 60px rgba(0,0,0,0.6)' }}>
        {searchResults.map((item, i) => {
         const title = item.Title;
         const year = item.Year;
         const poster = item.Poster !== 'N/A' ? item.Poster : null;
          return (
            <motion.div key={item.id}
              whileHover={{ background:'rgba(201,168,76,0.08)' }}
              onMouseDown={() => fillFromTMDB(item)}
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors"
              style={{ borderBottom: i < searchResults.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              {poster
                ? <img src={poster} alt={title} className="w-8 h-12 object-cover rounded-md flex-shrink-0" />
                : <div className="w-8 h-12 rounded-md flex-shrink-0" style={{ background:'#1a1a28' }} />
              }
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color:'#e8e4d8' }}>{title}</div>
                <div className="text-[10px] mt-0.5" style={{ color:'#6a6a5a' }}>
                  {year && <span>{year}</span>}
                  <span className="ml-2 px-1.5 py-0.5 rounded text-[9px]"
                    style={{ background: item.Type === 'series' ? 'rgba(79,150,247,0.15)' : 'rgba(201,168,76,0.12)',
                      color: item.Type === 'series' ? '#7ec8f7' : '#c9a84c' }}>
                    {item.Type === 'series' ? 'Series' : 'Movie'}
                  </span>
                </div>
              </div>
              {item.vote_average > 0 && (
                <span className="text-[10px] flex-shrink-0" style={{ color:'#c9a84c' }}>
                  ★ {item.vote_average.toFixed(1)}
                </span>
              )}
            </motion.div>
          );
        })}
        <div className="px-3 py-1.5 text-[9px] text-right" style={{ color:'#3a3a2a', background:'rgba(0,0,0,0.3)' }}>
          Powered by TMDB
        </div>
      </motion.div>
    )}
  </AnimatePresence>
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
