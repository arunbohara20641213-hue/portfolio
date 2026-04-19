import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}
