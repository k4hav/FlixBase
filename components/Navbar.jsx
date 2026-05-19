import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Inbox, Plus, Heart, Send, Gamepad2, Home } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

export default function Navbar() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const bgO = useTransform(scrollY, [0, 60], [0, 1]);
  const { collection } = useCollection();

  const links = [
    { href: '/',         label: 'Explore',   icon: Home     },
    { href: '/requests', label: 'Requests',  icon: Inbox    },
    { href: '/games',    label: 'Games',     icon: Gamepad2 },
    { href: '/submit',   label: 'Add Movie', icon: Plus     },
  ];

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50">
      <motion.div style={{ opacity: bgO }}
        className="absolute inset-0"
        style={{ background: 'rgba(8,8,18,0.92)', borderBottom: '1px solid rgba(201,168,76,0.08)', backdropFilter: 'blur(24px)' }}
      />

     <div className="relative max-w-6xl mx-auto px-5 h-16 flex items-center">
      


        {/* Nav links */}
        <div className="flex items-center gap-1.5 w-full justify-between">
          {links.map(({ href, label, icon: Icon }) => {
            const active = router.pathname === href;
            return (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all overflow-hidden"
                  style={active ? {
                    color: '#e8c87a',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)',
                  } : {
                    color: '#8a8778',
                    border: '1px solid transparent',
                  }}
                >
                  {active && (
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(201,168,76,0.1) 50%,transparent 70%)' }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 2 }}
                    />
                  )}
                  <Icon size={14} />
                  <span className="hidden sm:block tracking-wide">{label}</span>
                  {active && (
                    <motion.div layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#c9a84c' }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}

          {/* Telegram */}
          <motion.a
            href="https://t.me/+n3etNnm3RxI5NGZl"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold relative overflow-hidden"
            style={{ background: 'rgba(34,158,217,0.1)', border: '1px solid rgba(34,158,217,0.25)', color: '#4fc3f7' }}
          >
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(79,195,247,0.1) 50%,transparent 70%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 2 }}
            />
            <Send size={13} />
            <span className="hidden sm:block tracking-wide">Telegram</span>
          </motion.a>

          {/* Collection */}
          <Link href="/collection">
            <motion.div
              whileHover={{ scale: 1.08, y: -1 }} whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl"
              style={router.pathname === '/collection'
                ? { background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }
                : { border: '1px solid transparent' }
              }
            >
              <motion.div
                animate={collection.length > 0 ? { scale: [1, 1.25, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <Heart size={16} fill={collection.length > 0 ? '#c9a84c' : 'none'}
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
