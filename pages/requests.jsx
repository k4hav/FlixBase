import { motion } from 'framer-motion';

{/* Movie Finder Banner */}
<motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
  className="mb-6 p-5 rounded-2xl relative overflow-hidden"
  style={{ background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.18)' }}>
  <motion.div className="absolute inset-0 pointer-events-none"
    style={{ background:'linear-gradient(105deg,transparent 30%,rgba(201,168,76,0.06) 50%,transparent 70%)' }}
    animate={{ x:['-100%','200%'] }}
    transition={{ repeat:Infinity, duration:4, ease:'easeInOut', repeatDelay:3 }}
  />
  <div className="relative z-10">
    <p className="text-sm font-bold mb-1" style={{ color:'#e8c87a' }}>
      🔍 Can't find your movie on FlixBase?
    </p>
    <p className="text-[11px] mb-4 leading-relaxed" style={{ color:'#6a6a5a' }}>
      Check these platforms — if still not found, request it below and we'll add it within 24 hours!
    </p>

    {/* Search box */}
    <div className="flex gap-2 mb-4">
      <input
        id="finder-input"
        className="input-dark flex-1 px-3 py-2 rounded-lg text-sm"
        placeholder="Type movie name..."
        onKeyDown={e => {
          if (e.key === 'Enter') {
            const q = e.target.value.trim();
            if (q) document.getElementById('finder-results').style.display = 'flex';
            document.querySelectorAll('.finder-link').forEach(a => {
              a.href = a.dataset.base + encodeURIComponent(q);
            });
          }
        }}
      />
      <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
        onClick={() => {
          const q = document.getElementById('finder-input').value.trim();
          if (!q) return;
          document.getElementById('finder-results').style.display = 'flex';
          document.querySelectorAll('.finder-link').forEach(a => {
            a.href = a.dataset.base + encodeURIComponent(q);
          });
        }}
        className="btn-primary px-4 py-2 rounded-lg text-xs font-semibold flex-shrink-0">
        Search
      </motion.button>
    </div>

    {/* Legal platform links */}
    <div id="finder-results" className="flex-wrap gap-2 mb-3" style={{ display:'none' }}>
      {[
        import { motion } from 'framer-motion';

{/* Movie Finder Banner */}
<motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
  className="mb-6 p-5 rounded-2xl relative overflow-hidden"
  style={{ background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.18)' }}>
  <motion.div className="absolute inset-0 pointer-events-none"
    style={{ background:'linear-gradient(105deg,transparent 30%,rgba(201,168,76,0.06) 50%,transparent 70%)' }}
    animate={{ x:['-100%','200%'] }}
    transition={{ repeat:Infinity, duration:4, ease:'easeInOut', repeatDelay:3 }}
  />
  <div className="relative z-10">
    <p className="text-sm font-bold mb-1" style={{ color:'#e8c87a' }}>
      🔍 Can't find your movie on FlixBase?
    </p>
    <p className="text-[11px] mb-4 leading-relaxed" style={{ color:'#6a6a5a' }}>
      Check these platforms — if still not found, request it below and we'll add it within 24 hours!
    </p>

    {/* Search box */}
    <div className="flex gap-2 mb-4">
      <input
        id="finder-input"
        className="input-dark flex-1 px-3 py-2 rounded-lg text-sm"
        placeholder="Type movie name..."
        onKeyDown={e => {
          if (e.key === 'Enter') {
            const q = e.target.value.trim();
            if (q) document.getElementById('finder-results').style.display = 'flex';
            document.querySelectorAll('.finder-link').forEach(a => {
              a.href = a.dataset.base + encodeURIComponent(q);
            });
          }
        }}
      />
      <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
        onClick={() => {
          const q = document.getElementById('finder-input').value.trim();
          if (!q) return;
          document.getElementById('finder-results').style.display = 'flex';
          document.querySelectorAll('.finder-link').forEach(a => {
            a.href = a.dataset.base + encodeURIComponent(q);
          });
        }}
        className="btn-primary px-4 py-2 rounded-lg text-xs font-semibold flex-shrink-0">
        Search
      </motion.button>
    </div>

    {/* Legal platform links */}
    <div id="finder-results" className="flex-wrap gap-2 mb-3" style={{ display:'none' }}>
      {[
        { name:'Netflix',    color:'#e50914', base:'https://www.netflix.com/search?q=' },
        { name:'Prime Video',color:'#00a8e1', base:'https://www.primevideo.com/search/ref=atv_nb_sr?phrase=' },
        { name:'JioCinema',  color:'#f5a623', base:'https://www.jiocinema.com/search/' },
        { name:'JioHotstar', color:'#10b981', base:'https://www.hotstar.com/in/search?q=' },
      ].map((s, i) => (
        <a key={i} className="finder-link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
          data-base={s.base} href="#" target="_blank" rel="noopener noreferrer"
          style={{ background:`${s.color}15`, border:`1px solid ${s.color}35`, color:s.color, textDecoration:'none' }}>
          {s.name} →
        </a>
      ))}
    </div>

    <p className="text-[10px]" style={{ color:'#4a4a3a' }}>
      Still not found anywhere? Fill the request form below ↓
    </p>
  </div>
</motion.div>
      ].map((s, i) => (
        <a key={i} className="finder-link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium"
          data-base={s.base} href="#" target="_blank" rel="noopener noreferrer"
          style={{ background:`${s.color}15`, border:`1px solid ${s.color}35`, color:s.color, textDecoration:'none' }}>
          {s.name} →
        </a>
      ))}
    </div>

    <p className="text-[10px]" style={{ color:'#4a4a3a' }}>
      Still not found anywhere? Fill the request form below ↓
    </p>
  </div>
</motion.div>