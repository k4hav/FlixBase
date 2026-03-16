import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Star, Download, Tv2 } from 'lucide-react';

export default function MovieCard({ movie, index = 0 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60,60], [6,-6]), { stiffness: 200, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-60,60], [-6,6]), { stiffness: 200, damping: 24 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  };

  const links = Array.isArray(movie.links) ? movie.links : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: (index % 5) * 0.06 }}
    >
      <Link href={`/movies/${movie.id}`}>
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          onMouseMove={handleMouse}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
          className="group relative rounded-xl overflow-hidden cursor-pointer"
          style={{
            background: 'linear-gradient(160deg, rgba(26,26,40,0.9) 0%, rgba(15,15,22,0.95) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
            e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
          }}
        >
          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            {movie.poster_url ? (
              <img src={movie.poster_url} alt={movie.title} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-106"
                style={{ transition: 'transform 0.6s ease' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
            ) : null}
            <div className="w-full h-full bg-[#13131e] items-center justify-center"
              style={{ display: movie.poster_url ? 'none' : 'flex' }}>
              <div className="text-center opacity-20">
                <Tv2 size={32} className="mx-auto mb-1" style={{ color: '#c9a84c' }} />
                <span className="text-[10px] text-[#6a6a5a] font-medium">{movie.title}</span>
              </div>
            </div>
            <div className="absolute inset-0 poster-fade" />

            {/* Badges */}
            {movie.featured && (
              <div className="absolute top-2 left-2 z-10">
                <span className="badge badge-gold">Featured</span>
              </div>
            )}
            <div className="absolute top-2 right-2 z-10">
              <span className={`badge ${movie.type === 'Series' ? 'badge-blue' : 'badge-muted'}`}>{movie.type}</span>
            </div>

            {/* Download count */}
            {links.length > 0 && (
              <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md"
                style={{ background: 'rgba(10,10,15,0.7)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <Download size={10} style={{ color: '#c9a84c' }} />
                <span className="text-[10px]" style={{ color: '#c9a84c' }}>{links.length}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <h3 className="font-medium text-sm leading-snug mb-1.5 line-clamp-2 transition-colors duration-200"
              style={{ color: '#e8e4d8' }}
              onMouseEnter={e => e.target.style.color='#e8c87a'}
              onMouseLeave={e => e.target.style.color='#e8e4d8'}
            >
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
            {movie.genre && (
              <span className="inline-block mt-1.5 badge badge-muted">{movie.genre}</span>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
