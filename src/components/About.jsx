import { SplitHeadline, StaggerWords, ScrambleText, LineWipe } from './TextAnimations';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
      <Reveal>
        <div className="flex items-center gap-4 mb-10">
          <span className="kicker">About</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
          <span className="byline"><ScrambleText text="§ 01" delay={0.2} /></span>
        </div>
      </Reveal>

      {/* Headline with ink-wipe reveal */}
      <LineWipe delay={0.05} style={{ marginBottom: '2.5rem' }}>
        <h2 className="headline-lg" style={{ maxWidth: '18ch' }}>
          A Developer Who Writes Code Like a Craftsman
        </h2>
      </LineWipe>

      <div
        className="grid md:grid-cols-3 gap-10 md:gap-16"
        style={{ borderTop: '1px solid var(--rule)', paddingTop: '2rem' }}
      >
        {/* Main article column */}
        <Reveal delay={0.12} className="md:col-span-2">
          <p
            className="drop-cap"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', lineHeight: 2, marginBottom: '1.4rem' }}
          >
            ased in Kathmandu, Nepal, Arun Bohara is a software developer with
            a genuine interest in how systems are built from first principles.
            His work spans multiple languages and paradigms — from low-level
            programs in C to computer vision in Python and full-stack
            applications in JavaScript.
          </p>
          <StaggerWords
            text="He approaches software development the way a craftsman approaches a trade — with patience, precision, and a preference for doing things properly rather than quickly. Whether it's a hospital record system or a face detection utility, every project gets the same careful attention."
            tag="p"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', lineHeight: 2, marginBottom: '1.4rem', display: 'block' }}
            delay={0.2}
          />
          <Reveal delay={0.3}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', lineHeight: 2 }}>
              When not writing code, Arun is pushing commits, learning by building,
              and looking for the next interesting problem to solve. His GitHub
              is his public record — 21 repositories and counting.
            </p>
          </Reveal>
        </Reveal>

        {/* Sidebar */}
        <Reveal delay={0.25}>
          <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: '1.5rem' }}>
            {[
              { label: 'Location', value: 'Kathmandu, Nepal\nOpen to remote worldwide' },
              { label: 'Primary Languages', value: 'Python · Java · JavaScript · C' },
              { label: 'Achievement', value: 'Pull Shark — GitHub' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--faint)' }}>
                <p className="kicker mb-2">
                  <ScrambleText text={item.label} delay={0.3 + i * 0.15} />
                </p>
                <p className="byline" style={{ lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                  {item.value}
                </p>
              </div>
            ))}
            <div>
              <p className="kicker mb-2">GitHub</p>
              <a
                href="https://github.com/arunbohara20641213-hue"
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover byline"
                style={{ display: 'inline-block' }}
              >
                @arunbohara20641213-hue ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
