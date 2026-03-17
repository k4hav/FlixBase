import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Star, Download, Tv2, Heart } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

export default function MovieCard({ movie, index = 0 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60,60], [6,-6]), { stiffness:200, damping:24 });
  const rotateY = useSpring(useTransform(x, [-60,60], [-6,6]), { stiffness:200, damping:24 });
  const { addToCollection, removeFromCollection, isInCollection } = useCollection();

  const handleMouse = e => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width/2);
    y.set(e.clientY - rect.top  - rect.height/2);
  };

  const links   = Array.isArray(movie.links) ? movie.links : [];
  const inColl  = isInCollection(movie.id);

  const toggleCollection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inColl ? removeFromCollection(movie.id) : addToCollection(movie);
  };

  return (
    <motion.div
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-30px' }}
      transition={{ duration:0.45, delay:(index%5)*0.06 }}
    >
      <Link href={`/movies/${movie.id}`}>
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY, transformPerspective:900 }}
          onMouseMove={handleMouse}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }}
          className="group relative rounded-xl overflow-hidden cursor-pointer"
          style={{
            background:'linear-gradient(160deg,rgba(26,26,40,0.9) 0%,rgba(15,15,22,0.95) 100%)',
            border:'1px solid rgba(255,255,255,0.06)',
            boxShadow:'0 4px 24px rgba(0,0,0,0.5)',
            transition:'border-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor='rgba(201,168,76,0.25)';
            e.currentTarget.style.boxShadow='0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';
            e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.5)';
          }}
        >
          {/* ── Heart / Save button ── */}
          <motion.button
            onClick={toggleCollection}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="absolute top-2 left-2 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              background: inColl ? 'rgba(201,168,76,0.25)' : 'rgba(0,0,0,0.5)',
              border: inColl ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              opacity: inColl ? 1 : 0,
            }}
            // Show on hover via parent group
            title={inColl ? 'Remove from collection' : 'Save to collection'}
          >
            <Heart
              size={12}
              fill={inColl ? '#c9a84c' : 'none'}
              style={{ color: inColl ? '#c9a84c' : '#fff' }}
            />
          </motion.button>

          {/* Make heart always visible when saved, show on hover otherwise */}
          <style>{`
            .group:hover .heart-btn { opacity: 1 !important; }
          `}</style>
          <motion.button
            onClick={toggleCollection}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="heart-btn absolute top-2 left-2 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              background: inColl ? 'rgba(201,168,76,0.25)' : 'rgba(0,0,0,0.55)',
              border: inColl ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(4px)',
              opacity: inColl ? 1 : 0,
            }}
            title={inColl ? 'Remove from collection' : 'Save to collection'}
          >
            <Heart size={12} fill={inColl ? '#c9a84c' : 'none'} style={{ color: inColl ? '#c9a84c' : '#e8e4d8' }} />
          </motion.button>

          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            {movie.poster_url ? (
              <img src={movie.poster_url} alt={movie.title} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105"
                style={{ transition:'transform 0.6s ease' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
            ) : null}
            <div className="w-full h-full bg-[#13131e] items-center justify-center"
              style={{ display: movie.poster_url ? 'none' : 'flex' }}>
              <div className="text-center opacity-20">
                <Tv2 size={32} className="mx-auto mb-1" style={{ color:'#c9a84c' }} />
                <span className="text-[10px]" style={{ color:'#6a6a5a' }}>{movie.title}</span>
              </div>
            </div>
            <div className="absolute inset-0 poster-fade" />

            {movie.featured && (
              <div className="absolute top-2 right-2 z-10">
                <span className="badge badge-gold">Featured</span>
              </div>
            )}
            {!movie.featured && (
              <div className="absolute top-2 right-2 z-10">
                <span className={`badge ${movie.type==='Series'?'badge-blue':movie.type==='Anime'?'badge-purple':'badge-muted'}`}>
                  {movie.type}
                </span>
              </div>
            )}

            {links.length > 0 && (
              <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-md"
                style={{ background:'rgba(10,10,15,0.75)', border:'1px solid rgba(201,168,76,0.15)' }}>
                <Download size={9} style={{ color:'#c9a84c' }} />
                <span className="text-[10px]" style={{ color:'#c9a84c' }}>{links.length}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <h3 className="font-medium text-sm leading-snug mb-1 line-clamp-2" style={{ color:'#e8e4d8' }}>
              {movie.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-[11px]" style={{ color:'#6a6a5a' }}>
                {movie.year}{movie.language ? ` · ${movie.language}` : ''}
              </span>
              {movie.rating && (
                <span className="flex items-center gap-0.5 text-[11px]" style={{ color:'#c9a84c' }}>
                  <Star size={9} fill="currentColor" />{movie.rating}
                </span>
              )}
            </div>
            {movie.genre && <span className="inline-block mt-1.5 badge badge-muted">{movie.genre}</span>}
            {movie.uploaded_by && (
              <div className="mt-1.5 text-[10px]" style={{ color:'#4a4a3a' }}>by {movie.uploaded_by}</div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
