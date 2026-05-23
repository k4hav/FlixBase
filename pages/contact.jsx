import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import CinematicBackground from '../components/CinematicBackground';
import { submitContact } from '../lib/supabase';
import { ArrowLeft, Send, CheckCircle2, Mail, MessageSquare, User } from 'lucide-react';

const EMPTY = { name:'', email:'', subject:'', message:'' };

export default function Contact() {
  const [form,    setForm]    = useState(EMPTY);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await submitContact(form);
      setSuccess(true);
      setForm(EMPTY);
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep">
      <Head><title>Contact Us — FlixBase</title></Head>
      <CinematicBackground />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* Back */}
        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} className="mb-6">
          <Link href="/">
            <motion.div whileHover={{ x:-3 }} className="inline-flex items-center gap-1.5 text-xs transition-colors"
              style={{ color:'#6a6a5a' }}
              onMouseEnter={e=>e.currentTarget.style.color='#c9a84c'}
              onMouseLeave={e=>e.currentTarget.style.color='#6a6a5a'}>
              <ArrowLeft size={13} /> Back
            </motion.div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.25)' }}>
            <Mail size={24} style={{ color:'#c9a84c' }} />
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl mb-2"
            style={{ fontFamily:'Cinzel,serif',
              background:'linear-gradient(135deg,#f5e4a8,#c9a84c)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Contact Us
          </h1>
          <p className="text-xs leading-relaxed" style={{ color:'#6a6a5a' }}>
            Have a question, suggestion or issue? We'd love to hear from you.
          </p>
          <div className="divider-gold w-20 mx-auto mt-3" />
        </motion.div>

        {/* Success */}
        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
              className="text-center py-16">
              <motion.div animate={{ scale:[1,1.15,1] }} transition={{ repeat:Infinity, duration:2 }}>
                <CheckCircle2 size={52} className="mx-auto mb-4" style={{ color:'#c9a84c' }} />
              </motion.div>
              <h3 className="font-cinzel text-xl mb-2" style={{ fontFamily:'Cinzel,serif', color:'#e8c87a' }}>Message Sent!</h3>
              <p className="text-sm mb-6" style={{ color:'#6a6a5a' }}>We'll get back to you soon. Thank you! 🙏</p>
              <motion.button whileHover={{ scale:1.03 }} onClick={() => setSuccess(false)}
                className="btn-primary px-5 py-2.5 rounded-xl text-sm">Send Another</motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        {!success && (
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            className="space-y-4 p-6 rounded-2xl"
            style={{ background:'rgba(14,14,22,0.8)', border:'1px solid rgba(201,168,76,0.12)', backdropFilter:'blur(20px)' }}>

            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>
                <User size={10} /> Name <span style={{ color:'#e05c3a' }}>*</span>
              </label>
              <input className={`input-dark w-full px-3 py-2.5 rounded-lg text-sm ${errors.name?'border-red-500/40':''}`}
                value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your name" />
              {errors.name && <p className="text-red-400/80 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>
                <Mail size={10} /> Email <span style={{ color:'#4a4a3a', letterSpacing:0 }}>optional</span>
              </label>
              <input className="input-dark w-full px-3 py-2.5 rounded-lg text-sm"
                value={form.email} onChange={e=>set('email',e.target.value)}
                placeholder="your@email.com" type="email" />
            </div>

            {/* Subject */}
            <div>
              <label className="text-[10px] font-medium mb-1.5 tracking-[2px] uppercase block" style={{ color:'#6a6a5a' }}>
                Subject <span style={{ color:'#4a4a3a', letterSpacing:0 }}>optional</span>
              </label>
              <input className="input-dark w-full px-3 py-2.5 rounded-lg text-sm"
                value={form.subject} onChange={e=>set('subject',e.target.value)}
                placeholder="What is this about?" />
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-medium mb-1.5 tracking-[2px] uppercase" style={{ color:'#6a6a5a' }}>
                <MessageSquare size={10} /> Message <span style={{ color:'#e05c3a' }}>*</span>
              </label>
              <textarea className={`input-dark w-full px-3 py-2.5 rounded-lg text-sm resize-none ${errors.message?'border-red-500/40':''}`}
                rows={5} value={form.message} onChange={e=>set('message',e.target.value)}
                placeholder="Write your message here..." />
              {errors.message && <p className="text-red-400/80 text-xs mt-1">{errors.message}</p>}
            </div>

            {errors.submit && <p className="text-red-400/80 text-xs">{errors.submit}</p>}

            <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
              onClick={handleSubmit} disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium">
              {loading
                ? <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:1, ease:'linear' }}><Send size={15}/></motion.div>
                : <Send size={15} />}
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}





