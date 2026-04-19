import { motion } from 'framer-motion';
import { ScrambleText } from './TextAnimations';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Masthead() {
  return (
    <motion.header
      className="masthead"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ height: '3px', background: 'var(--ink)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--rule)' }}>
          <a href="#hero" className="kicker link-hover">
            <ScrambleText text="The Arun Bohara Chronicle" delay={0.4} />
          </a>
          <span className="byline hidden md:block">Est. 2024 · Kathmandu, Nepal</span>
          <a
            href="https://github.com/arunbohara20641213-hue"
            target="_blank"
            rel="noopener noreferrer"
            className="kicker link-hover"
          >
            github ↗
          </a>
        </div>
        <nav className="flex items-center gap-6 md:gap-10 py-2 overflow-x-auto">
          {navLinks.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="kicker link-hover whitespace-nowrap"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
            >
              {l.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
