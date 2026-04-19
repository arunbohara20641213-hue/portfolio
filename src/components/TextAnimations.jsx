import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ─────────────────────────────────────────
   1. SplitHeadline
   Reveals each character with a staggered
   clip-path wipe — editorial, precise.
───────────────────────────────────────── */
export function SplitHeadline({ text, className = '', style = {}, delay = 0, tag = 'h1' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const words = text.split(' ');

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  };

  const wordVar = {
    hidden: { y: '105%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const Tag = tag;

  return (
    <Tag className={className} style={{ ...style, overflow: 'visible' }} ref={ref}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.22em' }}
        aria-label={text}
      >
        {words.map((word, wi) => (
          <span key={wi} style={{ overflow: 'hidden', display: 'inline-block', lineHeight: 'inherit' }}>
            <motion.span variants={wordVar} style={{ display: 'inline-block' }}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─────────────────────────────────────────
   2. TypeWriter
   Classic character-by-character typewriter
   with blinking cursor — for taglines.
───────────────────────────────────────── */
export function TypeWriter({ text, className = '', style = {}, delay = 0, speed = 38 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, speed);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {displayed}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: 'var(--ink)',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: done ? 'cursorBlink 1s step-end infinite' : 'none',
          opacity: done ? 1 : 1,
        }}
      />
      <style>{`@keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}

/* ─────────────────────────────────────────
   3. LineWipe
   A horizontal ink line sweeps across,
   then the text fades in beneath it.
   Great for section headings.
───────────────────────────────────────── */
export function LineWipe({ children, className = '', style = {}, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* Ink wipe overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--ink)',
          transformOrigin: 'left center',
          zIndex: 2,
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: [0, 1, 1, 0] } : {}}
        transition={{
          duration: 0.9,
          delay,
          times: [0, 0.45, 0.55, 1],
          ease: ['easeIn', 'linear', 'easeOut'],
        }}
      />
      {/* Content fades in after wipe passes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.01, delay: delay + 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   4. ScrambleText
   Text scrambles through random characters
   before resolving to the final string.
   Best for short labels / numbers / kickers.
───────────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—/';

export function ScrambleText({ text, className = '', style = {}, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let iter = 0;
    const total = 18;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((ch, i) => {
              if (ch === ' ') return ' ';
              if (i < iter / (total / text.length)) return ch;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        iter++;
        if (iter > total) { clearInterval(id); setDisplay(text); }
      }, 45);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {display}
    </span>
  );
}

/* ─────────────────────────────────────────
   5. StaggerWords
   Fades + slides each word in sequence.
   For body paragraphs / subtitles.
───────────────────────────────────────── */
export function StaggerWords({ text, className = '', style = {}, delay = 0, tag = 'p' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const words = text.split(' ');
  const Tag = tag;

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.028,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', marginRight: '0.27em' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────
   6. CountUp
   Animates a number from 0 to target.
   For stats / counts.
───────────────────────────────────────── */
export function CountUp({ target, suffix = '', className = '', style = {}, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        current += increment;
        if (current >= target) { setVal(target); clearInterval(id); }
        else setVal(Math.floor(current));
      }, duration / steps);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <span ref={ref} className={className} style={style}>
      {val}{suffix}
    </span>
  );
}
