import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Film, Inbox, Plus } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const bgO = useTransform(scrollY, [0, 60], [0, 1]);

  const links = [
    { href: '/',         label: 'Explore',   icon: Film  },
    { href: '/requests', label: 'Requests',  icon: Inbox },
    { href: '/admin',    label: 'Add Movie', icon: Plus  },
  ];

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50">
      <motion.div style={{ opacity: bgO }}
        className="absolute inset-0 border-b"
        style={{ background: 'rgba(10,10,15,0.92)', borderBottomColor: 'rgba(201,168,76,0.1)', backdropFilter: 'blur(20px)' }}
      />
      <div className="relative max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">

        {/* Logo — compact one-line */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <Film size={14} style={{ color: '#c9a84c' }} />
            </div>
            <span className="font-cinzel font-semibold text-base tracking-[3px]"
              style={{ fontFamily: 'Cinzel, serif', color: '#e8c87a', letterSpacing: '3px' }}>
              FLIXBASE
            </span>
          </motion.div>
        </Link>

        {/* Nav */}
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
                  }
                >
                  <Icon size={13} />
                  <span className="hidden sm:block">{label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
