import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { LineWipe, ScrambleText } from './TextAnimations';

const categories = [
  { label: 'Languages',       items: ['Python', 'Java', 'JavaScript', 'C', 'HTML', 'CSS'] },
  { label: 'Tools & Platforms', items: ['Git', 'GitHub', 'VS Code', 'Linux', 'OpenCV', 'Node.js'] },
  { label: 'Paradigms',       items: ['Object-Oriented', 'Procedural', 'Scripting', 'Event-Driven'] },
  { label: 'Domains',         items: ['Computer Vision', 'Systems Programming', 'Web Development', 'Data Management'] },
];

export default function Skills() {
  return (
    <section id="skills" className="relative z-10" style={{ background: 'var(--ink)', color: 'var(--paper)', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <span className="kicker" style={{ color: 'var(--rule)' }}>Skills</span>
            <div style={{ flex: 1, height: '1px', background: '#333' }} />
            <span className="byline" style={{ color: 'var(--rule)' }}>
              <ScrambleText text="§ 03" delay={0.2} />
            </span>
          </div>
        </Reveal>

        <LineWipe delay={0.05} style={{ marginBottom: '3.5rem' }}>
          <h2 className="headline-lg" style={{ color: 'var(--paper)', borderBottom: '1px solid #333', paddingBottom: '1.5rem' }}>
            Technology &amp; Craft
          </h2>
        </LineWipe>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-0">
          {categories.map((cat, ci) => (
            <Reveal key={cat.label} delay={ci * 0.1}>
              <div style={{
                borderLeft: ci === 0 ? 'none' : '1px solid #222',
                paddingLeft: ci === 0 ? 0 : '2rem',
                paddingRight: '1.5rem',
              }}>
                <p className="kicker mb-5" style={{ color: 'var(--rule)' }}>
                  <ScrambleText text={cat.label} delay={0.3 + ci * 0.1} />
                </p>
                <ul style={{ listStyle: 'none' }}>
                  {cat.items.map((item, ii) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.35 + ci * 0.08 + ii * 0.055, ease: 'easeOut' }}
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.88rem',
                        lineHeight: 2.1,
                        color: '#e8e4dd',
                        borderBottom: '1px solid #1a1a1a',
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
