import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="page-wrapper"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
