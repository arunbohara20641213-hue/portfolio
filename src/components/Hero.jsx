import { motion } from 'framer-motion';
import { SplitHeadline, TypeWriter, StaggerWords } from './TextAnimations';

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
});

export default function Hero() {
  return (
    <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-0">

      {/* Issue meta row — fades in */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.15 }}
      >
        <span className="byline">{today}</span>
        <span className="byline hidden sm:block">Vol. I · No. 1</span>
        <span className="byline">Software &amp; Systems</span>
      </motion.div>

      {/* Thick rule — draws left to right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left', borderTop: '3px solid var(--ink)', marginBottom: '1.5rem' }}
      />

      {/* Main headline — word-by-word wipe from below */}
      <SplitHeadline
        text="Arun Bohara"
        className="headline-xl mb-6"
        delay={0.45}
        tag="h1"
      />

      {/* Thin rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left', borderTop: '1px solid var(--rule)', marginBottom: '1.2rem' }}
      />

      {/* Tagline row */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 md:gap-12 pb-10"
        style={{ borderBottom: '1px solid var(--ink)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.85 }}
      >
        <div className="md:col-span-2">
          {/* Typewriter tagline */}
          <p
            className="font-serif mb-4"
            style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.45rem)', lineHeight: 1.35, fontStyle: 'italic' }}
          >
            <TypeWriter
              text="Software Developer · Problem Solver · Builder of Systems"
              delay={1.0}
              speed={32}
            />
          </p>
          {/* Word-stagger body text */}
          <StaggerWords
            text="An independent software developer from Kathmandu, Nepal — building with Python, Java, JavaScript, and C. Focused on practical systems, clean code, and solutions that work."
            className="byline"
            style={{ lineHeight: 1.7, maxWidth: '52ch', display: 'block' }}
            delay={1.1}
          />
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <motion.p
              className="kicker mb-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Currently
            </motion.p>
            <motion.p
              className="byline"
              style={{ lineHeight: 1.7 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.65 }}
            >
              Open to full-time roles &amp; freelance projects.
              Reach out only if you're serious.
            </motion.p>
          </div>
          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <a
              href="https://github.com/arunbohara20641213-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="kicker link-hover"
              style={{ color: 'var(--ink)' }}
            >
              GitHub ↗
            </a>
            <a href="#contact" className="kicker link-hover" style={{ color: 'var(--ink)' }}>
              Contact ↓
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
