import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { LineWipe, ScrambleText, StaggerWords } from './TextAnimations';

const timeline = [
  {
    period: '2024 — Present',
    role: 'Independent Developer',
    org: 'Self-directed',
    desc: 'Building original software projects across Python, Java, JavaScript and C. Developing systems from hospital record management to computer vision utilities. Maintaining a growing GitHub portfolio of 21 repositories.',
    tags: ['Python', 'Java', 'JavaScript', 'C'],
  },
  {
    period: '2024',
    role: 'Computer Vision Project',
    org: 'facedect-py',
    desc: 'Developed a face detection application using OpenCV and image processing libraries. Integrated GIF assets and image resources for enhanced visual output and real-time feedback.',
    tags: ['Python', 'OpenCV'],
  },
  {
    period: '2024',
    role: 'Systems & Records Project',
    org: 'hospital-record-system',
    desc: 'Designed and built a hospital record management system in JavaScript. Focused on structured data storage, retrieval workflows, and maintainable code architecture.',
    tags: ['JavaScript'],
  },
  {
    period: '2024',
    role: 'Low-level Programming Studies',
    org: 'c-prog-class',
    desc: 'Wrote foundational programs in C as part of disciplined programming education — covering memory, control flow, and structured thinking.',
    tags: ['C'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
      <Reveal>
        <div className="flex items-center gap-4 mb-10">
          <span className="kicker">Experience</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
          <span className="byline"><ScrambleText text="§ 04" delay={0.2} /></span>
        </div>
      </Reveal>

      <LineWipe delay={0.05} style={{ marginBottom: '3.5rem' }}>
        <h2 className="headline-lg">Publication History</h2>
      </LineWipe>

      <div>
        {timeline.map((entry, i) => (
          <motion.div
            key={i}
            className="grid md:grid-cols-4 gap-6 md:gap-10 py-10"
            style={{ borderTop: i === 0 ? '3px solid var(--ink)' : '1px solid var(--rule)' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Period */}
            <div>
              <p className="kicker" style={{ color: 'var(--muted)' }}>
                <ScrambleText text={entry.period} delay={0.1 + i * 0.08} />
              </p>
            </div>

            {/* Role + org */}
            <div>
              <p className="headline-sm mb-1">{entry.role}</p>
              <p className="byline" style={{ fontStyle: 'italic' }}>{entry.org}</p>
            </div>

            {/* Description + tags */}
            <div className="md:col-span-2">
              <StaggerWords
                text={entry.desc}
                tag="p"
                className="byline"
                style={{ lineHeight: 1.85, marginBottom: '1rem', display: 'block' }}
                delay={0.15 + i * 0.06}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {entry.tags.map((t, ti) => (
                  <motion.span
                    key={t}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06 + ti * 0.05 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
