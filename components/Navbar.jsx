import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Film, Inbox, Plus, Heart, Send } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

export default function Navbar() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const bgO = useTransform(scrollY, [0, 60], [0, 1]);
  const { collection } = useCollection();

  const links = [
    { href: '/',         label: 'Explore',   icon: Film  },
    { href: '/requests', label: 'Requests',  icon: Inbox },
    { href: '/submit',   label: 'Add Movie', icon: Plus  },
  ];

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50">
      <motion.div style={{ opacity: bgO }}
        className="absolute inset-0"
        style={{ background: 'rgba(10,10,15,0.92)', borderBottom: '1px solid rgba(201,168,76,0.1)', backdropFilter: 'blur(20px)' }}
      />
      <div className="relative max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2.5 group cursor-pointer">
            <div className="relative">
              <motion.div className="absolute inset-0 rounded-lg"
                style={{ background: 'rgba(201,168,76,0.25)', filter: 'blur(6px)' }}
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              />
              <div className="relative w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.25),rgba(201,168,76,0.08))', border: '1px solid rgba(201,168,76,0.4)' }}>
                <Film size={14} style={{ color: '#e8c87a' }} />
              </div>
            </div>
            <div className="relative overflow-hidden">
              <span className="font-cinzel font-bold text-sm tracking-[3px] relative z-10"
                style={{ fontFamily: 'Cinzel,serif', letterSpacing: '3px' }}>
                {'FLIXBASE'.split('').map((char, i) => (
                  <motion.span key={i} style={{ display: 'inline-block' }}
                    animate={{ color: ['#c9a84c', '#f5e4a8', '#e8c87a', '#c9a84c'],
                      textShadow: ['0 0 8px rgba(201,168,76,0)', '0 0 20px rgba(201,168,76,0.8)', '0 0 8px rgba(201,168,76,0)'] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.12, ease: 'easeInOut' }}>
                    {char}
                  </motion.span>
                ))}
              </span>
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(245,228,168,0.4) 50%,transparent 70%)', zIndex: 20 }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 1.5 }}
              />
            </div>
          </motion.div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = router.pathname === href;
            return (
              <Link key={href} href={href}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={active
                    ? { color: '#c9a84c', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }
                    : { color: '#6a6a5a', border: '1px solid transparent' }
                  }>
                  <Icon size={13} />
                  <span className="hidden sm:block">{label}</span>
                </motion.div>
              </Link>
            );
          })}

          {/* Telegram Join button */}
          <motion.a
            href="https://t.me/+n3etNnm3RxI5NGZl"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ml-1 transition-all"
            style={{ background: 'rgba(34,158,217,0.12)', border: '1px solid rgba(34,158,217,0.3)', color: '#4fc3f7' }}
          >
            <Send size={12} />
            <span className="hidden sm:block">Telegram</span>
          </motion.a>

          {/* Collection heart */}
          <Link href="/collection">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all ml-0.5"
              style={router.pathname === '/collection'
                ? { color: '#c9a84c', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }
                : { color: '#6a6a5a', border: '1px solid transparent' }
              }>
              <motion.div
                animate={collection.length > 0 ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                <Heart size={14} fill={collection.length > 0 ? '#c9a84c' : 'none'}
                  style={{ color: collection.length > 0 ? '#c9a84c' : '#6a6a5a' }} />
              </motion.div>
              {collection.length > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                  style={{ background: '#c9a84c', color: '#0a0808' }}>
                  {collection.length > 9 ? '9+' : collection.length}
                </motion.span>
              )}
            </motion.div>
          </Link>

         
        </div>
      </div>
    </motion.nav>
  );
}
