import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

export default function Reveal({ children, delay = 0, className = '', y = 28 }) {
  const { ref, inView } = useReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
