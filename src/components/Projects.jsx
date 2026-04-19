import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { SplitHeadline, ScrambleText, LineWipe, StaggerWords } from './TextAnimations';

const LANG_COLOR = {
  Python: '#3d3d3d', Java: '#2a2a2a', JavaScript: '#1a1a1a',
  C: '#4a4a4a', HTML: '#333', CSS: '#555', TypeScript: '#222',
};

function LangDot({ lang }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <span style={{
        display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
        border: `1px solid ${LANG_COLOR[lang] || '#888'}`, background: 'transparent',
      }} />
      <span className="byline">{lang}</span>
    </span>
  );
}

function ProjectCard({ repo, index }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card block py-7 px-0 group"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ textDecoration: 'none' }}
    >
      <div className="grid md:grid-cols-4 gap-4 md:gap-10 items-start">
        {/* Index number — scrambles in */}
        <div className="hidden md:block">
          <span className="font-serif" style={{
            fontSize: '2.5rem', fontWeight: 900,
            color: 'var(--faint)', lineHeight: 1, userSelect: 'none',
          }}>
            <ScrambleText text={String(index + 1).padStart(2, '0')} delay={index * 0.12} />
          </span>
        </div>

        <div className="md:col-span-2">
          <p className="kicker mb-2">{repo.language ? <LangDot lang={repo.language} /> : <span className="byline">—</span>}</p>
          {/* Title wipes in on hover-ready headline */}
          <h3 className="headline-sm link-hover mb-3" style={{ fontFamily: 'Playfair Display, serif', display: 'inline-block' }}>
            {repo.name}
          </h3>
          <p className="byline" style={{ lineHeight: 1.75, maxWidth: '55ch' }}>
            {repo.description || 'No description provided.'}
          </p>
        </div>

        <div className="flex flex-row md:flex-col gap-3 md:items-end">
          <span className="byline">★ {repo.stargazers_count}</span>
          {repo.topics?.slice(0, 3).map((t) => (
            <span key={t} className="skill-tag">{t}</span>
          ))}
          <motion.span
            className="kicker"
            style={{ color: 'var(--ink)' }}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.07 }}
          >
            View ↗
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/arunbohara20641213-hue/repos?per_page=100&sort=updated')
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) { setError(true); setLoading(false); return; }
        const originals = data.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(originals);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const fallback = [
    { id: 1, name: 'bright', description: 'A Python project focused on clean, purposeful logic.', html_url: 'https://github.com/arunbohara20641213-hue/bright', language: 'Python', stargazers_count: 1, fork: false, topics: [] },
    { id: 2, name: 'c-prog-class', description: 'Beginner C programs written during early programming studies — simple, structural, foundational.', html_url: 'https://github.com/arunbohara20641213-hue/c-prog-class', language: 'C', stargazers_count: 1, fork: false, topics: [] },
    { id: 3, name: 'facedect-py', description: 'Face detection utility using OpenCV — image and GIF assets for visual output.', html_url: 'https://github.com/arunbohara20641213-hue/facedect-py', language: 'Python', stargazers_count: 0, fork: false, topics: ['opencv', 'python'] },
    { id: 4, name: 'hospital-record-system', description: 'A hospital record management system built with JavaScript.', html_url: 'https://github.com/arunbohara20641213-hue/hospital-record-system', language: 'JavaScript', stargazers_count: 0, fork: false, topics: ['javascript'] },
  ];

  const display = error || (repos.length === 0 && !loading) ? fallback : repos;

  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
      <Reveal>
        <div className="flex items-center gap-4 mb-10">
          <span className="kicker">Projects</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
          <span className="byline"><ScrambleText text="§ 02" delay={0.2} /></span>
        </div>
      </Reveal>

      <LineWipe delay={0.05} style={{ marginBottom: '1rem' }}>
        <h2 className="headline-lg">Original Work &amp; Case Studies</h2>
      </LineWipe>

      <Reveal delay={0.15}>
        <StaggerWords
          text="All repositories are original — forks excluded. Each project represents a concrete problem approached with deliberate intent."
          className="byline"
          style={{ lineHeight: 1.8, marginBottom: '3rem', display: 'block' }}
          delay={0.2}
        />
      </Reveal>

      <div style={{ borderTop: '3px solid var(--ink)' }}>
        {loading && <p className="byline py-10" style={{ color: 'var(--muted)' }}>Loading repositories…</p>}
        {!loading && display.map((repo, i) => <ProjectCard key={repo.id} repo={repo} index={i} />)}
      </div>

      {!loading && (
        <Reveal delay={0.1}>
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--rule)' }}>
            <a
              href="https://github.com/arunbohara20641213-hue?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="kicker link-hover"
              style={{ color: 'var(--ink)' }}
            >
              View all repositories on GitHub ↗
            </a>
          </div>
        </Reveal>
      )}
    </section>
  );
}
