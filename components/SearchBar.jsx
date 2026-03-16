import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search by title, genre, language...' }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  return (
    <div className="relative">
      <motion.div
        animate={{ boxShadow: focused ? '0 0 0 1.5px rgba(201,168,76,0.3), 0 4px 20px rgba(0,0,0,0.3)' : '0 0 0 1px rgba(255,255,255,0.07)' }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
        style={{ background: 'rgba(20,20,30,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <motion.div animate={{ color: focused ? '#c9a84c' : '#6a6a5a' }} transition={{ duration: 0.15 }}>
          <Search size={16} />
        </motion.div>
        <input ref={inputRef} type="text" value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: '#e8e4d8', fontFamily: 'Inter, sans-serif' }}
        />
        <AnimatePresence>
          {value && (
            <motion.button initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => { onClear(); inputRef.current?.focus(); }}
              className="transition-colors" style={{ color: '#6a6a5a' }}
              onMouseEnter={e => e.target.style.color='#e8e4d8'}
              onMouseLeave={e => e.target.style.color='#6a6a5a'}
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-4 right-4 h-px origin-left pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #c9a84c, #e8c87a, #c9a84c)' }}
      />
    </div>
  );
}
